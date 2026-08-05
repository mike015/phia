/**
 * Phia's Smulparadijs — Feeds Worker.
 *
 * Op zichzelf staande Cloudflare Worker die twee live datafeeds ververst en
 * serveert voor de SvelteKit-site: de "video van vandaag" van YouTube en de
 * laatste Instagram-posts. De feeds worden op een cron (elke 5 min) opgehaald
 * en in KV bewaard; de front-end leest ze via de JSON-endpoints hieronder.
 *
 * Waarom via KV en niet rechtstreeks vanuit de front-end?
 *   - YouTube RSS en de Instagram Graph API mogen niet vanuit de browser (CORS,
 *     token-geheimhouding). De Worker haalt op, cachet in KV en serveert JSON.
 *
 * Endpoints (allemaal GET, met CORS):
 *   GET /           → plain-text health check
 *   GET /daily      → JSON: video van vandaag (KV "daily"), of {}
 *   GET /instagram  → JSON: laatste posts (KV "instagram"), of { posts: [] }
 *
 * Cron (scheduled, elke 5 min):
 *   A) YouTube  → publieke RSS-feed parsen, KV "daily" bijwerken (GEEN API-key)
 *   B) Instagram→ alleen als er een token is (KV "ig_token" of secret
 *                 IG_ACCESS_TOKEN); anders slaapt de feature.
 *
 * Vars (wrangler.toml [vars]):
 *   ALLOWED_ORIGIN — enige toegestane CORS-origin (bv. de site-URL)
 *   YT_CHANNEL_ID  — YouTube channel-id (heeft een default hieronder)
 *
 * Secrets (zet met `wrangler secret put ...`, NOOIT in de repo):
 *   IG_ACCESS_TOKEN — Instagram long-lived access token (optioneel; zonder dit
 *                     blijft de Instagram-feature dormant)
 *
 * KV-namespace binding: FEEDS
 */

// Default YouTube channel-id van Phia's Smulparadijs. Kan overschreven worden
// via de var YT_CHANNEL_ID. Dit is een PUBLIEKE RSS-feed — geen API-key nodig.
const DEFAULT_YT_CHANNEL_ID = 'UCPdruOGFXG2zC440MWNFr4g';

// ---------------------------------------------------------------------------
// CORS-helpers
// ---------------------------------------------------------------------------

/**
 * Bouwt de CORS-headers. `env.ALLOWED_ORIGIN` (var) is de enige toegestane
 * origin. Is die niet gezet, dan vallen we terug op '*'.
 *
 * LET OP: '*' laat elke site de feeds lezen. Dat is voor deze PUBLIEKE,
 * niet-gevoelige data (openbare YouTube/Instagram-posts) acceptabel, maar zet
 * in productie bij voorkeur ALLOWED_ORIGIN op de site-origin.
 */
function corsHeaders(env) {
	const origin = env.ALLOWED_ORIGIN || '*';
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Methods': 'GET, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		// Kort cachen: de front-end mag 60s hergebruiken; de echte verversing
		// gebeurt server-side op de 5-minuten-cron.
		'Cache-Control': 'public, max-age=60'
	};
}

/** JSON-response met CORS-headers. */
function jsonResponse(obj, env, status = 200) {
	return new Response(JSON.stringify(obj), {
		status,
		headers: {
			'content-type': 'application/json;charset=UTF-8',
			...corsHeaders(env)
		}
	});
}

// ---------------------------------------------------------------------------
// YouTube RSS-parser
// ---------------------------------------------------------------------------

/**
 * Haalt de waarde van de eerste tag `<name>...</name>` binnen `xml`.
 * Simpele, defensieve regex-parser — Workers hebben geen XML-library.
 * `name` mag een namespace bevatten (bv. "yt:videoId"); de dubbele punt wordt
 * geëscaped voor de regex.
 */
function firstTag(xml, name) {
	const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const m = xml.match(new RegExp(`<${escaped}[^>]*>([\\s\\S]*?)</${escaped}>`, 'i'));
	return m ? m[1].trim() : '';
}

/**
 * Parseert de YouTube-feed en geeft het "daily"-object van de EERSTE entry
 * terug, of null als er niets bruikbaars in staat.
 *
 * De feed ziet er (ingekort) zo uit:
 *   <feed ...>
 *     <entry>
 *       <id>yt:video:VIDEOID</id>
 *       <yt:videoId>VIDEOID</yt:videoId>
 *       <title>Titel</title>
 *       <link rel="alternate" href="https://www.youtube.com/watch?v=VIDEOID"/>
 *       <published>2024-01-01T12:00:00+00:00</published>
 *     </entry>
 *     ...
 */
