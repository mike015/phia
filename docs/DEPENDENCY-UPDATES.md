# Automatische package-updates (GitHub Dependabot)

De npm-packages van dit project worden automatisch bijgehouden door
**GitHub Dependabot**. Dependabot is een ingebouwde GitHub-dienst: er is geen
externe service (zoals GitLab of Renovate) nodig en er hoeft niets extra
geïnstalleerd te worden.

## Wat het doet

- Dependabot bekijkt wekelijks (maandagochtend) de `package.json` /
  `package-lock.json`.
- Voor verouderde packages opent het **pull requests** met de update.
- Minor- en patch-updates worden gebundeld in één PR (`groups`), zodat je niet
  bedolven wordt onder losse PR's. Grote (major) updates komen apart, zodat je ze
  per stuk kunt beoordelen.
- Elke PR krijgt het label `dependencies`.

Configuratie: [`.github/dependabot.yml`](../.github/dependabot.yml).

## Belangrijk: dit bouwt of deployt niets

Dependabot opent alleen PR's die de package-versies wijzigen. Het bouwt en
deployt de site **niet** — dat blijft Cloudflare doen bij elke commit op de
branch. Een Dependabot-PR gaat dus pas live nadat jij hem merget (en Cloudflare
daarna bouwt).

## Instellen

Niets. Dependabot staat "uit de doos" aan zodra `.github/dependabot.yml` op de
standaardbranch (bijv. `main`) staat. Je kunt het controleren onder
**GitHub → repo → Insights → Dependency graph → Dependabot**.

## Een update doorvoeren

1. Open de Dependabot-PR.
2. Wacht op de Cloudflare-previewbuild (of test lokaal met `npm ci && npm run build`).
3. Is alles goed → merge de PR. Cloudflare bouwt en deployt daarna automatisch.

## Wekelijkse cadans aanpassen

Wijzig in `.github/dependabot.yml` het `schedule`-blok (`interval`, `day`,
`time`). Zie de
[Dependabot-documentatie](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file).
