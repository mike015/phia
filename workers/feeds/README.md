# Phia Feeds Worker

Aparte Cloudflare Worker die twee live datafeeds ophaalt, cachet in KV en als
JSON serveert aan de SvelteKit-site:

1. **Video van vandaag** — de nieuwste upload van het YouTube-kanaal.
2. **Instagram-posts** — de laatste posts (blijft *dormant* tot er een token is).

De verversing gebeurt server-side op een cron (elke 5 minuten); de front-end
leest alleen de gecachte JSON. Zo blijven tokens geheim en spelen CORS/rate
limits geen rol in de browser.

## Endpoints

| Endpoint      | Beschrijving | Respons bij ontbrekende data |
| ------------- | ------------ | ---------------------------- |
| `GET /`       | Health check (plain text) | `Phia feeds worker — OK` |
| `GET /daily`  | Video van vandaag | `{}` |
| `GET /instagram` | Laatste Instagram-posts | `{ "posts": [] }` |

Alle responses hebben CORS-headers (`Access-Control-Allow-Origin` = `ALLOWED_ORIGIN`,
of `*` als die var niet gezet is) en `Cache-Control: public, max-age=60`.
`OPTIONS` (preflight) geeft `204`.

### Datavormen

`GET /daily`:

```json
{
  "videoId": "abc123",
  "title": "Titel van de video",
  "url": "https://www.youtube.com/watch?v=abc123",
  "publishedAt": "2024-01-01T12:00:00+00:00"
}
```

`GET /instagram`:

```json
{
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "posts": [
    {
      "id": "17895695668004550",
      "caption": "Bijschrift…",
      "permalink": "https://www.instagram.com/p/…/",
      "mediaUrl": "https://…jpg",
      "thumbnailUrl": "https://…jpg",
      "mediaType": "IMAGE"
    }
  ]
}
```

## KV-sleutels (namespace binding `FEEDS`)

| Sleutel | Inhoud |
| ------- | ------ |
| `daily` | JSON van de video van vandaag |
| `instagram` | JSON met `updatedAt` + `posts[]` |
| `ig_token` | Het ververste long-lived Instagram-token (door de Worker gezet) |
| `ig_token_refreshed_at` | ISO-tijdstip van de laatste token-refresh |

## Setup

```bash
cd workers/feeds

# 1) KV-namespace aanmaken en de teruggegeven id in wrangler.toml plakken
npx wrangler kv namespace create FEEDS
#    → kopieer de "id" naar [[kv_namespaces]] id = "..." in wrangler.toml

# 2) Vars staan al in wrangler.toml (ALLOWED_ORIGIN, YT_CHANNEL_ID) — pas aan indien nodig

# 3) OPTIONEEL: Instagram-token als secret zetten (zonder blijft Instagram dormant)
npx wrangler secret put IG_ACCESS_TOKEN

# 4) Deployen
npx wrangler deploy
```

Koppel de Worker daarna aan een route of custom domain, bijvoorbeeld
`feeds.phiassmulparadijs.nl` (via het Cloudflare-dashboard → Workers & Pages →
deze Worker → Triggers/Custom Domains, of via een `[[routes]]`-blok). De
front-end verwacht de endpoints op die host.

## YouTube: geen secrets nodig

De video van vandaag komt uit de **publieke** RSS-feed
`https://www.youtube.com/feeds/videos.xml?channel_id=…` — geen API-key, geen
quota. De Worker werkt dus meteen na deploy voor de YouTube-feature. Het
channel-id staat in `wrangler.toml` (var `YT_CHANNEL_ID`) met een default in
`src/index.js`.

## Instagram: dormant tot er een token is

De Instagram-feature doet niets zolang er geen token is. Zodra je
`IG_ACCESS_TOKEN` zet (of de Worker een token in KV `ig_token` heeft), begint de
cron posts op te halen.

### Een long-lived token verkrijgen

1. Maak een app in **Meta for Developers** (developers.facebook.com) en voeg het
   product **Instagram Basic Display** of **Instagram Graph API** toe.
2. Koppel het Instagram-account en doorloop de OAuth-flow om een **short-lived
   user token** te krijgen.
3. Wissel dat in voor een **long-lived token** (60 dagen geldig) via het
   `ig_exchange_token`-endpoint.
4. Zet dat long-lived token als secret: `npx wrangler secret put IG_ACCESS_TOKEN`.

De Worker vernieuwt het token daarna zelf: max. 1x per ~24u roept hij
`graph.instagram.com/refresh_access_token` aan (grant_type `ig_refresh_token`) en
bewaart het nieuwe token in KV `ig_token`. Zo verloopt het 60-daagse token nooit
zolang de cron blijft draaien.

## Kosten

De cron draait elke 5 minuten = **288 runs/dag**. Elke run doet 1 YouTube-fetch
en (met token) 1–2 Instagram-fetches. Dat valt ruim binnen de Cloudflare
Workers free tier (100.000 requests/dag) — ook mét de front-end-reads erbij.
