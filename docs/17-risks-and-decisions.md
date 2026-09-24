# 17 — Risks & Architecture Decision Records

> Status: **Draft v0.1** · Related: every document; this is where the "why" is kept.

---

## Part A — Risk register

Likelihood (L) and Impact (I): 1 = low … 3 = high. Score = L × I.

| ID | Risk | L | I | Score | Mitigation | Trigger / signal | Owner |
|---|---|:-:|:-:|:-:|---|---|---|
| R-01 | **Scope is large for a solo developer** (≈ 100 dev-days) | 3 | 2 | 6 | Phased delivery with independent exits; "Early MVP" ordering option (`Q-19`); strict Must/Should/Could | A phase overruns by > 30% | Owner |
| R-02 | **Supabase free project pauses** after 7 days without requests | 2 | 3 | 6 | Daily sync jobs + 10-min uptime ping to `/api/health` (DB query); runbook; upgrade trigger | Uptime alert; sync failures | Dev |
| R-03 | **Copyright exposure** from verbatim book excerpts in bundle `data/` folders | 2 | 3 | 6 | `data/**` private by default; owner confirms before any change (`Q-14`) | Takedown request | Owner |
| R-04 | **3D hurts performance or accessibility** | 2 | 2 | 4 | Capability gate, posters, budgets in CI, reduced-motion, text-first LCP | Lighthouse < budget; fps below target | Dev |
| R-05 | **Unofficial judge APIs break** (AtCoder, LeetCode) | 3 | 1 | 3 | Only Codeforces + GitHub in v1; adapters isolated; manual overrides; NEUPC option | Weekly contract check fails | Dev |
| R-06 | **Bundle format drift** from the generator breaks metadata extraction | 2 | 2 | 4 | Selector fallbacks; optional `kb.json`; golden test on the reference; warnings instead of failures | W12/W14 warnings spike | Dev |
| R-07 | **Malicious or buggy bundle JS** | 1 | 3 | 3 | Isolated content origin, strict CSP, sandboxed preview, one-click rollback | Sentry errors on KB, odd requests | Dev |
| R-08 | **CDN purge doesn't work for route handlers** → stale topics after publish | 2 | 2 | 4 | `SP-02`; fallback: short `s-maxage` (5 min) | T-KB-20 fails | Dev |
| R-09 | **Storage quota** exceeded as roadmaps grow | 2 | 2 | 4 | CAS dedupe; `data/` and `assets/src/` exclusion option; retention; upgrade trigger at 70% | Dashboard quota widget | Owner |
| R-10 | **Admin lockout** (lost Google access, hook misconfiguration) | 1 | 3 | 3 | Break-glass SQL runbook; second owner email optional (`Q-02`); SP-07 test | Cannot sign in | Owner |
| R-11 | **Content bottleneck** (screenshots, write-ups, outline not ready) | 3 | 2 | 6 | Content timeline in [16 §8](16-delivery-plan.md); sections hide when empty; seed drafts from the CV | Phase exit blocked on content | Owner |
| R-12 | **Platform/API churn** (Next.js, Supabase key changes: legacy `anon`/`service_role` keys being retired in favour of `sb_publishable_`/`sb_secret_`) | 2 | 2 | 4 | Use new-format keys from day 1; pin versions; Renovate; ADRs | Deprecation notices | Dev |
| R-13 | **Vercel Hobby limits** (non-commercial terms, function duration, image optimisation quota) | 2 | 2 | 4 | Stepped KB imports; `next/image` only for main-site media; upgrade trigger | Usage > 70% | Owner |
| R-14 | **Design feels generic** despite the brief | 2 | 2 | 4 | Distinct concept (Marble & Ink); art-direction spike + owner sign-off before build; signature components (wall label, colonnade) | Owner review | Owner + dev |
| R-15 | **Privacy of teammates/contacts** named on the CP page or in photos | 2 | 1 | 2 | Ask teammates' consent; names optional per contest (`Q-18`) | — | Owner |

## Part B — Architecture Decision Records

Format: **Context → Decision → Consequences → Alternatives considered.** Status is `Proposed` until
the owner approves this document.

