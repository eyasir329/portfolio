# Eyasir Ahamed — Portfolio, Blog, Roadmap Docs & Reader Progress

> **Status: Phase 1–2 in progress (revision 0.6).** The public portfolio is implemented: Home with a
> WebGL "Plaster Graph", Work and case studies, Experience, CP Journey (live Codeforces data + 3D
> Colonnade), About, Writing, Contact (Supabase-backed with an email fallback) and a printable CV.
> The plan it implements lives in [`docs/`](docs/README.md). What changed: [`docs/CHANGELOG.md`](docs/CHANGELOG.md).

The personal website of **Eyasir Ahamed**: junior software engineer, Computer Science & Engineering
graduate (Netrokona University) and competitive programmer (ICPC 2025 Asia Dhaka Regionalist,
Mymensingh Divisional Champion).

## Run it

```bash
nvm use            # Node 22+
pnpm install
cp .env.example .env.local   # optional: Supabase keys enable the contact inbox
pnpm dev           # http://localhost:3000
```

| Command | Does |
|---|---|
| `pnpm check` | ESLint + TypeScript + Vitest unit tests |
| `pnpm e2e` | Builds, starts on :3200 and runs Playwright + axe on desktop and mobile |
| `pnpm exec supabase db start && pnpm exec supabase db reset && pnpm exec supabase test db` | Local Postgres, migrations and pgTAP RLS tests (Docker) |
| `pnpm build` / `pnpm start` | Production build and server |

Stack in use: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4 ·
Three.js via React Three Fiber · Supabase · Zod · Vitest · Playwright + axe · GitHub Actions
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

### Where things are

| Path | Contents |
|---|---|
| `app/` | Routes: `/`, `/projects`, `/projects/[slug]`, `/experience`, `/cp`, `/about`, `/writing`, `/contact`, `/resume`, OG image, sitemap, robots |
| `components/` | Shell (header, footer, theme toggle), wall labels and plates, charts, 3D scenes (`hero/`, `cp/`) |
| `content/` | Typed, Zod-validated content from the CV (`profile`, `projects`, `record`) |
| `lib/` | Env validation, Codeforces client with honest fallback, graph geometry, Supabase admin client, contact schema |
| `supabase/` | CLI config, migrations (RLS on every table), pgTAP tests |
| `tests/` | Unit tests, Playwright E2E, recorded fixtures |

## What will be built

| Area | Summary |
|---|---|
| **Portfolio** | Projects, experience, education, skills and certifications, all editable from the admin panel |
| **CP Journey** | The owner's record on **10 judges** (Codeforces, AtCoder, LeetCode, CodeChef, LightOJ, UVa, SPOJ, CSES, Toph, VJudge), ICPC/IUPC history, and a 3D "Colonnade" of monthly solves |
| **Blog** | Posts written in **full HTML** (in an admin HTML editor or uploaded), rendered exactly as written, with versions, scheduling, tags, series and feeds |
| **Roadmap Docs** | Public learning roadmaps; each topic is a self-contained HTML page (same format as the `3_std_vector` reference bundle), served faithfully on an isolated content origin |
| **Reader accounts** | Sign in with Google or GitHub to **save roadmap progress** across devices (anonymous readers can read but not track). No CP tracking for learners |
| **Admin panel** | Allowlisted admins only: CRUD for all content, HTML editor and templates, bundle importer + CLI, users and reader analytics, judge sync health, audit log |

## Planned stack

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS v4 · Three.js via React Three Fiber ·
Supabase (Postgres + RLS, Auth with Google/GitHub, Storage, pg_cron) · Vercel

## Planning documents

Start with **[`docs/README.md`](docs/README.md)** (reading order, ID conventions, glossary).

