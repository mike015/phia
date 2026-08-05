# Accessibility tests

Playwright + axe-core checks voor WCAG 2.1 AA (PROJECT-BRIEF §8, EN 301 549).

**Deze suite draait niet automatisch** — er is bewust geen aparte CI; alleen
Cloudflare bouwt/deployt op elke push. Draai de a11y-check zelf wanneer je iets
aan de UI verandert.

Lokaal draaien:

```sh
npm run build        # produce the static build/ output
npm run test:a11y    # vite preview + axe-core over every page
```

What it checks, for all NL and EN routes:

- **axe-core** scan with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` — zero violations allowed.
- **Structure**: a non-empty `<title>`, exactly one `<h1>`, and `<html lang>` equal to `nl` (root) or `en` (`/en...`).

The tests drive a single **Chromium** browser against `vite preview` on port 4173.
Run `npm run build` first so `build/` exists, then `npm run test:a11y`.