function parseYouTubeFeed(xml) {
	// Alleen de eerste <entry> pakken; die is de nieuwste upload.
	const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/i);
	if (!entryMatch) return null;
	const entry = entryMatch[1];

	// videoId: bij voorkeur <yt:videoId>, anders uit <id>yt:video:VIDEOID</id>.
	let videoId = firstTag(entry, 'yt:videoId');
	if (!videoId) {
		const idRaw = firstTag(entry, 'id');
		const idMatch = idRaw.match(/yt:video:(.+)$/);
		videoId = idMatch ? idMatch[1].trim() : '';
	}
	if (!videoId) return null;

	const title = decodeEntities(firstTag(entry, 'title'));
	const publishedAt = firstTag(entry, 'published');

	// De canonieke watch-URL uit <link rel="alternate" href="...">; valt terug
	// op een opgebouwde URL als het attribuut ontbreekt.
	let url = '';
	const linkMatch = entry.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
	if (linkMatch) {
		url = decodeEntities(linkMatch[1]);
	} else {
		url = `https://www.youtube.com/watch?v=${videoId}`;
	}

	return { videoId, title, url, publishedAt };
}

/** Decodeert de handvol XML-entities die in titels/URL's kunnen voorkomen. */
function decodeEntities(s) {
	return s
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'");
}

// ---------------------------------------------------------------------------
// Scheduled-taken (verversen van de feeds)
// ---------------------------------------------------------------------------

/**
 * A) YouTube verversen. Haalt de publieke RSS-feed op, parseert de eerste
 * entry en schrijft KV "daily". Bij ELKE fout blijft de bestaande KV-waarde
 * ongemoeid (we overschrijven nooit met leegte) en loggen we alleen.
 */
async function refreshYouTube(env) {
	try {
		const channelId = env.YT_CHANNEL_ID || DEFAULT_YT_CHANNEL_ID;
		const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

		const res = await fetch(feedUrl, {
			headers: { 'user-agent': 'phia-feeds-worker' }
		});
		if (!res.ok) {
			console.log(`YouTube RSS gaf status ${res.status}; KV "daily" blijft ongewijzigd.`);
			return;
		}

		const xml = await res.text();
		const daily = parseYouTubeFeed(xml);
		if (!daily) {
			console.log('YouTube RSS kon niet geparseerd worden; KV "daily" blijft ongewijzigd.');
			return;
		}

		await env.FEEDS.put('daily', JSON.stringify(daily));
		console.log(`KV "daily" bijgewerkt: ${daily.videoId}`);
	} catch (err) {
		// Nooit uit scheduled() gooien — log en ga door.
		console.log('refreshYouTube fout:', err && err.message ? err.message : String(err));
	}
}

/**
 * Bepaalt welk Instagram-token we gebruiken:
 *   1) KV "ig_token"  (het ververste long-lived token — heeft voorrang)
 *   2) env.IG_ACCESS_TOKEN (secret — het initiële token van Mike)
 * Geen van beide → null → Instagram-feature blijft dormant.
 */
async function resolveInstagramToken(env) {
	const kvToken = await env.FEEDS.get('ig_token');
	if (kvToken) return kvToken;
	if (env.IG_ACCESS_TOKEN) return env.IG_ACCESS_TOKEN;
	return null;
}

/**
 * Ververst het long-lived Instagram-token als dat > ~24u geleden is (of nog
 * nooit). Instagram long-lived tokens verlopen na 60 dagen; ze moeten vóór die
 * tijd ververst worden. Eén refresh per dag is ruim voldoende.
 *
 * Bij succes: nieuw token in KV "ig_token", tijdstip in "ig_token_refreshed_at".
 * Alles in try/catch — een mislukte refresh mag de rest van de run niet breken.
 */
async function maybeRefreshInstagramToken(env, token) {
	try {
		const lastRaw = await env.FEEDS.get('ig_token_refreshed_at');
		const last = lastRaw ? Date.parse(lastRaw) : 0;
		const dayMs = 24 * 60 * 60 * 1000;
		// Date is prima in een echte Worker (de "geen Date"-regel geldt alleen
		// voor de workflow-sandbox, niet voor deze worker-broncode).
		if (last && Date.now() - last < dayMs) {
			return; // Nog geen dag geleden — niets doen.
		}

		const refreshUrl =
			`https://graph.instagram.com/refresh_access_token` +
			`?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`;

		const res = await fetch(refreshUrl);
		if (!res.ok) {
			console.log(`IG token-refresh gaf status ${res.status}; token blijft ongewijzigd.`);
			return;
		}
		const data = await res.json();
		if (data && data.access_token) {
			await env.FEEDS.put('ig_token', data.access_token);
			await env.FEEDS.put('ig_token_refreshed_at', new Date().toISOString());
			console.log('IG long-lived token ververst.');
		}
	} catch (err) {
		console.log('maybeRefreshInstagramToken fout:', err && err.message ? err.message : String(err));
	}
}

