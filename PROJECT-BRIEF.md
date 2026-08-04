# PROJECT-BRIEF — Phia's Smulparadijs website rebuild

Klant: Phia's Smulparadijs (Surinaams-Creools afhaal-eethuis, Den Haag)
Opdrachtnemer: Blackgate (Mike)
Status: design goedgekeurd door klant (concept v4). Dit document is de volledige, bindende spec.

---

## 1. Bedrijfsgegevens

- Naam: Phia's Smulparadijs — eigenaren: Phia & Dwight
- Adres: Bouwlustlaan 111, 2544 JP Den Haag
- Telefoon: 070-7851813 (bellen & reserveren; geen online bestellen)
- Gerechten & snacks verkrijgbaar vanaf 13:30
- Socials: facebook.com/phiassmulparadijs (page id 1719845324900674), instagram.com/phiassmulparadijs, YouTube-kanaal "Phia's Maaltijd of Soep"
- Google Maps CID: 8461937955839483201 (coörd. ±52.0440954, 4.2569385)
- Merkuitingen: "Kom en geniet van de Surinaams-Creoolse keuken!", "Soso Lobi ❤"
- Reviews: 4.8 Google (±294), 4.9 Facebook (±110)

## 2. Stack & hosting

- SvelteKit, static-first (prerender waar mogelijk), **Tailwind CSS**
- Repo: **GitHub** → Cloudflare Pages met build-on-push
- Cloudflare Workers voor dynamische endpoints (`/api/*`), Cloudflare KV als cache
- Domein phiassmulparadijs.nl: nog niet op Cloudflare; DNS-verhuizing bij go-live (klant akkoord)
- Eerst live op preview-subdomein voor klantacceptatie, daarna DNS-switch

## 3. Pagina's (NL + EN, zelfde structuur als huidige site)

1. **Home** — split-hero (zie §6), aangepaste-openingstijden-melding, menu-uitlichting (4 kaarten + CTA), sfeer-band met review-quote, reviewsectie, Instagram-feed, footer
2. **Menu** — volledig menu met prijzen, categorieën zoals huidige site (broodjes, roti, nasi & bami, soepen, snacks, dranken — exacte structuur scrapen van /menu/ en laten bevestigen)
3. **Wie zijn wij** (about) — content migreren van /about/
4. **Phia's Maaltijd of Soep** — uitleg dagconcept + grote video-embed + archief van recente video's
5. **Foto's** — galerij (migreren van /phias-fotos/ + Instagram)
6. **Contact** — info-only: telefoon, adres, kaart (embed), openingstijden. GEEN contactformulier
7. `/admin` — Sveltia CMS

## 4. CMS (Sveltia CMS, GitHub-backend)

- Auth: GitHub OAuth via kleine Cloudflare Worker (standaard Sveltia/Decap OAuth-proxy patroon)
- Eigenaren zijn niet-technisch: alleen formulieren, Nederlandstalige labels, hints bij elk veld
- Collections:
  - **menu**: categorieën → items {naam NL/EN, beschrijving NL/EN optioneel, prijs, foto optioneel, beschikbaar (bool)}
  - **nieuws**: {titel NL/EN, datum, tekst NL/EN, foto optioneel}
  - **openingstijden**:
    - reguliere tijden per weekdag {open, dicht, gesloten (bool)}
    - **tijdelijke afwijkingen**: lijst van {datum of datumbereik, label ("Koningsdag"), afwijkende tijden of "gesloten"}
      → actieve afwijking verschijnt automatisch als prominente melding op Home (rol: `role="status"`) én past de open/dicht-indicator aan
  - **site-instellingen**: hero-intro NL/EN, USP-regels, socials, telefoonnummer
- Elke save = commit → Cloudflare Pages rebuild (±2 min live)

## 5. Integraties

### 5.1 YouTube — "Maaltijd of Soep van vandaag"

