# IMAGES-TODO — te vervangen placeholders

| Bestand               | Gebruikt op                                          | Vervangen door                                         |
| --------------------- | ---------------------------------------------------- | ------------------------------------------------------ |
| design/logo-trans.png | header, hero                                         | origineel logobestand (PNG hi-res of vector) van klant |
| design/ph-warm.jpg    | hero-video-thumbnail placeholder, menukaart 1, insta | echte foodfoto / echte YouTube-thumbnail               |
| design/ph-purple.jpg  | sfeer-band, menukaart 2                              | sfeerfoto van de zaak of gerecht                       |
| design/ph-table.jpg   | menukaart 3                                          | foto gerecht                                           |
| design/ph-dark.jpg    | menukaart 4                                          | foto gerecht                                           |

Bij elke nieuwe placeholder tijdens de build: hier toevoegen.

## Toegevoegd tijdens skeleton-build (SEO/responsive/enhanced-img)

| Bestand                     | Gebruikt op                                                                       | Vervangen door                                                |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| static/og-image.jpg         | social share (Open Graph / Twitter) — gegenereerd uit ph-warm.jpg + tekst         | echte social-share afbeelding 1200×630 met echt logo/foodfoto |
| static/favicon.svg          | browser-tab icoon + manifest                                                      | favicon op basis van origineel logo                           |
| static/icon-180/192/512.png | apple-touch-icon + PWA-manifest                                                   | PNG-iconen uit origineel logo                                 |
| src/lib/assets/ph-*.jpg     | hero-video-thumbnail, menukaarten, sfeer-band, galerij, insta-grid, video-archief | echte food-/sfeerfoto's en echte YouTube-thumbnails           |

## ECHTE beelden — geëxtraheerd uit de officiële menukaart-PDF (juli 2026)

| Bestand                                   | Gebruikt op                                                     | Status                                                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| src/lib/assets/heri-heri-moksi-alesie.jpg | home-hero-thumbnail, menukaart 1, maaltijd-hero, insta, galerij | ✅ echt (Phia's eigen foto uit de kaart). Wél tekst-overlay + bedrijfskaartje in beeld — evt. later schonere studiofoto |
| src/lib/assets/jarpesi-moksi-alesie.jpg   | sfeer-band, menukaart 2, insta, galerij                         | ✅ echt (idem)                                                                                                          |

**Nog steeds placeholder:** `src/lib/assets/ph-*.jpg` (menukaart 3–4, galerij, insta-vulling)
en het logo. Vervangen door echte foto's/logo van de klant.

**Menu:** de menustructuur en prijzen op /menu komen nu 1-op-1 uit de officiële
PDF (`src/lib/menu.ts`, `static/menu/phias-menu-juli-2026.pdf`) — GEEN placeholder meer.
De owner kan later via het CMS de PDF vervangen door een nieuwe editie.

**Reviews** op de home zijn nog voorbeeld-content tot de reviews-Action (§5.3) live is.
