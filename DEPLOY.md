# Deploy — Phia's Smulparadijs (Cloudflare Pages)

Static-first SvelteKit-site (`@sveltejs/adapter-static`), prerenderd naar `build/`.
Zie ook `PROJECT-BRIEF.md` §2/§5–§7/§9.

## Optie A — Cloudflare Pages via Git (aanbevolen)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Koppel de GitHub-repo **`mike015/phia`** en kies de productie-branch.
3. Build-instellingen:
   - **Framework preset:** SvelteKit (of "None")
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Node version:** 22 — zet env-var `NODE_VERSION=22` (of via de meegeleverde `.nvmrc`).
4. Opslaan & deployen. Elke push bouwt automatisch een **preview**; de productie-branch
   deployt naar de Pages-URL (`*.pages.dev`).

Voor deze statische testbuild zijn **geen** environment variables of secrets nodig.

## Optie B — Wrangler CLI (snelle handmatige testdeploy)

```bash
npm install
npm run build
npx wrangler pages deploy build --project-name phias-smulparadijs
```

Vereist een Cloudflare-login: `npx wrangler login`.

## Wat er deployt

Een volledig statische, geprerenderde site. Cloudflare Pages honoreert `static/_redirects`
en `static/_headers` automatisch (301-redirects van de oude WordPress-URL's, security-headers,
CSP en cache-regels).

## Later (vereist Cloudflare-resources + akkoord Mike)

Nog niet actief; komt in het stappenplan (`PROJECT-BRIEF.md` §5–§7):

- **Workers** voor `/api/*` (YouTube-RSS `/api/daily`, `/api/instagram`) — wissel dan
  `@sveltejs/adapter-static` om naar `@sveltejs/adapter-cloudflare`.
- **KV** voor caching/state van die endpoints.
- **CMS OAuth-worker** voor Sveltia CMS (GitHub-backend) op `/admin`.

## Custom domain

Voeg `phiassmulparadijs.nl` toe via Pages → **Custom domains** zodra DNS naar Cloudflare
is verhuisd (`PROJECT-BRIEF.md` §2/§9).
