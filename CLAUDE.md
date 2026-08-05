# Phia's Smulparadijs — Website Rebuild

Rebuild van https://www.phiassmulparadijs.nl/ (oude WordPress-site) naar een moderne
SvelteKit-site op Cloudflare. Het volledige projectplan, alle klantbeslissingen en het
goedgekeurde design staan in `PROJECT-BRIEF.md` — **lees dat bestand eerst volledig.**

## Kern

- **Stack**: SvelteKit (static-first) + Tailwind CSS, deploy op Cloudflare Pages, repo op GitHub
- **CMS**: Sveltia CMS op `/admin` (GitHub-backend). Eigenaren zijn niet-technisch: alles via formulieren, nooit git zichtbaar
- **Talen**: NL (default) + EN
- **Design**: goedgekeurd concept in `design/concept-final4.html` + `design/concept-final4.jpg`. Volg de design-tokens in de brief exact. WCAG 2.1 AA is een harde eis (EN 301 549)

## Werkwijze

- Volg het stappenplan in `PROJECT-BRIEF.md` §9 in volgorde; werk stap voor stap en commit per stap
- Vraag om bevestiging vóór: het aanmaken van externe resources (Cloudflare KV/Workers, GitHub secrets), en vóór elke stap die geld kan kosten
- Secrets NOOIT in de repo; zie §7 voor de volledige secrets-lijst
- Houd `IMAGES-TODO.md` bij: elk placeholder-beeld dat je gebruikt komt daarin met locatie + gewenste vervanging
- Test a11y met axe-core (CI-stap verplicht, zie §8)
- Nederlandse content is leidend; EN-vertalingen mogen door jou geschreven worden maar markeer ze als "te reviewen"

## Verificatiepunten (aannames die je moet checken vóór gebruik)

1. YouTube channel/uploads-playlist-ID — zie brief §5.1, de gescrapete ID bevatte mogelijk een linebreak
2. Beschikbaarheid van een Meta-webhook voor nieuwe Instagram-posts (zo ja: gebruiken; zo nee: 5-min polling zoals gepland)
3. De exacte menustructuur en prijzen: scrape https://www.phiassmulparadijs.nl/menu/ en leg voor aan Mike vóór migratie