- Titel van de nieuwste video = H1 van de homepage-hero
- Bron: publieke RSS-feed, GEEN API-key: `https://www.youtube.com/feeds/videos.xml?channel_id=<ID>`
- ⚠ VERIFICATIE NODIG: gescrapete uploads-playlist was `UU PdruOGFXG2zC440MWNFr4g` (met breuk) → kanaal-ID waarschijnlijk `UCPdruOGFXG2zC440MWNFr4g`. Controleer op het echte kanaal vóór gebruik.
- Serveren via Worker `/api/daily` met KV-cache, TTL 5 min
- Embed: `youtube-nocookie.com`, pas laden na consent (zie §5.5)

### 5.2 Instagram-feed

- Worker `/api/instagram` + KV-cache, **TTL 5 min** (eis: nieuwe posts vrijwel direct zichtbaar)
- Meta "Instagram API with Instagram Login" — account is business/creator (bevestigd), klant/Mike heeft toegang
- Long-lived token als Worker-secret; **scheduled Worker vernieuwt token elke ±50 dagen**
- Check éénmalig of Meta een webhook voor nieuwe media biedt; zo ja gebruiken, anders polling
- Weergave: grid van 5–10 recente posts, elk beeld linkt naar de post op Instagram (liken gebeurt dáár), duidelijke volg-knop

### 5.3 Reviews (Google + Facebook) — gecachet, geen keys in de browser

- **Dagelijkse GitHub Action**:
  - Google Places API (key in Action-secret) → recente reviews (API geeft ~5 per call) → **accumuleren** in `data/reviews-google.json` (nooit oude reviews weggooien)
  - Facebook Graph API (page-token, klant is admin) → ratings → `data/reviews-facebook.json`
  - Commit bij wijziging → automatische rebuild
- Site rendert reviews statisch: snel, gestyled, consent-vrij

### 5.4 Facebook Page Plugin

- Officiële embed (timeline + like + volg) op Home of aparte sectie — NA consent, met nette placeholder + "accepteer cookies om te laden"-knop ervoor

### 5.5 Cookie-consent

- Consent-banner vereist (YouTube- en Facebook-embeds). Categorieën: functioneel (altijd) / media & social (YouTube, FB-plugin)
- Zonder consent: video toont statisch thumbnail-kader met activeer-knop; reviews en Instagram-grid (eigen API) werken ALTIJD, die zijn consent-vrij

## 6. Design (goedgekeurd: concept v4 — zie design/concept-final4.html + .jpg)

### Referentie

- `design/concept-final4.html` — opent in elke browser; dit is de goedgekeurde look
- `design/logo-trans.png` — logo met transparantie (uit screenshot geknipt; **vraag Mike om origineel PNG/vector** en vervang)
- Sfeerbeelden `design/ph-*.jpg` zijn PLACEHOLDERS → alles in IMAGES-TODO.md

### Design-tokens (WCAG AA doorgerekend — niet wijzigen zonder hermeting)

```
kleur.tekst          #2A1330   (op #FDFAF4: 16.3:1)
kleur.subtekst       #6E5A73   (5.98:1)
kleur.achtergrond    #FDFAF4   (crème)
kleur.vlak-licht     #F4E9F5   (lila-tint secties)
kleur.donker         #241028   (footer, videoframe, badges)
kleur.cta            #C41320   (knoppen, witte tekst: 6.07:1)
kleur.accent-lila    #B381B6   (ALLEEN decoratief: borders, dividers — nooit tekst)
kleur.lila-tekst     #7A4E82   (6.22:1)
kleur.groen-tekst    #0E7A33   (5.24:1; felgroen #159641 alleen als dot/vlagstrip)
kleur.geel           #F3DE24   (badges op donker: 12.4:1)
vlag                 strip 4-4-6-4-4px  #159641 / #fff / #DF0E19 / #fff / #159641
```