| # | Document | # | Document |
|--:|---|--:|---|
| 00 | [Project charter](docs/00-project-charter.md) | 11 | [Content modules (incl. HTML blog)](docs/11-content-modules.md) |
| 01 | [Product requirements](docs/01-product-requirements.md) | 12 | [Integrations & sync](docs/12-integrations-and-sync.md) |
| 02 | [Non-functional requirements](docs/02-non-functional-requirements.md) | 13 | [API & data flow](docs/13-api-and-data-flow.md) |
| 03 | [Information architecture](docs/03-information-architecture.md) | 14 | [DevOps & environments](docs/14-devops-and-environments.md) |
| 04 | [Design system](docs/04-design-system.md) | 15 | [Testing & QA](docs/15-testing-and-qa.md) |
| 05 | [3D experience](docs/05-3d-experience.md) | 16 | [Delivery plan](docs/16-delivery-plan.md) |
| 06 | [System architecture](docs/06-system-architecture.md) | 17 | [Risks & decisions (ADRs)](docs/17-risks-and-decisions.md) |
| 07 | [Database design](docs/07-database-design.md) | 18 | [Content inventory](docs/18-content-inventory.md) |
| 08 | [Auth & security](docs/08-auth-and-security.md) | 19 | [Guest accounts, reader panel & progress](docs/19-guest-accounts-and-progress.md) |
| 09 | [Admin panel](docs/09-admin-panel.md) | 20 | [CP tracking (owner, 10 judges)](docs/20-cp-multi-platform-tracking.md) |
| 10 | [Content origin, bundle engine & Roadmap Docs](docs/10-roadmap-docs-system.md) | 21 | [Audit checklist & open questions](docs/21-audit-checklist.md) |

### UI/UX design documentation

**[`docs/ux/`](docs/ux/README.md)** holds low-fidelity wireframes for all 58 screens (public site, blog, docs and
reading room, reader accounts, admin panel), user flows and journey maps, the component and state
catalogue, interaction/motion/accessibility specs (WCAG 2.2 AA) and an expert UX audit with its own
sign-off sheet.

| # | Document | # | Document |
|---|---|---|---|
| UX-00 | [Strategy, research & methods](docs/ux/ux-00-strategy-and-methods.md) | UX-05 | [Wireframes: reader accounts](docs/ux/ux-05-wireframes-reader.md) |
| UX-01 | [User flows & journeys](docs/ux/ux-01-user-flows.md) | UX-06 | [Wireframes: admin panel](docs/ux/ux-06-wireframes-admin.md) |
| UX-02 | [Layout, grid & global shell](docs/ux/ux-02-layout-and-shell.md) | UX-07 | [Components & states](docs/ux/ux-07-components-and-states.md) |
| UX-03 | [Wireframes: public portfolio](docs/ux/ux-03-wireframes-public.md) | UX-08 | [Interaction, motion & accessibility](docs/ux/ux-08-interaction-motion-a11y.md) |
| UX-04 | [Wireframes: blog, docs & reading room](docs/ux/ux-04-wireframes-blog-docs.md) | UX-09 | [UX audit & sign-off](docs/ux/ux-09-ux-audit.md) |

### Engineering playbook

**[`docs/dev/`](docs/dev/README.md)** explains how every phase is developed, tested, deployed and operated:

| # | Document | # | Document |
|---|---|---|---|
| DEV-01 | [Toolchain, workspace & AI tooling](docs/dev/dev-01-toolchain-and-ai-tooling.md) | DEV-05 | [Environments, CI/CD & release](docs/dev/dev-05-cicd-and-release.md) |
| DEV-02 | [Repository, conventions & workflow](docs/dev/dev-02-repo-conventions-and-workflow.md) | DEV-06 | [Operations handbook](docs/dev/dev-06-operations.md) |
| DEV-03 | [Supabase workflow (CLI + MCP)](docs/dev/dev-03-supabase-workflow.md) | DEV-07 | [Quality gates & checklists](docs/dev/dev-07-quality-gates.md) |
| DEV-04 | [Phase-by-phase development & deployment plan](docs/dev/dev-04-phase-plans.md) | | |

### Developer tooling already configured

| File | Purpose |
|---|---|
| [`.mcp.json`](.mcp.json) | Supabase MCP server for Claude Code, scoped to the staging project. Approve and authenticate it with `claude` → `/mcp` → *supabase* → *Authenticate* ([DEV-01 §4](docs/dev/dev-01-toolchain-and-ai-tooling.md)) |
| [`.claude/skills/`](.claude/skills/), [`skills-lock.json`](skills-lock.json) | Supabase agent skills (`supabase`, `supabase-postgres-best-practices`) installed with `npx skills add supabase/agent-skills` |
