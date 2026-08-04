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

**Let op:** menu-highlights, voorbeeldreviews en de menustructuur op /menu zijn
placeholder-content (`src/lib/assets/images.ts`, home + menu-pagina). Vervangen zodra
de echte menustructuur/prijzen (§9) en de reviews-Action (§5.3) live zijn.
