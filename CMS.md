# CMS — Sveltia (beheer van de website-inhoud)

De eigenaren beheren **alle inhoud en teksten** van de site via een formulier-CMS:
**Sveltia CMS** op **`/admin`**. Geen git, geen code — alles via nette Nederlandse
formulieren. Elke opslag = een commit → Cloudflare bouwt en publiceert automatisch
(± 1–2 min later live).

## Wat kun je beheren (collecties)

| Collectie                           | Bestand                       | Inhoud                                                         |
| ----------------------------------- | ----------------------------- | -------------------------------------------------------------- |
| **Teksten (NL)** / **Teksten (EN)** | `data/ui/nl.json` · `en.json` | Álle knoppen, menu-labels, koppen en pagina-teksten            |
| **Menu**                            | `data/menu.json`              | Categorieën, gerechten, prijzen, notities, allergenen + de PDF |
| **Openingstijden**                  | `data/opening-hours.json`     | Reguliere tijden per dag + tijdelijke afwijkingen (vakantie)   |
| **Site-instellingen**               | `data/site.json`              | Telefoonnummer en social-links                                 |
| **Nieuws**                          | `content/news/*.md`           | Nieuwsberichten (NL/EN)                                        |
| **Talen**                           | `data/locales.json`           | Beschikbare talen (klaar voor meer dan NL/EN)                  |

Foto's die je in het CMS uploadt komen in `static/uploads/` en zijn direct bruikbaar.

## Een taal toevoegen

1. Open **Talen** in het CMS en voeg een locale toe (bv. `fr` / "Français", og `fr_FR`, html `fr`).
2. Voeg een **Teksten (FR)**-bestand toe (`data/ui/fr.json`) — begin met een kopie van NL/EN.
   Nog niet vertaalde teksten vallen automatisch terug op de standaardtaal (NL).

De taalknop (rechtsboven) en alle SEO/hreflang schalen automatisch mee.

## Testen zonder inloggen (lokaal)

Sveltia heeft een lokale modus (`local_backend: true` staat aan):

```bash
npx @netlify/local-backend    # of: npx netlify-cms-proxy-server
npm run dev                    # in een tweede terminal
# open http://localhost:5173/admin  (kies "Work with Local Repository")
```

Wijzigingen schrijf je dan direct naar de lokale bestanden — handig om de formulieren te proberen.

## Productie-login (GitHub) — vereist actie van Mike

Om via `/admin` op de live site in te loggen is een GitHub-OAuth-flow nodig. Dit is nog **niet**
ingericht omdat het een GitHub OAuth App + twee secrets vereist (§7). De **Worker is
al gebouwd** en staat in de repo: **`workers/cms-auth/`** — inclusief stap-voor-stap
instructies in **`workers/cms-auth/README.md`**. Kort:

1. **GitHub OAuth App** aanmaken (Client ID + Secret); callback = `<worker-url>/callback`.
2. **Worker deployen**: `cd workers/cms-auth` → `wrangler secret put GITHUB_CLIENT_ID` +
   `GITHUB_CLIENT_SECRET` → `wrangler deploy`. De secrets blijven in de Worker.
3. In `static/admin/config.yml` onder `backend:` de `base_url` (Worker-URL) + `auth_endpoint`
   invullen en de `#` weghalen.
4. Bij go-live: `backend.branch` op de **productie-branch** zetten (nu de ontwikkel-branch).

Geef me de Worker-URL na het deployen, dan zet ik stap 3/4 voor je klaar. Alleen
GitHub-accounts met schrijfrechten op `mike015/phia` kunnen daarna opslaan.

## Technisch

- `/admin` is een statische app; de Sveltia-bundle is **self-hosted** (`static/admin/sveltia-cms.js`,
  geen CDN — AVG-vriendelijk). Een eigen CSP voor `/admin` staat in `static/_headers`.
- `robots.txt` en een `X-Robots-Tag: noindex` houden `/admin` uit zoekmachines.
