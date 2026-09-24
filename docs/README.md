# Planning Documentation — Index

> **Document set version:** 0.1 (draft for owner audit) · **Date:** 2026-09-24
> **Owner / Product Owner:** Eyasir Ahamed · **Prepared as:** business analysis & system design, pre-implementation

This folder is the single source of truth for **what** will be built, **why**, and **how** it will be
built, operated and verified. Nothing in this repository has been implemented yet. Every document is
written so it can be checked by hand, before any code exists.

---

## 1. Reading order

| Step | Read | You will know… |
|--:|---|---|
| 1 | [00 — Project charter](00-project-charter.md) | Why the site exists, goals and KPIs, scope in/out, constraints |
| 2 | [01 — Product requirements (PRD)](01-product-requirements.md) | Personas, every functional requirement (FR-*), key user stories with acceptance criteria |
| 3 | [02 — Non-functional requirements](02-non-functional-requirements.md) | Performance budgets, accessibility, SEO, privacy, reliability targets |
| 4 | [03 — Information architecture](03-information-architecture.md) | Sitemap, every route on every host, navigation, page blueprints |
| 5 | [04 — Design system](04-design-system.md) | The "Marble & Ink" classical-minimal language: tokens, type, grid, components, motion |
| 6 | [05 — 3D experience](05-3d-experience.md) | Each Three.js scene, art direction, budgets, fallbacks |
| 7 | [06 — System architecture](06-system-architecture.md) | Stack, hosts, rendering/caching, sequence diagrams, folder layout |
| 8 | [07 — Database design](07-database-design.md) | Supabase schema, ERD, RLS policies, storage buckets, functions |
| 9 | [08 — Auth & security](08-auth-and-security.md) | Google login, admin allowlist, roles, threat model, CSP |
| 10 | [09 — Admin panel](09-admin-panel.md) | Every admin screen, workflow and permission |
| 11 | [10 — Roadmap Docs system](10-roadmap-docs-system.md) | How HTML topic bundles (like `3_std_vector`) are imported, versioned and served |
| 12 | [11 — Content modules](11-content-modules.md) | Home, About, Projects, Experience, CP Journey, Blog, Contact, Resume |
| 13 | [12 — Integrations & sync](12-integrations-and-sync.md) | GitHub, Codeforces and other judges; scheduling; failure policy |
| 14 | [13 — API & data flow](13-api-and-data-flow.md) | Server actions, route handlers, cache tags, validation and error contracts |
| 15 | [14 — DevOps & environments](14-devops-and-environments.md) | Environments, CI/CD, migrations, secrets, monitoring, backups, costs |
| 16 | [15 — Testing & QA](15-testing-and-qa.md) | Test strategy, fixtures, UAT scripts, release checklists |
| 17 | [16 — Delivery plan](16-delivery-plan.md) | Phases, epics, backlog, spikes, estimates, Definition of Done |
| 18 | [17 — Risks & decisions](17-risks-and-decisions.md) | Risk register and Architecture Decision Records (ADRs) |
| 19 | [18 — Content inventory](18-content-inventory.md) | What the CV already gives us, what is missing, seed-data mapping |
| 20 | [19 — Audit checklist](19-audit-checklist.md) | **Sign-off sheet and the decisions only you can make** |

**If you only have 30 minutes:** read 00, skim 01 §4, read 10 §1–3, then answer the questions in 19.

---

## 2. ID conventions (for traceability)

Every requirement, decision and risk has a stable ID, so an audit comment can point at exactly one
line.

| Prefix | Meaning | Defined in | Example |
|---|---|---|---|
| `G-nn` | Business goal | 00 | `G-03` Knowledge sharing |
| `A-nn` | Assumption | 00 | `A-04` Solo maintainer |
| `P-nn` | Persona | 01 | `P-03` Learner |
| `FR-<AREA>-nn` | Functional requirement | 01 | `FR-DOCS-03` Serve bundles unmodified |
| `US-nnn` | User story with acceptance criteria | 01, 16 | `US-041` Upload a topic bundle |
| `NFR-<AREA>-nn` | Non-functional requirement | 02 | `NFR-PERF-01` LCP budget |
| `ADR-nnn` | Architecture decision record | 17 | `ADR-004` Isolated content origin |
| `R-nn` | Risk | 17 | `R-02` Free-tier project pausing |
| `SP-nn` | Technical spike (time-boxed investigation) | 16 | `SP-02` CDN cache-tag purge for KB |
| `EP-nn` | Epic | 16 | `EP-06` Roadmap Docs |
| `Q-nn` | Open question for the owner | 19 | `Q-01` Domain name |
| `T-<AREA>-nn` | Test case / check | 15 | `T-KB-07` Zip-slip rejected |

**Priority (MoSCoW):** **M** = Must (launch blocker) · **S** = Should (launch if possible) ·
**C** = Could (post-launch candidate) · **W** = Won't (explicitly out of scope for v1).

**Document status:** `Draft` → `In review` → `Approved` → `Superseded`. All documents are `Draft`
until signed off in 19.

---

## 3. Glossary

| Term | Meaning in this project |
|---|---|
| **Portfolio site / main origin** | The Next.js website at the primary domain (placeholder `eyasir329.dev`, see `Q-01`) |
| **Roadmap Docs / KB** | The public documentation section: learning roadmaps made of phases → modules → topics |
| **Roadmap** | One knowledge base, e.g. *CP Knowledge Base* (`cp`). Has its own tree, branding and settings |
| **Node** | Any item in a roadmap tree: `phase`, `module` or `topic` |
| **Topic bundle** | A folder (usually zipped) containing `index.html` plus its `assets/`, `data/`, scripts, figures. Example: `3_std_vector` |
| **Content origin (KB host)** | A separate hostname (placeholder `kb.eyasir329.dev`) that serves bundles byte-for-byte, isolated from the admin session |
| **Version** | An immutable snapshot of a node's bundle. Publishing moves a pointer; rollback moves it back |
| **CAS** | Content-addressed storage: each file stored once under its SHA-256 hash, so versions share unchanged files |
| **Serial** | The topic code shown in a bundle's kicker, e.g. `01.01.14` |
| **Generated page** | An index / "coming soon" page the platform renders when a bundle doesn't provide one |
| **Admin** | A signed-in, allowlisted user with role `owner` or `editor` |
| **Allowlist** | The `admin_users` table. Only these Google emails can create an account |
| **RLS** | Postgres Row Level Security, the database-level permission layer Supabase relies on |
| **RSC** | React Server Components (render on the server, ship no JS for static parts) |
| **Cache Components** | Next.js 16 caching model: `"use cache"`, `cacheTag`, `cacheLife`, `updateTag`/`revalidateTag` |
| **Proxy** | Next.js 16's `proxy.ts` (the renamed middleware), which runs before routing on the Node.js runtime |
| **R3F** | React Three Fiber, the React renderer for Three.js; **drei** is its helper library |
| **Poster** | A pre-rendered still image of a 3D scene, shown when 3D is off or still loading |
| **Sync** | A scheduled job that pulls stats from GitHub / Codeforces / other judges into Supabase |
| **LCP / INP / CLS** | Core Web Vitals: largest contentful paint, interaction to next paint, cumulative layout shift |

---

## 4. Change control

1. While in `Draft`, edit the documents freely. Comment inline using `> **Audit (Eyasir):** …` blocks.
2. After sign-off, any change to an approved requirement or decision is made in a pull request that
   updates the document **and** adds or updates the relevant `ADR-*` in 17.
3. Code pull requests must reference the IDs they implement (`Implements FR-DOCS-03, US-041`).
