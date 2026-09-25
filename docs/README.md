# Planning Documentation — Index

> **Document set version:** 0.5 (draft for owner audit) · **Date:** 2026-09-25 · [CHANGELOG](CHANGELOG.md)
> **Owner / Product Owner:** Eyasir Ahamed · **Prepared as:** business analysis & system design, pre-implementation

This folder is the single source of truth for **what** will be built, **why**, and **how** it will be
built, operated and verified. Nothing has been implemented yet. Every document can be checked by
hand before code exists.

**Where the plan stands (revision 0.5):**
- Blog posts are **full HTML**, rendered exactly as written on the content origin, and authored in
  an admin HTML editor or uploaded.
- Readers can create **guest accounts** (Google/GitHub). **Roadmap progress is saved only for
  signed-in readers**; anonymous readers can read but not track. **Learners get no CP tracking**
  (removed in 0.3).
- The **owner's** competitive-programming record is synced from **10 judges** (Codeforces, AtCoder,
  LeetCode, CodeChef, LightOJ, UVa, SPOJ, CSES, Toph, VJudge) for the public CP Journey page.
- **UI/UX design** is documented in [`ux/`](ux/README.md): wireframes for all 58 screens, flows,
  components and states, interaction/motion/accessibility, and a UX audit with its own sign-off
  (added in 0.4).
- **How it gets built and shipped** is in [`dev/`](dev/README.md): toolchain and the Supabase MCP server
  now configured in this repository, the Supabase workflow, a development and deployment plan for
  every phase, CI/CD, operations and quality gates (added in 0.5).

---

## 1. Reading order

| Step | Read | You will know… |
|--:|---|---|
| 1 | [00 — Project charter](00-project-charter.md) | Vision, goals, scope, constraints |
| 2 | [01 — Product requirements](01-product-requirements.md) | Personas, every FR, key user stories |
| 3 | [02 — Non-functional requirements](02-non-functional-requirements.md) | Performance, accessibility, SEO, security, privacy targets |
| 4 | [03 — Information architecture](03-information-architecture.md) | Hosts, sitemap, routes, navigation, blueprints |
| 5 | [04 — Design system](04-design-system.md) | "Marble & Ink" tokens, type, components, motion |
| 6 | [05 — 3D experience](05-3d-experience.md) | Three.js scenes, budgets, fallbacks |
| 7 | [06 — System architecture](06-system-architecture.md) | Stack, hosts, caching, sequences, repo layout |
| 8 | [07 — Database design](07-database-design.md) | Schema, ERDs, RLS, storage, jobs |
| 9 | [08 — Auth & security](08-auth-and-security.md) | Guest + admin auth, reader session bridge, CSP, threat model |
| 10 | [09 — Admin panel](09-admin-panel.md) | Every admin screen incl. the HTML editor, users, readers, judges |
| 11 | [10 — Content origin, bundle engine & Roadmap Docs](10-roadmap-docs-system.md) | How HTML topics **and posts** are stored, versioned and served |
| 12 | [11 — Content modules](11-content-modules.md) | Home, About, Projects, Experience, CP Journey, **HTML blog**, Contact, Resume |
| 13 | [12 — Integrations & sync](12-integrations-and-sync.md) | Integration catalogue, GitHub, scheduling |
| 14 | [13 — API & data flow](13-api-and-data-flow.md) | Actions, route handlers, reader API, extension API |
| 15 | [14 — DevOps & environments](14-devops-and-environments.md) | Environments, CI/CD, monitoring, backups, costs |
| 16 | [15 — Testing & QA](15-testing-and-qa.md) | Tests, fixtures, UAT, launch checklist |
| 17 | [16 — Delivery plan](16-delivery-plan.md) | Phases, backlog, spikes, estimates, ordering options |
| 18 | [17 — Risks & decisions](17-risks-and-decisions.md) | Risk register and ADRs |
| 19 | [18 — Content inventory](18-content-inventory.md) | CV data mapping, missing content |
| 20 | [19 — Guest accounts, reader panel & progress](19-guest-accounts-and-progress.md) | **New:** sign-in, `/me`, sign-in-gated progress, reader runtime, privacy |
| 21 | [20 — CP tracking (owner, 10 judges)](20-cp-multi-platform-tracking.md) | **New:** judge capability matrix, adapters, daily per-platform runs, the owner's extension |
| 22 | [21 — Audit checklist](21-audit-checklist.md) | **Sign-off sheet and the decisions only you can make** |
| 23 | [ux/ — UI/UX design documentation](ux/README.md) | **New in 0.4:** strategy, flows, wireframes of every page (UX-00…06), components & states (UX-07), interaction, motion & accessibility (UX-08), UX audit & sign-off (UX-09) |
| 24 | [dev/ — Engineering playbook](dev/README.md) | **New in 0.5:** toolchain & Supabase MCP (DEV-01), conventions (DEV-02), Supabase workflow (DEV-03), phase-by-phase build & deploy plans (DEV-04), CI/CD & release (DEV-05), operations (DEV-06), quality gates (DEV-07) |

**30-minute path:** CHANGELOG → 00 → 01 §3.7–3.11 → 19 §1–3 → 20 §2 → 21 §3.

