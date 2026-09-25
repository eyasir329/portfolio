# DEV-07 — Quality Gates & Checklists

> Status: **Draft v0.5** · Related: [15 §8 Definition of Done, §9 Launch checklist](../15-testing-and-qa.md), [16 §5 Definition of Ready](../16-delivery-plan.md), [DEV-04](dev-04-phase-plans.md), [UX-09 §4](../ux/ux-09-ux-audit.md)

Gates exist at four levels: **every PR**, **every deploy**, **every phase**, and **once before
public traffic**. Each item is either automated (🤖, blocks in CI) or manual (✋, ticked in the PR,
release or milestone).

---

## 1. Pull-request checklist (Definition of Done per PR)

| # | Item | How |
|---|---|---|
| 1 | Linked IDs (`US`, `FR`, `WF`, `ADR`) and acceptance criteria met | ✋ PR template |
| 2 | Lint, types, unit tests, coverage ≥ 80% for `lib/` and `runtime/` | 🤖 `ci.yml` |
| 3 | Migration: RLS + policies + pgTAP in the same PR; advisors clean; types regenerated; expand/contract step named | 🤖 `db` job + ✋ header comment |
| 4 | UI: matches the wireframe or the deviation is noted; light and dark; D and M screenshots | ✋ |
| 5 | Accessibility: axe clean in E2E; keyboard path from UX-08 checked for new interactions | 🤖 + ✋ |
| 6 | Performance: route JS budget; Lighthouse budget on changed pages; runtime ≤ 8 KB | 🤖 |
| 7 | Security: no secrets (grep); `requireRole`/`requireUser` on new actions; Zod on inputs; no main-origin cookies on the content origin | 🤖 + ✋ |
| 8 | Guest data touched? RLS test for cross-user access + privacy page still accurate | ✋ ([15 §8](../15-testing-and-qa.md)) |
| 9 | Flags: new flags registered in DEV-05 §6 with per-environment defaults | ✋ |
| 10 | Docs updated per DEV-02 §8 | ✋ |
| 11 | E2E on the preview green | 🤖 `e2e.yml` |

## 2. Deploy checklists

### 2.1 Before approving production (release workflow paused at the gate)

- [ ] Staging smoke job green for this commit
- [ ] Friday demo items for this release accepted (or hotfix scope agreed)
- [ ] Migrations in this release are expand-only, or their contract step follows a release where the
      app stopped using the old shape
- [ ] Remote settings changed? (OAuth, redirect URLs, Vault, DNS) Done and noted in the release
- [ ] Flags to flip after deploy listed
- [ ] On-demand backup taken if a migration touches existing data at scale

### 2.2 Smoke tests (automated in `release.yml`, both environments)

| Check | Expected |
|---|---|
| `GET /api/health` | 200 with DB round trip and commit SHA |
| Home, `/projects`, `/docs` (if public) | 200, correct `<title>`, security headers present |
| A published topic on the content host | 200, `Vercel-Cache-Tag` present, CSP header, runtime block present only when its roadmap mode is `inject` |
| `/login` | 200, both providers listed |
| `/admin` signed out | Redirect to `/login` |
| `/__api/me` signed out | 401 |
| `robots`/`noindex` | Non-production: `noindex`; production: indexable only after `site.launch` |

### 2.3 After production deploy (✋, 10 minutes)

- [ ] Sentry: no new error spike for the release
- [ ] Flip the planned flags; re-run the relevant smoke checks
- [ ] Uptime monitors green
- [ ] Release notes published (tag)

## 3. Phase gates

Each gate is the milestone's closing checklist. The owner ticks the final line.

### PG-1 Foundations

