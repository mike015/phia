/**
 * Sveltia/Decap CMS — GitHub OAuth Worker.
 *
 * Kleine, op zichzelf staande Cloudflare Worker die de GitHub-login voor het
 * CMS (/admin) afhandelt. Volgt het Decap-compatibele postMessage-protocol dat
 * Sveltia CMS ondersteunt.
 *
 * Endpoints:
 *   GET /auth      → stuurt door naar GitHub OAuth (met CSRF-state in cookie)
 *   GET /callback  → wisselt de code in voor een token en geeft het via
 *                    window.opener.postMessage terug aan het CMS-venster
 *
 * Secrets (zet met `wrangler secret put ...`, NOOIT in de repo):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * Optioneel (vars): ALLOWED_ORIGIN — beperk tot de site-origin (aanbevolen).
 */

const PROVIDER = 'github';

function html(body) {
	return new Response(`<!doctype html><meta charset="utf-8"><body>${body}</body>`, {
		headers: { 'content-type': 'text/html;charset=UTF-8' }
	});
}

/**
 * Bouwt de HTML die het token via postMessage aan het CMS-opener-venster geeft.
 *
 * `allowedOrigin` (env.ALLOWED_ORIGIN) is de enige origin die het token mag
 * ontvangen. Is die gezet, dan antwoorden we UITSLUITEND aan die origin en
 * negeren we handshakes van andere vensters — zo kan een kwaadwillende pagina
 * het repo-scoped GitHub-token niet buitmaken. Zonder de var vallen we terug op
 * de opener-origin (minder veilig; zet ALLOWED_ORIGIN in productie).
 */
function postMessagePage(status, payloadObj, allowedOrigin) {
	const message = `authorization:${PROVIDER}:${status}:${JSON.stringify(payloadObj)}`;
	// JSON.stringify escapet message én allowed veilig voor injectie in de <script>.
	return html(`<script>
	(function () {
		var message = ${JSON.stringify(message)};
		var allowed = ${JSON.stringify(allowedOrigin || '')};
		function receive(e) {
			if (!e.data || e.data !== 'authorizing:${PROVIDER}') return;
			// Alleen antwoorden aan de toegestane origin (voorkomt token-exfiltratie).
			if (allowed && e.origin !== allowed) return;
			var target = allowed || e.origin;
			window.opener && window.opener.postMessage(message, target);
			window.removeEventListener('message', receive, false);
		}
		window.addEventListener('message', receive, false);
		// Handshake starten: opener luistert en antwoordt met 'authorizing:github'.
		window.opener && window.opener.postMessage('authorizing:${PROVIDER}', allowed || '*');
	})();
</script>`);
}

export default {
	/**
	 * @param {Request} request
	 * @param {{ GITHUB_CLIENT_ID: string, GITHUB_CLIENT_SECRET: string, ALLOWED_ORIGIN?: string }} env
	 */
	async fetch(request, env) {
		const url = new URL(request.url);
		const { pathname, searchParams } = url;

		if (pathname === '/' || pathname === '') {
			return new Response('Sveltia CMS OAuth worker — OK', {
				headers: { 'content-type': 'text/plain' }
			});
		}

		if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
			return new Response('Server misconfigured: missing GitHub OAuth secrets.', { status: 500 });
		}

		// 1) Start: door naar GitHub met een CSRF-state in een cookie.
		if (pathname === '/auth') {
			const state = crypto.randomUUID();
			const redirectUri = `${url.origin}/callback`;
			const scope = searchParams.get('scope') || 'repo,user';

			const authorize = new URL('https://github.com/login/oauth/authorize');
			authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
			authorize.searchParams.set('redirect_uri', redirectUri);
			authorize.searchParams.set('scope', scope);
			authorize.searchParams.set('state', state);

			return new Response(null, {
				status: 302,
				headers: {
					Location: authorize.toString(),
					'Set-Cookie': `csrf=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
				}
			});
		}

		// 2) Terug van GitHub: valideer state, wissel code in voor een token.
		if (pathname === '/callback') {
			const code = searchParams.get('code');
			const state = searchParams.get('state');
			const cookie = request.headers.get('Cookie') || '';
			const csrf = (cookie.match(/(?:^|;\s*)csrf=([^;]+)/) || [])[1];

			if (!code || !state || !csrf || state !== csrf) {
				return postMessagePage('error', { error: 'invalid_state' }, env.ALLOWED_ORIGIN);
			}

			let payload;
			try {
				const res = await fetch('https://github.com/login/oauth/access_token', {
					method: 'POST',
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						'user-agent': 'phia-cms-auth'
					},
					body: JSON.stringify({
						client_id: env.GITHUB_CLIENT_ID,
						client_secret: env.GITHUB_CLIENT_SECRET,
						code,
						redirect_uri: `${url.origin}/callback`
					})
				});
				payload = await res.json();
			} catch (err) {
				return postMessagePage('error', { error: 'token_exchange_failed' }, env.ALLOWED_ORIGIN);
			}

			if (!payload || !payload.access_token) {
				return postMessagePage('error', { error: payload?.error || 'no_token' }, env.ALLOWED_ORIGIN);
			}

			return postMessagePage('success', { token: payload.access_token, provider: PROVIDER }, env.ALLOWED_ORIGIN);
		}

		return new Response('Not found', { status: 404 });
	}
};
