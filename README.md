# Phia's Smulparadijs — website

Rebuild van [phiassmulparadijs.nl](https://www.phiassmulparadijs.nl/) naar een moderne,
static-first **SvelteKit**-site. Volledige spec: **[`PROJECT-BRIEF.md`](./PROJECT-BRIEF.md)**
(lees dat eerst). Werkafspraken: **[`CLAUDE.md`](./CLAUDE.md)**.

Dit is de projectbasis (skeleton) met de nadruk op **SEO, metadata, responsiviteit en
geoptimaliseerde beelden** — de fundering waarop de rest van het stappenplan (§9) verder bouwt.

## Stack

|           |                                                                                               |
| --------- | --------------------------------------------------------------------------------------------- |
| Framework | SvelteKit 2 + Svelte 5 (runes)                                                                |
| Styling   | Tailwind CSS v4 — design-tokens uit brief §6 in `src/app.css`                                 |
| Beelden   | `@sveltejs/enhanced-img` → AVIF/WebP + responsive `srcset`, build-time                        |
| Fonts     | Self-hosted via `@fontsource-variable` (Fraunces + Source Sans 3) — **geen Google-CDN** (AVG) |
| Talen     | NL (default, `/`) + EN (`/en`) via optionele route-param `[[lang=lang]]`                      |
| Output    | `@sveltejs/adapter-static` — volledig geprerenderd, klaar voor Cloudflare Pages               |

## Aan de slag

```bash
npm install
npm run dev        # dev-server
npm run build      # prerender naar ./build
npm run preview    # preview productie-build
npm run check      # svelte-check (types + a11y) — 0 errors/warnings
npm run format     # prettier
```

## Projectstructuur

```
src/
  app.css                     Tailwind + design-tokens + basis-a11y (skip-link, focus, reduced-motion)
  hooks.server.ts             zet <html lang> per taal
  params/lang.ts              matcher: alleen 'en' krijgt prefix
  lib/
    config.ts                 bedrijfsgegevens (single source of truth)
    i18n.ts                   NL/EN woordenboek (EN = "te reviewen")
    assets/                   placeholder-beelden + enhanced-img imports
    actions/reveal.ts         subtiele scroll-reveal (respecteert reduced-motion)
    components/               Header, Footer, PageHeader, OpenStatus
    seo/
      meta.ts                 canonical + hreflang-alternates + OG/Twitter
      Seo.svelte              rendert alle <head> meta
      jsonld.ts               Restaurant/LocalBusiness, WebSite, BreadcrumbList
      JsonLd.svelte           JSON-LD renderer
      routes.ts               paden voor de sitemap
  routes/
    [[lang=lang]]/            NL op /, EN op /en — home, menu, over-ons,
                              maaltijd-of-soep, fotos, contact
    sitemap.xml/              dynamische sitemap mét hreflang-alternates
    robots.txt/
```

## Wat is er op SEO / metadata / responsiviteit gedaan

**SEO & metadata**

- Per pagina: unieke `<title>`, `meta description`, canonical.
- **hreflang-alternates** (nl / en / x-default) op elke pagina én in de sitemap.
- **Open Graph** + **Twitter Card** (`summary_large_image`) met gegenereerde `og-image.jpg`.
- **JSON-LD structured data**: `Restaurant` (adres, geo, telefoon, openingstijden,
  `aggregateRating`), `WebSite` en per subpagina een `BreadcrumbList` → rich results.
- `sitemap.xml` (geprerenderd, met alternates) + `robots.txt` (verwijst naar sitemap, weert `/admin`).
- Geo-meta (`geo.position`, `ICBM`) en `web manifest` + favicons/PWA-iconen.
- Semantische HTML, correcte `<html lang>` per taal, één `<h1>` per pagina.

**Responsiviteit**

- Mobile-first Tailwind; split-hero stapelt op mobiel, staat naast elkaar op ≥lg.
- Responsieve header met toetsenbard-toegankelijk hamburger-menu.
- Vloeiende grids (menukaarten, reviews, galerij, insta) met `sizes`-hints per breakpoint.

**Beelden (`enhanced-img`)**

- Alle beelden worden bij build omgezet naar **AVIF + WebP** met meerdere resoluties en
  correcte `width`/`height` (geen layout-shift) en `sizes`-hints.
- Hero/logo: `fetchpriority="high"`; galerij: `loading="lazy"`.

## Toegankelijkheid (WCAG 2.1 AA — harde eis, brief §8)

Skip-link, zichtbare focus-states, `prefers-reduced-motion` volledig gerespecteerd,
open/dicht-indicator niet kleur-only (ook tekst, `role="status"`), openingstijden als
toegankelijke tabel, alt-teksten. `npm run check` draait a11y-lint (0 warnings).
**Nog te doen:** axe-core in CI (brief §8) — hoort bij de CI-stap van het stappenplan.

## Menu & openingstijden (bron: officiële menukaart-PDF juli 2026)

- **Volledig menu** in `src/lib/menu.ts` — alle categorieën, prijzen (normaal/speciaal,
  klein/groot/XL), item-notities, "goed om te weten"-blok en allergenen. NL 1-op-1 van de
  kaart; EN is een eerste vertaling, **te reviewen**. Gerenderd op `/menu` (+ `Menu`
  structured data voor rich results).
- **Downloadbare PDF** op de menu-pagina (`static/menu/phias-menu-juli-2026.pdf`). De owner
  vervangt deze later via het CMS door een nieuwe editie.
- **Echte openingstijden**: di–za 12:00–19:00, zo & ma gesloten, keuken vanaf 13:30,
  afwijkend in vakantieperiodes — verwerkt in `config.ts`, de open/dicht-indicator, de
  contact-tabel en de `Restaurant` JSON-LD.
- **Echte foto's**: twee gerechtfoto's uit de PDF geëxtraheerd (`heri-heri` / `jarpesi
moksi-alesie`) en in gebruik op home-hero, menu-cards, galerij en Instagram-grid.

### Beeld- en menu-scrape van de oude site

`scripts/scrape-site.mjs` haalt resterende beelden (logo hi-res, storefront, extra
foodfoto's) en pagina-tekst van de oude WordPress-site. **Vereist netwerktoegang tot
phiassmulparadijs.nl** — in de standaard web-sessie blokkeert de egress-policy alle hosts
behalve package-registries, dus draai dit lokaal of in een omgeving met een ruimere
netwerk-policy (`node scripts/scrape-site.mjs`).

## Bewust nog NIET gebouwd (volgt in stappenplan §9, vaak met kosten/akkoord van Mike)

CMS (Sveltia), Cloudflare Workers (`/api/daily` YouTube-RSS, `/api/instagram`), reviews
GitHub Action, cookie-consent + YouTube/Facebook-embeds. Placeholders en aannames staan in
`IMAGES-TODO.md` en de open punten in `PROJECT-BRIEF.md` §10.

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `build`. Voor de dynamische `/api/*`
Workers later: wissel `@sveltejs/adapter-static` om naar `@sveltejs/adapter-cloudflare`.

---

Website door **Blackgate** · _Soso Lobi ❤_
