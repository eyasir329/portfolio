# DEV-02 — Repository, Conventions & Workflow

> Status: **Draft v0.5** · Related: [06 §4, §7](../06-system-architecture.md), [14 §3](../14-devops-and-environments.md), [16 §5–6](../16-delivery-plan.md), [DEV-07](dev-07-quality-gates.md)

---

## 1. Repository layout (P1 target)

The application tree follows [06 §7](../06-system-architecture.md). Root-level files added by P1:

```text
/
├─ .github/
│  ├─ workflows/{ci,e2e,release,db-backup,contract-check}.yml
│  ├─ pull_request_template.md   ISSUE_TEMPLATE/{story,bug,spike}.yml   CODEOWNERS
├─ .claude/{settings.json, skills/}      # permissions for agents (DEV-01 §6.2), Supabase skills
├─ .mcp.json                             # Supabase MCP server (staging, project-scoped)
├─ .vscode/{settings,extensions}.json
├─ app/ components/ lib/ runtime/ proxy.ts   # see 06 §7
├─ supabase/{config.toml, migrations/, seed.sql, tests/, templates/}
├─ scripts/ tests/ public/ docs/
├─ CLAUDE.md  CONTRIBUTING.md  README.md
├─ .env.example  .nvmrc  .editorconfig  .gitignore
├─ eslint.config.mjs  prettier.config.mjs  tsconfig.json
├─ next.config.ts  vitest.config.ts  playwright.config.ts  lighthouserc.json
├─ package.json  pnpm-lock.yaml  renovate.json  skills-lock.json
```

## 2. Module boundaries

| Area | May import | Must not import | Enforced by |
|---|---|---|---|
| `app/(site)`, `app/(me)`, `app/(admin)` | `components/*`, `lib/data`, `lib/services` (via actions), `lib/auth` | `lib/supabase/admin` (secret-key client) | ESLint `no-restricted-imports` |
| `app/_content` (content origin) | `lib/bundles`, `lib/reader` | Anything reading main-origin cookies or `@supabase/ssr` session helpers | ESLint rule + test `T-SEC` |
| `lib/data`, `lib/services`, `lib/bundles`, `lib/reader`, `lib/cp` | `lib/supabase`, `lib/validation`, `lib/cache` | `components/*`, React | `import "server-only"` at the top of each entry |
| `components/*` | `lib/validation`, UI utilities | `lib/services`, `lib/supabase/admin` | ESLint |
| `runtime/` (reader runtime) | Nothing from the app; only its own files | React, Next.js, any npm dependency | Separate `tsconfig` + esbuild entry; size check ≤ 8 KB gzip |
| `supabase/` | — | — | SQL only |

## 3. Coding standards

| Topic | Standard |
|---|---|
| TypeScript | `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`; no `any` (use `unknown` + Zod); no non-null `!` outside tests |
| Validation | Zod at every boundary: Server Action input, route-handler body, env, bundle manifests, judge responses |
| Server Actions | Return a discriminated result `{ ok: true, data } \| { ok: false, error: { code, message, fieldErrors? } }`; never throw to the client for expected errors; call `requireRole()` / `requireUser()` first; write `audit_log` for admin mutations |
| Components | Server Components by default; `"use client"` only for islands (forms, editor, 3D, search); props typed; no data fetching in client components except via actions |
| Styling | Tailwind utilities on design tokens ([04](../04-design-system.md)); no hard-coded colours; `cn()` helper; admin uses shadcn/ui sources committed in `components/ui` |
| Accessibility | `eslint-plugin-jsx-a11y`; every screen checked against its UX-08 §5 row |
| Dates and time | Store UTC; format with `Intl` in `Asia/Dhaka` for owner pages and viewer time zone for `/me` |
| Errors and logs | `lib/log.ts` structured logger; redact emails, tokens and IPs; Sentry for unexpected errors only |
| SQL | Lower-case `snake_case`; explicit schema names; `text` over `varchar(n)`; `timestamptz`; `bigint generated always as identity` or `uuid` keys per [07](../07-database-design.md); every FK indexed; RLS on every table |
| Naming | Files `kebab-case.ts`; React components `PascalCase`; server actions `verbNoun` (`publishVersion`); SQL functions `verb_noun`; flags `area.feature` |
| Comments | Explain *why*; link IDs (`// FR-PROG-01, ADR-016`) where a rule comes from the plan |

