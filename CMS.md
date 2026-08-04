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
ingericht (externe resources + secrets vereisen akkoord — PROJECT-BRIEF §7). Stappen:

1. **GitHub OAuth App** aanmaken (GitHub → Settings → Developer settings → OAuth Apps):
   - Homepage URL: de site-URL. Authorization callback URL: die van de OAuth-worker (stap 2).
   - Noteer **Client ID** en **Client Secret**.
2. **Cloudflare OAuth-Worker** deployen volgens het Sveltia/Decap-patroon
   (`sveltia-cms-auth`, een kleine Worker). Zet `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
   als Worker-secrets (nooit in de repo).
3. In `static/admin/config.yml` het `backend`-blok een `base_url` (en evt. `auth_endpoint`) naar
   die Worker geven.
4. Zet de `backend.branch` in `config.yml` op de **productie-branch** bij go-live (staat nu op de
   ontwikkel-branch `claude/new-project-seo-responsive-38rc1b`).

Zeg het als je dit wilt inrichten, dan lever ik de Worker + exacte config aan (met jouw akkoord
voor het aanmaken van de OAuth-app en secrets).

## Technisch

- `/admin` is een statische app; de Sveltia-bundle is **self-hosted** (`static/admin/sveltia-cms.js`,
  geen CDN — AVG-vriendelijk). Een eigen CSP voor `/admin` staat in `static/_headers`.
- `robots.txt` en een `X-Robots-Tag: noindex` houden `/admin` uit zoekmachines.
