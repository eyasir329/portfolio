# Planning Changelog

## Revision 0.6 — 2026-09-25 · Implementation starts

Requested by the owner: **start development as a senior full-stack developer, add the necessary tools
and skills, and build a website that represents the owner as a junior software engineer, in a unique
and beautiful way.**

### Built

| Area | What exists now | Plan reference |
|---|---|---|
| Scaffold & tooling | Next.js 16.3 (App Router, Turbopack), React 19, TypeScript strict, Tailwind v4, ESLint, Prettier, Vitest, Playwright + axe, Supabase CLI (dev dependency), `CLAUDE.md`, `.claude/settings.json` (MCP least-privilege rules from DEV-01 §6.2), `.env.example`, CI workflow | US-100, US-101, DEV-01, DEV-02 |
| Design system | Marble & Ink tokens (light "Paper" / dark "Night library", no-flash theme script), Newsreader + Geist + Geist Mono, kickers with Roman numerals, wall labels, catalogue plates, hairlines, reduced-motion rules, print styles | 04, US-110…112 |
| Shell | Sticky header with current-page state, focus-trapped mobile menu, theme toggle (system/light/dark), skip link, colophon footer | WF-00…05, US-111 |
| Pages | Home (hero, proof strip, selected work, contest record, chronology, workshop, coda), Work index + five case studies, Experience (roles, education, certifications), CP Journey, About (with skills), Writing ("in the workshop", honest about nothing being published yet), Contact, printable CV at `/resume`, 404, error page | WF-10…21, US-120…124, US-020, US-050 |
| 3D | S1 "Plaster Graph" hero (deterministic graph; the highlighted path is a real Dijkstra shortest path), SVG poster first, WebGL fade-in, pause control, off under reduced motion; S2 "Colonnade" from Codeforces rating history with a table twin | 05, US-160…162 |
| Live data | Codeforces `user.info` + `user.rating`, cached daily; falls back to the last recorded max rating with an "as of" note when the API is unreachable | FR-CP, U4 |
| Contact | Server Action with Zod validation, inline errors + error summary, honeypot, salted IP-hash rate limit (3/hour), stored in Supabase `messages`; without Supabase keys it hands off to the visitor's email app | FR-CONTACT, UX-07 §3 |
| Database | Migration `messages` (RLS on, public roles revoked, check constraints, indexes); 7 pgTAP tests; `supabase db lint` clean | 07, DEV-03 |
| SEO | Metadata per page, Person JSON-LD, generated Open Graph image, sitemap, robots (non-production is `noindex`), SVG icon | FR-SEO, US-171 |
| Quality | 16 unit tests; 30 E2E tests (9 pages × desktop and mobile: one `h1`, no console errors, no serious/critical axe violations; plus flows for CV, CP table, contact, theme, 404) | 15, DEV-07 §1 |

### Deliberate deviations from the plan (to review)

| Plan said | Now | Why |
|---|---|---|
| Content in Supabase tables edited in admin | Typed files in `content/`, validated by Zod in CI | Admin and auth (US-001, US-105…) are not built yet; moving content to the database is part of P2 |
| Positioning "Full-Stack Developer · Software Engineer" | **"Junior Software Engineer"** (full-stack, competitive programmer) | Owner request |
| Node 24 LTS | Node 22+ (`.nvmrc` = 22) | Matches the current tooling; bump when convenient |
| Release workflow (ADR-022) | Only `ci.yml` so far | Needs the Vercel project and Supabase projects/secrets, which the owner creates |
| Project years, ICPC month, screenshots | Omitted; typographic "catalogue plates" instead of screenshots | Not in the CV; nothing is invented (U4) |

### Verified in this session

`pnpm check` (lint, types, unit), `pnpm build` (19 routes), `pnpm e2e` (30/30), `supabase db reset` +
`supabase test db` (7/7) + `supabase db lint` against a local Postgres 17 container.

### Still needs the owner