## 4. Branching and commits

| Practice | Rule |
|---|---|
| Model | Trunk-based. `main` is always deployable (DEV-05). Branches live ≤ 3 days |
| Branch names | `<type>/<id>-<slug>`, e.g. `feat/US-203-reader-runtime`, `db/US-150-bundle-schema`, `spike/SP-12-supabase-mcp` |
| Commits | Conventional Commits: `feat`, `fix`, `db`, `test`, `docs`, `chore`, `ci`, `perf`, `refactor`; scope = area (`feat(reader): …`) |
| PR size | Aim for < 400 changed lines excluding generated files; schema PRs separate from UI PRs when possible (expand first) |
| Unfinished work | Merged behind a flag (E5), never parked on a long-lived branch |
| History | Squash-merge; the PR title becomes the commit message |

## 5. Pull requests and reviews

**PR template** (`.github/pull_request_template.md`):

| Section | Content |
|---|---|
| Summary | What and why, in 2–5 lines |
| Linked IDs | `US-…`, `FR-…`, `WF-…`, `ADR-…`, `T-…` |
| Screens | Screenshots or a short video in light and dark themes, D and M widths, for UI changes |
| Database | Migration files, expand/contract step, RLS policies added, pgTAP tests, advisor output |
| Flags | New flags and their default in each environment |
| Test evidence | Commands run and results; new tests listed |
| Deploy notes | Anything the release workflow or the owner must do (secrets, OAuth URLs, DNS) |
| Checklist | DEV-07 §1 |

**Review:** the author self-reviews the diff first; larger PRs also get an automated Claude review;
the owner approves and merges. Required checks: every CI job in DEV-05 §3.

## 6. Dependencies

| Rule | Detail |
|---|---|
| Exact versions | `save-exact=true`; `pnpm-lock.yaml` committed; CI installs with `--frozen-lockfile` |
| New dependency | PR notes size (bundlephobia), maintenance, licence, and why the platform or an existing dependency doesn't cover it |
| Updates | Renovate weekly: grouped (Next/React, Supabase, testing, lint); patch updates of dev dependencies auto-merge when CI is green; majors get their own PR and a changelog read |
| Supply chain | `pnpm audit --prod` in CI; a minimum release age for new versions (pnpm `minimumReleaseAge`, e.g. 3 days); only allow-listed packages may run install scripts (`onlyBuiltDependencies`) |
| Client bundle | Heavy libraries (three.js, CodeMirror) only in lazy client islands; route budgets in CI (`NFR-PERF-06`) |

## 7. Issues and planning board

| Item | Convention |
|---|---|
| Issues | One per story (`US-nnn`), spike (`SP-nn`) and bug; created from the backlog after sign-off ([21 §5](../21-audit-checklist.md)) |
| Labels | `type:*` (story, bug, spike, chore), `epic:EP-nn`, `phase:Pn`, `pri:M/S/C`, `area:*` (site, me, admin, content-origin, db, cp, 3d, ci) |
| Milestones | One per phase (P1…P8) with the phase gate checklist (DEV-07 §3) in the description |
| Board | Backlog → Ready (meets Definition of Ready) → In progress → In review → Done (deployed to staging) → Released (in production) |

## 8. Docs as code

| When you change… | Also update… |
|---|---|
| A table, policy, function or cron job | [07](../07-database-design.md) and the migration's header comment |
| A route, host rule or cache tag | [03](../03-information-architecture.md) / [06](../06-system-architecture.md) |
| A screen's structure, primary action or states | Its `WF-nn` in [`ux/`](../ux/README.md) (or note the deviation in the PR) |
| A decision with trade-offs | A new or revised ADR in [17](../17-risks-and-decisions.md) |
| Anything user-visible at a milestone | `CHANGELOG.md` (generated from Conventional Commits) |
| The workflow itself | This folder |

## 9. Weekly rhythm (solo developer + owner)

| When | What |
|---|---|
| Monday | Pick the week's stories from the phase milestone; check Definition of Ready; note owner inputs needed |
| Daily | Small PRs; staging updated on every merge; failing checks fixed before new work |
| Friday | Demo on **staging** (not a PR preview) against the phase's UAT scripts; decide flag flips; update the board |
| Phase end | Phase gate review (DEV-07 §3), production release, short retro recorded in the milestone |