### ADR-001 — Next.js 16 App Router with Cache Components
- **Context:** Mandated Next.js; the content-heavy site needs near-zero client JS and instant
  updates after admin edits.
- **Decision:** App Router, React Server Components, Server Actions, `cacheComponents: true` with
  `"use cache"` + `cacheTag`/`updateTag`/`revalidateTag`; `proxy.ts` for host routing.
- **Consequences:** Explicit caching (nothing cached by accident); a tag catalogue to maintain; the
  team must follow Next 16 conventions (`proxy.ts` runs on Node.js).
- **Alternatives:** Pages Router (legacy); Astro for content + separate admin (two stacks, against
  the mandate).

### ADR-002 — Supabase with supabase-js, SQL migrations, no ORM
- **Context:** Supabase is mandated; security relies on RLS.
- **Decision:** `@supabase/supabase-js` + `@supabase/ssr` with generated TypeScript types; schema in
  plain SQL migrations (Supabase CLI); pgTAP for policy tests.
- **Consequences:** RLS stays the single permission truth; SQL skills required; no ORM migrations to
  reconcile.
- **Alternatives:** Drizzle/Prisma on top of Supabase (a second schema source, and the ORM's direct
  connection bypasses RLS unless handled carefully).

### ADR-003 — Google-only admin sign-in, gated before account creation
- **Context:** Only the owner (and maybe one editor) should ever have an account.
- **Decision:** Supabase Google provider; **Before User Created** hook rejects non-allowlisted
  emails; **Custom Access Token** hook adds `app_role`; RLS checks the `admin_users` table (not only
  the claim) for instant revocation; email/password disabled.
- **Consequences:** No stray user rows; revocation is immediate; hooks are part of migrations.
- **Alternatives:** Allow sign-ups and filter afterwards (leaves accounts behind); magic links (more
  moving parts); Auth.js (a second auth system beside Supabase).

### ADR-004 — Roadmap bundles served from an isolated content origin via Next.js
- **Context:** Bundles contain inline JavaScript and must be served with correct MIME types and a
  folder-faithful URL tree. Supabase Storage serves HTML as `text/plain` on its default domain.
- **Decision:** A dedicated host (`kb.…`) routed by `proxy.ts` to a route handler that streams
  files from a private bucket with explicit headers and a strict CSP. No auth cookies exist on that
  host.
- **Consequences:** Bundle JS can't reach the admin session; one deployment serves both hosts; needs
  a subdomain (or a `*.vercel.app` alias) and CDN caching to keep Supabase egress low.
- **Alternatives:** Same-origin path (`/kb/…`), rejected: bundle JS could read the session. Iframe
  inside main-site pages, rejected: poor SEO and deep-linking, no extra isolation. Supabase public
  URLs, rejected: `text/plain` HTML. Separate static host (e.g. Cloudflare Pages), rejected for v1: a
  second deploy pipeline, no DB-driven generated pages/versioning.

### ADR-005 — Byte-for-byte serving; generate only what's missing
- **Context:** The bundles are carefully produced (measured numbers, recorded demos); any rewrite
  risks breaking them.
- **Decision:** Never modify bundle files. Canonicals via HTTP headers; missing index/coming-soon
  pages generated in the roadmap's extracted theme.
- **Consequences:** No injected analytics or nav in topic pages (by design); cross-page features
  (progress on index pages) read the bundles' own `localStorage` keys.
- **Alternatives:** Inject a shared header/footer (breaks fidelity); re-render bundles into our own
  template (loses interactivity).

### ADR-006 — Content-addressed storage for bundle files
- **Context:** Topics are re-uploaded often with small changes; versions must be immutable and
  rollbacks instant.
- **Decision:** Store each file once under its SHA-256; versions are manifests (path → hash);
  publish = pointer swap; GC removes unreferenced objects after 30 days.
- **Consequences:** Cheap versions, instant rollback, ETags for free; needs GC and a manifest cache.
- **Alternatives:** Copy full folders per version (storage × versions); overwrite in place (no
  rollback, cache inconsistency).