Authenticate the Supabase MCP server (it failed to connect from the cloud session); create the Vercel
project and the production Supabase project (`Q-43`); set `NEXT_PUBLIC_SUPABASE_URL`,
`SUPABASE_SECRET_KEY` and `CONTACT_IP_SALT`; supply the content listed in [18 §9](18-content-inventory.md)
(screenshots, final CGPA, contest details, other judge handles).

## Revision 0.5 — 2026-09-25

Requested by the owner: **connect the Supabase MCP server (project `kahrpgvddpukjbwdxhlq`) and the
Supabase agent skills, then plan, as a senior full-stack developer, how every phase is developed and
deployed, still without application code.**

| Area | Before (0.4) | Now (0.5) | Where |
|---|---|---|---|
| Developer tooling | None in the repository | `.mcp.json` (Supabase MCP, project-scoped, added with `claude mcp add --scope project`); `.claude/skills/supabase` and `supabase-postgres-best-practices` + `skills-lock.json` (installed with `npx skills add supabase/agent-skills`, reviewed: Markdown only) | root, DEV-01 |
| Engineering playbook | DevOps summary in 14; phases and backlog in 16 | New [`dev/`](dev/README.md) folder: toolchain and AI-agent safety (DEV-01), conventions (DEV-02), Supabase workflow (DEV-03), phase plans with build order, schema, tests, flags, deploy, demo, exit and rollback for P1…P8 (DEV-04), CI/CD and release (DEV-05), operations with runbooks RB-01…16 (DEV-06), quality gates PG-1…8 (DEV-07) | dev/ |
| Environments | Local, preview, production | **Staging** added as a stable alias (`staging.` / `read.staging.`) on the staging Supabase project; the connected project `kahrpgvddpukjbwdxhlq` is planned as staging (`Q-43`) | DEV-03, DEV-05, 14, ADR-012 |
| Release process | Vercel Git integration deploys production on merge | Approval-gated release workflow: migrate then deploy, staging first (ADR-022, `Q-46`) | DEV-05, 14, 17 |
| Migrations | One logical list in 07 §10 | Introduced per phase; RLS and pgTAP in the same file; CLI-generated names; expand → migrate → contract | DEV-03, 07 |
| AI access | — | MCP on staging only; permissions deny migrations, deploys and branch tools; production not connected (`Q-44`); ADR-021; risk R-24 | DEV-01, 17 |
| Spikes | SP-01…SP-11 | SP-12 (Supabase tooling) and SP-13 (release pipeline), inside US-102/US-103: estimate unchanged at ≈ 135 dev-days | 16 |
| Runbooks | 14 §8 | Superseded by DEV-06 (16 runbooks, incident process, rotation and maintenance calendars) | 14, DEV-06 |
| Owner questions | Q-01…Q-42 | **Q-43…Q-46 (DEV)**: role of the connected project, production MCP access, production plan, release model | 21 §3 |
| Consistency fix | R-02 mitigation mentioned an "every-minute worker" removed in 0.3 | Now "daily scheduled jobs + uptime pings; RB-01" | 17 |

## Revision 0.4 — 2026-09-25

Requested by the owner: **complete UI/UX design documentation for every page, with proper
wireframes, the UX skills applied, and a full visual and UX audit, still without code.**