- Typografie: display-serif voor koppen (voorstel: **Fraunces** via Google Fonts; fallback Playfair Display), humanist sans voor body (voorstel: **Source Sans 3** of Inter). Selfhost de fonts (geen Google-CDN i.v.m. AVG)
- Radii: kaarten 16–22px, knoppen 12–14px, videoframe 26px
- Schaduwrichting: zacht, plum-getint (`rgba(42,19,48,…)`)
- Signatuur-elementen: Surinaamse vlagstrip boven header en boven footer; logo in lichte header
- Hero (Home): **split** — links: badge "MAALTIJD OF SOEP · VANDAAG", H1 = gerechtnaam uit YouTube, subtekst, CTA-rij (menu-knop rood, bel-knop outline), open/dicht-status met dot; rechts: groot videoframe (donker plum kader, rode play, VANDAAG-badge geel, YouTube-knop)
- Motion: subtiele scroll-reveals en hover-states; `prefers-reduced-motion` volledig respecteren

## 7. Secrets & externe resources (aanmaken in overleg met Mike)

| Secret                        | Waar                     | Doel               |
| ----------------------------- | ------------------------ | ------------------ |
| GOOGLE_PLACES_API_KEY         | GitHub Action            | reviews ophalen    |
| FACEBOOK_PAGE_TOKEN           | GitHub Action            | FB-ratings ophalen |
| INSTAGRAM_ACCESS_TOKEN        | CF Worker secret         | insta-feed         |
| GITHUB_OAUTH_CLIENT_ID/SECRET | CF Worker (Sveltia auth) | CMS-login          |

- Cloudflare: 1 Pages-project, 1 Worker (api + cron), 1 KV-namespace
- GitHub: repo + Actions (dagelijkse review-sync)

## 8. Toegankelijkheid (harde eis: WCAG 2.1 AA / EN 301 549)

- Semantiek: `header/nav/main/footer`, één `h1` per pagina, logische kopstructuur
- Skip-link, zichtbare focus-states (outline in kleur.cta of donker), volledige toetsenbordbediening
- `lang="nl"` / `lang="en"` correct per taal; taalswitcher met aria-label
- Alt-teksten op alle beelden (CMS: verplicht alt-veld bij foto-upload)
- Openingstijden-afwijking: `role="status"`; open/dicht-indicator niet alleen met kleur (ook tekst)
- Video: title-attribuut, consent-placeholder bedienbaar met toetsenbord
- Contrast: uitsluitend token-combinaties uit §6
- CI: **axe-core** (bijv. @axe-core/playwright) draait op elke PR over alle pagina's; build faalt bij violations

## 9. Bouwvolgorde

1. **Content-migratie**: scrape huidige site (home, /menu/, /about/, /informatie/, /phias-fotos/, /contact/) → markdown/JSON content-bestanden; menu ter bevestiging aan Mike
2. **Skeleton**: SvelteKit + Tailwind + tokens + fonts + i18n (NL/EN) + layout (header/footer/vlagstrip) + consent-banner
3. **Pagina's** bouwen volgens design v4 (Home eerst, dan Menu, dan rest)
4. **CMS**: Sveltia-config + collections + OAuth-Worker; test met dummy-edit
5. **Workers**: /api/daily (YouTube RSS), /api/instagram (+ token-refresh cron), KV
6. **Reviews-Action** + reviewsectie
7. **Embeds** (FB Page Plugin, YouTube) achter consent
8. **A11y-pass** + axe-CI + Lighthouse (doel: 90+ op alle assen)
9. **Deploy**: Pages-project, preview-URL voor klantacceptatie → DNS-migratie → go-live-checklist (redirects van oude WP-URLs! /menu/, /about/, /informatie/, /phias-fotos/, /contact/ moeten blijven werken)

## 10. Open punten / nog nodig van Mike of klant

- [ ] Origineel logobestand (PNG hoge resolutie of vector)
- [ ] Echte foto's van gerechten en de zaak (tot die tijd: placeholders + IMAGES-TODO.md)
- [ ] Werkelijke openingstijden per weekdag (huidige site vermeldt alleen "vanaf 13:30")
- [ ] Google Places API-key, Facebook page-token, Meta-app voor Instagram (Mike regelt toegang)
- [ ] Bevestiging menustructuur + prijzen na scrape
- [ ] EN-vertalingen reviewen