- [ ] UAT-01 on staging **and** production; guest gets 403 on `/admin`
- [ ] CI pipeline complete (all jobs in DEV-05 §3 active; branch protection on)
- [ ] Release workflow proven: merge → staging → approval → production, with a deliberate rollback rehearsal (RB-03)
- [ ] Production holding page live on the domain; `read.` and `staging.` hosts resolve
- [ ] Spikes SP-01…SP-13 recorded as ADR updates; ADR-021 written
- [ ] Sentry, health endpoint and uptime monitors alerting
- [ ] `CLAUDE.md`, `CONTRIBUTING.md`, `.claude/settings.json` committed; MCP permissions verified
- [ ] Owner sign-off

### PG-2 Portfolio core

- [ ] UAT-02, UAT-13; WF-10…18 implemented (static hero)
- [ ] Lighthouse budgets on Home and Project (production URLs)
- [ ] Contact email delivered from production; Turnstile on
- [ ] CV drafts imported and reviewed in production
- [ ] Owner sign-off

### PG-3 Bundle engine & Roadmap Docs

- [ ] UAT-04, 05, 06; T-KB-* green; reference bundle byte-identical except the runtime block
- [ ] CDN purge within 60 s verified on production
- [ ] Bundle CLI token issued for the owner; outline created
- [ ] Owner sign-off

### PG-4 HTML blog

- [ ] UAT-03; T-BLOG-* green; scheduled publish verified on production (a private test post)
- [ ] Feeds validate; OG images render
- [ ] Owner sign-off

### PG-5 Reader accounts & progress

- [ ] UAT-07, 08, 09, 12; T-RT-*, T-BR-*, T-GU-* green; runtime ≤ 8 KB
- [ ] Privacy and terms live before `accounts.signup` leaves `closed`
- [ ] Closed beta ran ≥ 1 week with error rate < 2% and feedback triaged
- [ ] Deletion and inactivity jobs verified on staging with test accounts
- [ ] Owner sign-off

### PG-6 Owner CP tracking

- [ ] UAT-10, 11; T-CPT-* green on fixtures; contract check scheduled
- [ ] 3 consecutive unattended days of green runs in production
- [ ] "Needs extension" judges labelled honestly on the public page
- [ ] Owner sign-off

### PG-7 3D & motion

- [ ] UAT-14 on a mid-range phone and a laptop; reduced motion and 3D-off paths
- [ ] Lighthouse budgets met with 3D on (Home, CP)
- [ ] Owner sign-off

### PG-8 Launch

- [ ] Launch checklist [15 §9](../15-testing-and-qa.md) complete
- [ ] Production-readiness review (§4) passed
- [ ] UX-09 §4 accessibility record filled for the listed screens
- [ ] Restore drill done in the last 30 days
- [ ] Owner sign-off, launch date set

## 4. Production-readiness review (before public launch and before opening sign-up)

| Area | Question | Evidence |
|---|---|---|
| Security | Do RLS tests cover every policy-matrix cell? Are advisors clean on production? Is CSP enforced on both hosts? | CI run, advisor output, header test |
| Privacy | Is every stored guest field listed on the privacy page? Do export and delete work end to end? | UAT-12 record |
| Reliability | Are all jobs scheduled in production and visible in `sync_runs`? Are alerts routed to the owner? | Dashboard screenshot, test alert |
| Recovery | When was the last restore drill, and how long did it take? | Ops log |
| Performance | Do Lighthouse and web vitals meet [02](../02-non-functional-requirements.md) on production URLs? | Lighthouse CI report |
| Accessibility | Are UX-08 §7 checks done? | UX-09 §4 |
| Operations | Is every runbook in DEV-06 actionable by someone other than the author? | Walkthrough note |
| Cost | Is usage below 50% of every free-tier limit? | Usage screenshots |

## 5. Handover readiness (bus factor)

The project is ready to hand to another developer when these exist and are current:
`README.md`, `CONTRIBUTING.md` (DEV-01 §3 as commands), `CLAUDE.md`, this playbook, the access
list (who owns which account in DEV-01 §2), runbooks (DEV-06), and the offline backup key
location known to a second trusted person.
