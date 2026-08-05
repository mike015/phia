# Deploy — Phia's Smulparadijs (Cloudflare Workers · Static Assets)

Static-first SvelteKit-site (`@sveltejs/adapter-static`), prerenderd naar `build/`.
De site wordt geserveerd als **Cloudflare Workers Static Assets** (assets-only Worker,
geen `main`-script). Config: `wrangler.toml`. Zie ook `PROJECT-BRIEF.md` §2/§5–§7/§9.

> Let op: dit project is aangemaakt als **Workers**-project (niet klassiek Pages).
> Cloudflare Workers Builds gebruikt op preview-branches `wrangler versions upload`
> en op de productie-branch `wrangler deploy`. Beide werken met de `[assets]`-config
> in `wrangler.toml`.

## Optie A — Cloudflare Workers Builds via Git (aanbevolen)

1. Cloudflare dashboard → **Workers & Pages** → jouw project (`phias-smulparadijs`) →
   **Settings → Build**.
2. Gekoppelde repo: **`mike015/phia`**.
3. Build-instellingen:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (productie) — Cloudflare gebruikt op
     niet-productie-branches automatisch `npx wrangler versions upload` (preview-URL).
   - **Root directory:** `/`
   - **Node version:** 22 (meegeleverd via `.nvmrc`; of zet env-var `NODE_VERSION=22`).
4. Push naar de branch → build + deploy. Productie-branch gaat live op de
   `*.workers.dev`-URL; andere branches krijgen een preview-versie-URL.

Voor deze statische testbuild zijn **geen** environment variables of secrets nodig.

## Optie B — Wrangler CLI (snelle handmatige testdeploy)

```bash
npm install
npm run build
npx wrangler deploy            # of: npx wrangler versions upload  (preview)
```

Vereist een Cloudflare-login: `npx wrangler login`. Valideren zonder te deployen:
`npx wrangler deploy --dry-run`.

## Wat er deployt

Een volledig statische, geprerenderde site (209 bestanden in `build/`). Workers Static
Assets honoreert `build/_redirects` en `build/_headers` automatisch (301-redirects van de
oude WordPress-URL's, security-headers en cache-regels). De Content-Security-Policy staat
per pagina in de HTML (SvelteKit hash-mode). Onbekende paden vallen terug op `404.html`
(`not_found_handling = "404-page"`).

## Live feeds — aparte feeds-worker (YouTube-video-van-vandaag + Instagram)

De statische site blijft ongewijzigd; de live feeds draaien in een **losse**
Cloudflare Worker (`workers/feeds/`, zelfde patroon als de CMS-OAuth-worker). De
front-end haalt ze client-side op en valt zonder worker netjes terug op
statische content. Volledige stappen staan in `workers/feeds/README.md`; kort:

1. `cd workers/feeds && npx wrangler kv namespace create FEEDS` → het `id` in
   `workers/feeds/wrangler.toml` plakken.
2. In `wrangler.toml` de var `ALLOWED_ORIGIN` op de site-URL zetten (CORS).
3. **Instagram (optioneel):** `npx wrangler secret put IG_ACCESS_TOKEN` met een
   Instagram long-lived token. Zonder token blijft Instagram dormant; **YouTube
   werkt zonder enige sleutel** (publieke RSS-feed).
4. `npx wrangler deploy` en de worker aan een route/subdomein hangen, bijv.
   `https://feeds.phiassmulparadijs.nl`.
5. Die URL invullen bij **Sveltia → Site-instellingen → Live feeds → Feeds-worker-URL**
   (of `data/site.json` → `feeds.base`). Vanaf dan tonen hero-video en
   Instagram-grid live data. De cron (elke 5 min = 288 calls/dag) blijft binnen
   de gratis Cloudflare-limiet.

> CSP: het bouwproces neemt `feeds.base` uit `data/site.json` automatisch op in
> `connect-src` — welk domein je ook kiest. Zet de URL dus vóór de build (commit),
> dan volgt de CSP vanzelf; handmatig `svelte.config.js` aanpassen is niet nodig.

## Later (vereist Cloudflare-resources + akkoord Mike)

Nog niet actief; komt in het stappenplan (`PROJECT-BRIEF.md` §5–§7):

- **CMS OAuth-worker** voor Sveltia CMS (GitHub-backend) op `/admin` — deploy
  `workers/cms-auth/`, zet `ALLOWED_ORIGIN` op de site-origin en vul `base_url`
  in `static/admin/config.yml` in.

## Custom domain

Voeg `phiassmulparadijs.nl` toe via het project → **Settings → Domains & Routes** zodra
DNS naar Cloudflare is verhuisd (`PROJECT-BRIEF.md` §2/§9).