/**
 * B) Instagram verversen. Alleen als er een token beschikbaar is. Haalt de
 * laatste 8 posts op, mapt ze naar de opslag-vorm en schrijft KV "instagram".
 * Bij fouten blijft de bestaande KV-waarde ongemoeid.
 */
async function refreshInstagram(env) {
	try {
		const token = await resolveInstagramToken(env);
		if (!token) {
			// Geen token → feature dormant. Bewust géén log-spam elke 5 min.
			return;
		}

		// Token indien nodig verversen (max. 1x/24u) vóór het ophalen.
		await maybeRefreshInstagramToken(env, token);
		// Na een eventuele refresh opnieuw het (mogelijk nieuwe) token pakken.
		const activeToken = await resolveInstagramToken(env);

		const fields = 'id,caption,permalink,media_url,thumbnail_url,media_type';
		const mediaUrl =
			`https://graph.instagram.com/me/media` +
			`?fields=${fields}&limit=8&access_token=${encodeURIComponent(activeToken)}`;

		const res = await fetch(mediaUrl);
		if (!res.ok) {
			console.log(`Instagram media gaf status ${res.status}; KV "instagram" blijft ongewijzigd.`);
			return;
		}

		const data = await res.json();
		const rows = (data && Array.isArray(data.data)) ? data.data : [];

		const posts = rows.map((p) => ({
			id: p.id || '',
			caption: p.caption || '',
			permalink: p.permalink || '',
			mediaUrl: p.media_url || '',
			// thumbnail_url bestaat alleen voor video's; anders de media_url.
			thumbnailUrl: p.thumbnail_url || p.media_url || '',
			mediaType: p.media_type || ''
		}));

		await env.FEEDS.put('instagram', JSON.stringify({
			updatedAt: new Date().toISOString(),
			posts
		}));
		console.log(`KV "instagram" bijgewerkt: ${posts.length} posts.`);
	} catch (err) {
		console.log('refreshInstagram fout:', err && err.message ? err.message : String(err));
	}
}

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------

export default {
	/**
	 * HTTP-handler: serveert de JSON-feeds uit KV met CORS.
	 *
	 * @param {Request} request
	 * @param {{ FEEDS: KVNamespace, ALLOWED_ORIGIN?: string, YT_CHANNEL_ID?: string, IG_ACCESS_TOKEN?: string }} env
	 */
	async fetch(request, env) {
		const url = new URL(request.url);
		const { pathname } = url;

		// CORS-preflight: 204 met CORS-headers.
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders(env) });
		}

		// Health check.
		if (pathname === '/' || pathname === '') {
			return new Response('Phia feeds worker — OK', {
				headers: {
					'content-type': 'text/plain;charset=UTF-8',
					...corsHeaders(env)
				}
			});
		}

		// Video van vandaag.
		if (pathname === '/daily') {
			const raw = await env.FEEDS.get('daily');
			// Ontbrekend → leeg object; de front-end verbergt dan het video-blok.
			if (!raw) return jsonResponse({}, env);
			// Al opgeslagen als JSON-string → direct doorgeven zonder her-parsen.
			return new Response(raw, {
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					...corsHeaders(env)
				}
			});
		}

		// Instagram-posts.
		if (pathname === '/instagram') {
			const raw = await env.FEEDS.get('instagram');
			if (!raw) return jsonResponse({ posts: [] }, env);
			return new Response(raw, {
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					...corsHeaders(env)
				}
			});
		}

		return jsonResponse({ error: 'not_found' }, env, 404);
	},

	/**
	 * Scheduled-handler: draait op de cron uit wrangler.toml (elke 5 min).
	 * Ververst beide feeds. Beide taken vangen hun eigen fouten af, zodat één
	 * kapotte feed de andere niet meesleept en er nooit iets uit scheduled()
	 * naar buiten gegooid wordt.
	 *
	 * @param {ScheduledEvent} event
	 * @param {{ FEEDS: KVNamespace, ALLOWED_ORIGIN?: string, YT_CHANNEL_ID?: string, IG_ACCESS_TOKEN?: string }} env
	 * @param {ExecutionContext} ctx
	 */
	async scheduled(event, env, ctx) {
		// waitUntil houdt de Worker in leven tot beide verversingen klaar zijn.
		ctx.waitUntil(Promise.allSettled([
			refreshYouTube(env),
			refreshInstagram(env)
		]));
	}
};