| Area | Before (0.3) | Now (0.4) | Where |
|---|---|---|---|
| UX strategy | Personas and principles spread across 00/01/04 | UX vision, jobs-to-be-done, principles U1–U8, the UX methods applied, content priority ladders, research and usability-testing plan, fidelity plan | ux/UX-00 |
| Flows | Journeys in 01 | Journey maps (recruiter, learner, owner) and 11 flow diagrams F-01…F-11 with error paths | ux/UX-01 |
| Layout & shell | Grid tokens in 04 | Breakpoints D/T/M/W, reflow rules, header (D/T/M), mobile sheet, search dialog, account menu, footer, utility controls, page anatomy | ux/UX-02 |
| Wireframes | A few sketches in 03/09 and a wireframe to-do list in 04 §10 | **58 screens** drawn at low fidelity with annotations, states and FR links: public (WF-10…21), blog/docs/reading room (WF-30…41), reader accounts (WF-50…55), admin (WF-60…81) | ux/UX-03…06 |
| Admin screens | Sketches in 09 | Redrawn in full; **UX-06 supersedes 09's sketches** | ux/UX-06, 09 |
| Components & states | Component list in 04 §6 | State model, full state lists per component, forms, feedback timings, empty/loading/error patterns, typed confirmation, microcopy and word list, status badges | ux/UX-07 |
| Interaction, motion, a11y | Motion tokens in 04 §7, NFR-A11Y in 02 | Keyboard map, motion specs M1–M15 with reduced-motion fallbacks, WCAG 2.2 AA mapping (incl. 2.4.11, 2.5.7, 2.5.8, 3.3.7, 3.3.8), screen-reader annotations per page, focus rules, AT test matrix | ux/UX-08 |
| UX audit | — | Nielsen heuristic matrix, 18 findings (UXF-01…18), cognitive walkthroughs of the 6 critical tasks, dark-pattern checklist, a11y audit record, UX sign-off sheet | ux/UX-09 |
| Fixes found by the review | — | Desktop header wireframe cut off *Contact* (redrawn); delete-account copy now matches doc 19 (immediate, hard delete within 30 days); stale "CP summary" on `/me` removed from the 21 checklist | UX-02, UX-07, 21 |
| Owner questions | Q-01…Q-36 | **Q-37…Q-42 (UX)** added: CV link on desktop, chip position, admin "CV data" merge, CP nav label, CP activity on phones, hi-fi scope | 21 §3, UX-09 §5 |
| Estimates | ≈ 135 dev-days | Unchanged: this is design documentation. The P1 mid/hi-fi mock-ups (UX-00 §7) are design time outside the dev-day estimate, scoped by Q-42. The Definition of Ready now points at the `WF-nn` wireframes | 16 |

## Revision 0.3 — 2026-09-25

Requested by the owner: **no CP progress tracking for learners.**

| Area | Revision 0.2 | Now (0.3) | Where |
|---|---|---|---|
| Learner CP tracking | Guests link handles on 10 judges, `/me/cp` hub, extension tokens, auto-verified practice | **Removed.** FR-CPT withdrawn (kept as one "Won't" row for traceability); persona P-06, journey J-6 and stories US-083/084 dropped | 01, 19, 20 |
| Owner CP tracking | Shared multi-tenant engine | **Kept for the owner only**: 10 judges feed the public CP Journey page | 20, 11 §6 |
| Sync orchestration | DB job queue + worker every minute | **One daily pg_cron run per platform**, advisory lock, resumable cursors, "Run now" (ADR-019 revised) | 20 §5, 12, 06 §6.5, 07 §9 |
| Roadmap practice | Auto-verified from judge solves | Readers tick practice problems themselves (still part of roadmap progress) | 10, 19 |
| Browser extension | Guests' personal tokens | The owner's extension only, admin-only `cp:ingest` token | 20 §7, 08, 13 |
| Database | Per-user `cp_accounts`, `cp_sync_jobs`, `bundle_practice_items`, progress `source` | Owner-only CP tables; queue, practice items and verification removed; guest data = reading progress | 07 |
| Reader panel | `/me`, `/me/roadmaps`, `/me/cp`, `/me/extension`, `/me/settings` | `/me`, `/me/roadmaps`, `/me/settings` | 03, 19 |
| Delivery | ≈ 142 dev-days | **≈ 135 dev-days** (US-159, US-218, US-219 removed; others trimmed); P6 no longer depends on P5 | 16 |
| Risks & questions | R-13, R-19, R-21 medium | Downgraded; Q-23, Q-30 reworded; Q-35 withdrawn | 17, 21 |
| Tests | T-RT-06, T-CPT-03…06, T-GU-02/03, T-DB-13, UAT-09/10 covered learner CP | Replaced by reset-progress, run-lock, resumable-backfill, owner-extension and admin-only-token tests | 15 |

## Revision 0.2 — 2026-09-25