**Visual path (UX):** [ux/README](ux/README.md) → UX-03 WF-10 Home → UX-04 WF-38 Topic → UX-05 WF-51 `/me` →
UX-06 WF-64 HTML editor → UX-09 §1–5.

---

## 2. ID conventions

| Prefix | Meaning | Defined in | Example |
|---|---|---|---|
| `G-nn` | Business goal | 00 | `G-08` Learner engagement |
| `A-nn` | Assumption | 00 | `A-07` Judges keep their endpoints |
| `P-nn` | Persona | 01 | `P-03` CS student / CP learner |
| `FR-<AREA>-nn` | Functional requirement | 01 | `FR-PROG-01` Anonymous is read-only |
| `US-nnn` | User story | 01, 16 | `US-081` Sign in from a topic |
| `NFR-<AREA>-nn` | Non-functional requirement | 02 | `NFR-PERF-13` Runtime size |
| `ADR-nnn` | Architecture decision | 17 | `ADR-015` Reader session bridge |
| `R-nn` | Risk | 17 | `R-05` Judges change or block us |
| `SP-nn` | Spike | 16 | `SP-09` Runtime compatibility |
| `EP-nn` | Epic | 16 | `EP-12` Multi-judge tracking |
| `Q-nn` | Owner question | 21 | `Q-26` Guest sign-in providers |
| `T-<AREA>-nn` | Test | 15 | `T-RT-01` Anonymous gating |
| `WF-nn` | Wireframe (one screen) | ux/UX-02…06 | `WF-38` Topic page with the runtime chip |
| `F-nn` | User flow | ux/UX-01 | `F-03` Learner: read → sign in → track |
| `Un` | UX principle | ux/UX-00 | `U5` Quiet sign-in |
| `Mn` | Motion spec | ux/UX-08 | `M12` Hero 3D idle |
| `UXF-nn` | UX audit finding | ux/UX-09 | `UXF-04` Chip overlap |
| `UXQ-nn` | Open UX question (mirrored as `Q-37…42`) | ux/UX-09 | `UXQ-01` CV link on desktop |
| `DEV-nn` | Engineering playbook document | dev/ | `DEV-04` Phase plans |
| `PG-n` | Phase gate | dev/DEV-07 | `PG-5` Reader accounts |
| `RB-nn` | Operations runbook | dev/DEV-06 | `RB-12` Reader runtime incident |

**MoSCoW:** M Must · S Should · C Could · W Won't (v1). **Status:** Draft → In review → Approved →
Superseded.

---

## 3. Glossary

| Term | Meaning |
|---|---|
| **Main origin** | `eyasir329.dev` (placeholder, `Q-01`): portfolio, listings, sign-in, reader panel, admin |
| **Content origin / reading room** | `read.eyasir329.dev` (placeholder, `Q-04`): serves author HTML (topics under `/docs/…`, posts under `/blog/…`), generated pages, the reader runtime and the reader API. Isolated from main-origin cookies |
| **Bundle** | A folder (often zipped) with `index.html` + assets: a roadmap topic or a blog post |
| **Bundle engine** | The shared pipeline: validation, CAS storage, versions, preview, publish, search, serving |
| **Subject** | What a bundle belongs to: a roadmap node or a post |
| **Version** | Immutable snapshot of a subject's bundle; publishing moves a pointer |
| **Draft (working copy)** | The editable overlay the admin HTML editor autosaves; "Save version" snapshots it |
| **CAS** | Content-addressed storage: one object per SHA-256 |
| **Runtime block / reader runtime** | The one `<script>` block injected into served entry HTML; the runtime gates and syncs progress and shows the account chip |
| **Runtime mode** | `inject` (default), `self` (bundle includes the runtime), `off` |
| **Guest** | Any signed-in user without admin rights |
| **Reader session** | The narrow, HttpOnly session on the content origin, created via the one-time-code **bridge** |
| **Progress keys** | The bundle's own storage keys (e.g. `cpkb-010114-s4`); the server stores the suffix (`s4`) per user and node |
| **Canonical problem key** | `{judge}:{id}`, e.g. `codeforces:704A`, used to dedupe the owner's solves across judges |
| **Judge adapter** | Code that reads one judge (API, community API or public profile page) |
| **Needs extension** | A judge whose per-problem history isn't public; the browser extension provides it |
| **Extension token** | An admin-only `cp:ingest` token the owner gives to their browser extension |
| **Serial** | Topic code in a bundle's kicker, e.g. `01.01.14` |
| **Generated page** | Roadmap index / coming-soon page rendered by the platform |
| **RLS** | Postgres Row Level Security |
| **RSC / Cache Components / Proxy** | Next.js 16 server components, caching model, and `proxy.ts` |
| **R3F / Poster** | React Three Fiber; the still image shown instead of a 3D scene |
| **LCP / INP / CLS** | Core Web Vitals |

---

## 4. Change control

1. While in `Draft`, edit freely; comment inline as `> **Audit (Eyasir):** …`.
2. After sign-off, changes go through a PR that updates the document **and** the relevant ADR, and
   adds a line to the [CHANGELOG](CHANGELOG.md).
3. Code PRs reference the IDs they implement (`Implements FR-PROG-01, US-080`).
