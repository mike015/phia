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

## Later (vereist Cloudflare-resources + akkoord Mike)

Nog niet actief; komt in het stappenplan (`PROJECT-BRIEF.md` §5–§7):

- **Workers-routes** voor `/api/*` (YouTube-RSS `/api/daily`, `/api/instagram`) — wissel
  dan `@sveltejs/adapter-static` om naar `@sveltejs/adapter-cloudflare` en voeg een
  `main`-Worker toe naast deze `[assets]`.
- **KV** voor caching/state van die endpoints.
- **CMS OAuth-worker** voor Sveltia CMS (GitHub-backend) op `/admin`.

## Custom domain

Voeg `phiassmulparadijs.nl` toe via het project → **Settings → Domains & Routes** zodra
DNS naar Cloudflare is verhuisd (`PROJECT-BRIEF.md` §2/§9).
