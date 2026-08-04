# Accessibility tests

These Playwright tests are the project's WCAG 2.1 AA gate (PROJECT-BRIEF §8, EN 301 549).

Run locally:

```sh
npm run build        # produce the static build/ output
npm run test:a11y    # vite preview + axe-core over every page
```

What it checks, for all NL and EN routes:

- **axe-core** scan with tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` — zero violations allowed.
- **Structure**: a non-empty `<title>`, exactly one `<h1>`, and `<html lang>` equal to `nl` (root) or `en` (`/en...`).

The tests drive a single **Chromium** browser against `vite preview` on port 4173. CI runs `npm run build` first, then this suite; any violation fails the build.