Requested by the owner: (1) blog content is written in HTML and must render in full; (2) a guest user
panel where signed-in readers track their roadmap progress, with anonymous readers read-only; (3)
competitive-programming progress tracking on Codeforces, AtCoder, LeetCode, CodeChef, LightOJ, UVa,
SPOJ, CSES, Toph and VJudge.

### What changed and why

| Area | Before (0.1) | Now (0.2) | Where |
|---|---|---|---|
| Blog | Markdown in the database, rendered on the main origin | **HTML bundles** on the content origin, same engine as topics; admin **HTML editor** with templates and live sandboxed preview; zip/CLI upload; scheduling via versions; feeds carry summaries; main-domain `/blog/{slug}` redirects | 01 §3.7, 10, 11 §7, 09 §4.7, ADR-014 |
| Content origin | `kb.eyasir329.dev`, topics only | `read.eyasir329.dev` with `/docs/…` and `/blog/…`, plus `/__rt`, `/__api`, `/__auth` | 03, 10 §4, 08 §6 |
| Faithful serving | Byte-for-byte only | Stored bytes immutable; **one runtime block injected** into entry HTML (identical for all visitors, so still cacheable) | 10 §8.3, ADR-005 |
| Accounts | Admin only; visitors never sign in | **Open guest sign-up** (Google + GitHub); admin still allowlist-only; ban and disposable-domain block | 08, 19, ADR-003 |
| Roadmap progress | Browser-only for everyone | **Signed-in only, server-authoritative, synced across devices**; anonymous controls disabled and nothing saved | 19 §3–4, ADR-016 |
| Content-origin identity | None | **Reader session bridge** (one-time code → HttpOnly session scoped to the reader API) | 19 §2.2, 08 §5.2, ADR-015 |
| Reader panel | — | `/me` dashboard, roadmap progress, CP hub, extension tokens, settings with export/delete | 19 §5, 03 §3.2 |
| CP tracking | Owner only; Codeforces + GitHub synced, others manual | **10 judges for owner and guests**, API-first, scraping behind flags, **NEUPC-compatible extension ingestion**, canonical problem keys, DB queue, **roadmap practice auto-verification** | 20, 12, ADR-017…019 |
| Database | `kb_*` tables, `cp_profiles`, `posts.body_md` | `bundle_*` engine tables, `posts` → versions, per-user `cp_accounts`/`cp_solves`, `cp_sync_jobs`, `user_profiles`, `reading_progress`, sessions | 07, ADR-020 |
| Admin | — | HTML editor, templates, Users (ban/delete), Readers (aggregate analytics), Sync & judges health | 09 |
| Security & privacy | — | Guest RLS matrix, CSRF on the reader API, token scopes, data export/deletion, inactivity policy, `/terms` | 08, 02, 19 §6 |
| Delivery | ≈ 100 dev-days, 7 phases | **≈ 142 dev-days**, 8 phases, 4 new spikes, options A/B/C (B "readers first" recommended) | 16 |
| Risks | R-01…R-15 | + R-16…R-23 (guest data, abuse, runtime conflicts, DB growth, extension upkeep, ToS, blog SEO) | 17 |
| Questions | Q-01…Q-25 | Q-04, 09, 19, 20, 23 changed; **Q-26…Q-36 new** | 21 |

### Research used

The owner's `eyasir329/NEUPC` repository (July 2026) was read to ground the judge plan: its
server-side services per judge, per-platform rate limits, its finding that LeetCode ingestion is
extension-only and that CSES/LightOJ solved lists aren't public, the SPOJ Cloudflare problem, the
VJudge and uHunt endpoints, the CLIST fallback, and the browser extension's `Bearer`-token API
contract with a configurable API URL.

## Revision 0.1 — 2026-09-24

Initial planning set: charter, PRD, NFRs, IA, design system, 3D, architecture, database, security,
admin, Roadmap Docs (from the `3_std_vector` reference bundle), content modules, integrations, API,
DevOps, QA, delivery, risks/ADRs, content inventory, audit checklist.
