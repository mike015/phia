# Dependency updates / Afhankelijkheden bijwerken

**EN —** Automatic pull/merge requests that update outdated npm packages for this
project. Every week a bot checks `package.json`, and opens PRs/MRs when newer
versions are available. You review and merge them; you never edit versions by hand.

**NL —** Automatische pull-/merge-requests die verouderde npm-pakketten van dit
project bijwerken. Elke week controleert een bot `package.json` en opent PR's/MR's
zodra er nieuwere versies zijn. Jij reviewt en merget ze; je past nooit handmatig
versienummers aan.

> **Belangrijk / Important:** deze jobs bouwen of deployen **niets**. Cloudflare
> blijft de site bouwen en uitrollen. Dit gaat alleen over het *voorstellen* van
> versie-updates.

De grouping- en scheduleregels staan in [`renovate.json`](../renovate.json)
(Renovate) en [`.github/dependabot.yml`](../.github/dependabot.yml) (Dependabot):
minor + patch worden gebundeld, major-updates krijgen een aparte PR/MR, label
`dependencies`, wekelijks op maandagochtend.

---

## GitLab (Renovate via CI-schedule)

De repo bevat [`.gitlab-ci.yml`](../.gitlab-ci.yml) met één job (`renovate`) die
alleen op *scheduled* pipelines draait.

1. **Access token aanmaken.** Maak een **project access token** (of group access
   token) aan met scope **`api`** en rol **Developer** of **Maintainer**.
   *Settings → Access tokens.*
2. **CI/CD-variabele toevoegen.** Ga naar *Settings → CI/CD → Variables* en voeg
   toe:
   - Key: `RENOVATE_TOKEN`
   - Value: het zojuist gemaakte token
   - Zet **Masked** aan (en desgewenst **Protected** uit, zodat schedules op elke
     branch werken).
3. **Pipeline schedule aanmaken.** Ga naar *Build → Pipeline schedules → New
   schedule* en zet een **wekelijkse** cron (bijv. maandag 05:00). Target branch:
   `main`.

Vanaf dan opent Renovate wekelijks Merge Requests. De job bouwt/deployt niets.

## GitHub

Kies **één** van de twee opties (niet allebei, anders krijg je dubbele PR's):

- **Optie A — Dependabot (aanbevolen, zero-setup).** Het meegecommite bestand
  [`.github/dependabot.yml`](../.github/dependabot.yml) is genoeg. GitHub start
  Dependabot automatisch; er is geen token of workflow nodig. Controleer eventueel
  *Settings → Code security → Dependabot* dat het aanstaat.
- **Optie B — Renovate GitHub App.** Installeer de
  [Renovate-app](https://github.com/apps/renovate) op de repo `mike015/phia`. Die
  gebruikt dezelfde [`renovate.json`](../renovate.json). Zet in dat geval
  `.github/dependabot.yml` uit (of verwijder het) om dubbele PR's te voorkomen.

---

## Samenvatting / Summary

| Platform | Mechanisme | Setup nodig |
|----------|-----------|-------------|
| GitLab   | Renovate via `.gitlab-ci.yml` + pipeline schedule | `RENOVATE_TOKEN` variabele + schedule |
| GitHub   | Dependabot (`.github/dependabot.yml`) **of** Renovate App | Geen (Dependabot) / app installeren (Renovate) |

Geen van deze jobs bouwt of deployt de site — dat blijft Cloudflare.