### ADR-007 — Blog in Markdown + directives (not MDX, not rich-text JSON)
- **Context:** Technical posts with code, math and a few custom components; an admin-only author;
  safety and portability matter.
- **Decision:** Markdown stored in the DB, rendered on the server with unified/remark/rehype, Shiki,
  KaTeX, and `remark-directive` for components; raw HTML disabled; CodeMirror editor with live
  server-rendered preview.
- **Consequences:** Portable content (can move to files/Git later); no code execution from content;
  new components need a directive handler.
- **Alternatives:** MDX from the DB (executes JS at render; heavier); TipTap/ProseMirror JSON (less
  portable, harder for code-heavy writing).

### ADR-008 — React Three Fiber with one shared canvas, as progressive enhancement
- **Context:** "Proper 3D" is required, and so are fast, accessible pages.
- **Decision:** three.js via R3F + drei; one persistent canvas with `View`s; lazy-loaded after idle;
  capability gate (detect-gpu, reduced motion, user toggle); posters; `frameloop="demand"`.
- **Consequences:** One WebGL context; content never waits for 3D; posters must be regenerated when
  scenes change.
- **Alternatives:** A canvas per section (context churn, memory); vanilla three.js (more imperative
  glue in React); Spline embeds (heavy runtime, less control, third-party).

### ADR-009 — Postgres full-text search, no external search service
- **Context:** A few hundred documents; privacy; zero budget.
- **Decision:** `tsvector` + GIN + `websearch_to_tsquery` + `pg_trgm`; one `search_all` RPC under
  RLS.
- **Consequences:** No sync to a third party; good-enough ranking; English stemming only.
- **Alternatives:** Algolia/Meilisearch (another service and secret); client-side index such as
  Pagefind (doesn't cover DB-driven content well; KB is on another origin).

### ADR-010 — pg_cron + pg_net as the scheduler
- **Context:** Vercel Hobby cron runs at most once per day; scheduled posts need ~5-minute
  granularity.
- **Decision:** pg_cron jobs call authenticated route handlers via pg_net; Vercel Cron kept as a
  daily backup trigger.
- **Consequences:** Schedules live in migrations; secrets in Supabase Vault; jobs also keep the free
  project awake.
- **Alternatives:** Vercel Pro cron; GitHub Actions schedules (delayed, less reliable timing);
  external cron services.

### ADR-011 — Tailwind CSS v4 tokens + shadcn/ui for admin, bespoke public components
- **Context:** A distinctive public design, and a productive, accessible admin.
- **Decision:** CSS custom-property tokens exposed via Tailwind v4 `@theme`; shadcn/ui (Radix) as
  owned source for the admin; hand-built public components following Marble & Ink.
- **Consequences:** A consistent token system across both; the public site doesn't look like a
  template.
- **Alternatives:** A full component library (MUI/Chakra) with a generic look and heavier runtime;
  CSS Modules only (slower iteration).

### ADR-012 — Two Supabase projects (staging, production) instead of branching
- **Context:** Previews need a safe database; the free tier gives two projects; branching is paid.
- **Decision:** Staging project for local-linked work and previews; production for `main`.
  Migrations are applied to staging first.
- **Consequences:** Manual parity (secrets, hooks, Vault) per project, kept in check by migrations
  and a checklist.
- **Alternatives:** Supabase Branching (paid); previews against production (unsafe).

### ADR-013 — Server Actions for admin mutations; route handlers only for external callers
- **Context:** Most writes come from our own forms; some callers are cron, webhooks and the CLI.
- **Decision:** Server Actions for UI mutations; route handlers for OAuth, cron, webhooks, CLI,
  feeds, OG, KB serving and health.
- **Consequences:** Less API surface; typed end-to-end; the CLI needs token-auth routes that reuse
  the same services.
- **Alternatives:** A full REST/tRPC API for everything (more surface to secure and version).

## Part C — Decision log (to be filled during build)

| Date | ID | Decision | By |
|---|---|---|---|
| 2026-09-24 | ADR-001…013 | Proposed in the planning set | Planning |
| | | | |
