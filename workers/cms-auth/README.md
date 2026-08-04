# CMS-login Worker (GitHub OAuth voor Sveltia CMS)

Kleine Cloudflare Worker die de login voor `/admin` afhandelt. Staat los van de
site-deploy. Eenmalig opzetten; daarna kunnen Phia & Dwight inloggen op de live site.

## 1. GitHub OAuth App aanmaken

GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**:

- **Application name:** Phia's Smulparadijs CMS
- **Homepage URL:** `https://www.phiassmulparadijs.nl` (of de huidige site-URL)
- **Authorization callback URL:** `https://phia-cms-auth.JOUW-SUBDOMEIN.workers.dev/callback`
  (de Worker-URL uit stap 2 + `/callback` — je kunt dit na stap 2 nog aanpassen)

Noteer de **Client ID** en genereer een **Client Secret**.

## 2. Worker deployen

```bash
cd workers/cms-auth
npx wrangler login                       # eenmalig, opent de browser
npx wrangler secret put GITHUB_CLIENT_ID       # plak de Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # plak de Client Secret
npx wrangler deploy
```

`wrangler deploy` toont de Worker-URL, bijvoorbeeld
`https://phia-cms-auth.jouw-subdomein.workers.dev`.

- Zet die URL (+ `/callback`) als **Authorization callback URL** in de GitHub OAuth App (stap 1).

## 3. CMS koppelen

In `static/admin/config.yml`, onder `backend:`, de twee regels invullen en de `#` weghalen:

```yaml
base_url: https://phia-cms-auth.jouw-subdomein.workers.dev
auth_endpoint: auth
```

Commit + push → de site herbouwt. Daarna kan iemand op `https://<site>/admin` inloggen
met **Login with GitHub**. Alleen GitHub-accounts met schrijfrechten op `mike015/phia`
kunnen opslaan.

## Hoe het werkt

- `/auth` → stuurt door naar GitHub met een CSRF-state (cookie).
- `/callback` → valideert de state, wisselt de code in voor een token, en geeft dat
  token via `postMessage` terug aan het CMS-venster (Decap-compatibel, door Sveltia
  ondersteund). De secrets blijven in de Worker; ze staan nooit in de browser of de repo.

## Toegang beperken (aanbevolen, optioneel)

Toegang tot de repo bepaalt wie kan opslaan. Geef alleen Phia/Dwight (en Mike) een
GitHub-account met push-rechten op `mike015/phia` (bijv. via een team met write-access).
