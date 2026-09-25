# 17 — Risks & Architecture Decision Records

> Status: **Draft v0.3** · Related: every document; this is where the "why" is kept.
>
> **Revision 0.2:** risks R-16…R-23 added; ADR-003, 004, 005 revised; ADR-007 narrowed (superseded
> for the blog by ADR-014); ADR-014…020 added.
>
> **Revision 0.3:** learner CP tracking removed; ADR-017/018 apply to the owner's accounts only;
> ADR-019 revised (no queue); R-13, R-19, R-21 downgraded.

---

## Part A — Risk register

L = likelihood, I = impact (1–3). Score = L × I.

| ID | Risk | L | I | Score | Mitigation | Owner |
|---|---|:-:|:-:|:-:|---|---|
| R-01 | **Scope is large for one developer** (≈ 135 dev-days) | 3 | 3 | 9 | Phased releases; option B "readers first" (v1 at ≈ 21 weeks, then owner CP tracking and 3D as v1.1); strict MoSCoW | Owner |
| R-02 | Supabase free project pauses | 1 | 3 | 3 | Every-minute worker + uptime pings; runbook | Dev |
| R-03 | Copyright exposure from `data/` excerpts | 2 | 3 | 6 | Private by default (`Q-14`) | Owner |
| R-04 | 3D hurts performance/accessibility | 2 | 2 | 4 | Gate, posters, budgets | Dev |
| R-05 | **Judge endpoints change or block us** (unofficial APIs, scraping, Cloudflare) | 3 | 2 | 6 | API-first; NEUPC-proven endpoints; per-platform kill switches; "needs extension" state; weekly contract checks; SP-08 | Dev |
| R-06 | Bundle format drift breaks extraction or runtime controls | 2 | 2 | 4 | Fallbacks, `kb.json`, per-roadmap control selectors, W18 warning, golden tests | Dev |
| R-07 | Malicious/buggy author JS (topics or posts) | 1 | 3 | 3 | Isolated origin; narrow reader session; CSP; sandboxed preview; rollback | Dev |
| R-08 | CDN purge doesn't work for route handlers | 2 | 2 | 4 | SP-02; 5-min fallback | Dev |
| R-09 | Storage quota | 2 | 2 | 4 | CAS; retention; trigger at 70% | Owner |
| R-10 | Admin lockout | 1 | 3 | 3 | Break-glass runbook; backup owner email | Owner |
| R-11 | Content bottleneck | 3 | 2 | 6 | Content timeline; sections hide when empty | Owner |
| R-12 | Platform/API churn (Next.js, Supabase keys) | 2 | 2 | 4 | New-format keys; pinning; Renovate | Dev |
| R-13 | Vercel Hobby limits (invocations/CPU, mostly from the reader API) | 1 | 2 | 2 | Batched runtime writes; CP sync is only ~10 runs/day; upgrade trigger | Owner |
| R-14 | Design feels generic | 2 | 2 | 4 | Art-direction spike + sign-off | Owner |
| R-15 | Teammates' privacy on contest entries | 2 | 1 | 2 | Consent; names optional | Owner |
| R-16 | **Guest personal data**: a leak or misuse would harm readers and trust | 1 | 3 | 3 | Data minimisation; RLS own-rows with pgTAP; aggregate-only admin views; export/delete; privacy review (US-185); incident runbook | Owner + dev |
| R-17 | **Sign-up abuse / bot accounts** consume quotas | 2 | 1 | 2 | OAuth-only; disposable-domain block; bans; per-user limits | Dev |
| R-18 | **Runtime reconciliation conflicts with a bundle's own scripts** (e.g. a future generator writes progress differently) | 2 | 2 | 4 | SP-09 prototype; `self`/`off` runtime modes; W18; per-roadmap selectors; T-RT suite on every generator change | Dev |
| R-19 | **Database growth from guest reading progress** exceeds the free tier | 1 | 2 | 2 | ~150 MB worst case in year 1; inactive-account policy; upgrade trigger at 350 MB | Owner |
| R-20 | **Anonymous-gating bypass** (reader blocks the runtime and ticks locally) | 3 | 1 | 3 | Accepted: UX rule, not security; nothing syncs without an account ([19 §3.4](19-guest-accounts-and-progress.md)) | Owner |
| R-21 | **Extension maintenance burden** (judge DOM changes break content scripts) | 1 | 1 | 1 | Only the owner uses it; reuse the NEUPC extension (one codebase for both projects); optional | Owner |
| R-22 | **Terms-of-service complaints from a judge** about automated reads | 1 | 2 | 2 | Public pages only, low frequency, identified client, robots.txt, immediate kill switch | Owner |
| R-23 | **Blog SEO** on a subdomain instead of the main domain | 2 | 1 | 2 | Main-domain redirects, sitemaps, cross-links; revisit after 6 months of Search Console data (`Q-27`) | Owner |

## Part B — Architecture Decision Records

Status `Proposed` until approved.

### ADR-001 — Next.js 16 App Router with Cache Components
Unchanged: RSC + Server Actions + `"use cache"`/tags; `proxy.ts` host routing.

### ADR-002 — Supabase with supabase-js, SQL migrations, no ORM
Unchanged: RLS is the permission truth; pgTAP tests.

### ADR-003 (revised) — Open guest sign-up; admin by allowlist only
- **Context:** Readers need accounts to save progress and track CP; admin must stay locked down.
- **Decision:** Supabase Auth with Google and GitHub for everyone. Every new account is a `guest`.
  `owner`/`editor` come only from active `admin_users` rows (checked by table in RLS, surfaced as
  a JWT claim for UI/proxy). The Before User Created hook blocks disposable domains and banned
  addresses.
- **Consequences:** One identity system; RLS must be airtight for user-owned tables (pgTAP matrix);
  privacy obligations (export/delete).
- **Alternatives:** A separate auth system for readers (duplication); allowlist-only accounts (no
  guests, which contradicts the requirement).

### ADR-004 (revised) — One isolated content origin for all author HTML
- **Context:** Topics **and blog posts** are full HTML with scripts; readers need a session there for
  progress.
- **Decision:** `read.eyasir329.dev` serves `/docs/**` and `/blog/**` through a Next.js route
  handler with explicit headers and CSP. It has its own narrow reader session (ADR-015) and never
  receives main-origin cookies. The main site's `/blog/[slug]` redirects there.
- **Consequences:** Strong isolation; posts' canonical URLs live on the subdomain (R-23).
- **Alternatives:** Rendering post HTML on the main origin, rejected (script access to sessions and
  server actions). Iframe embedding, rejected (SEO, height/scroll issues, no extra isolation).
  Separate origins for docs and blog, rejected (two bridges, split theme/progress storage).

### ADR-005 (revised) — Immutable stored bytes; one injected runtime block
- **Context:** Faithful rendering matters, but sign-in-gated progress needs code inside the page.
- **Decision:** Store every file exactly as uploaded. When serving an entry `index.html`, insert one
  fixed block (context JSON + `<script src="/__rt/runtime.v1.js">`) before `</head>`. It is
  identical for all visitors, so it stays cacheable. Modes `inject` / `self` / `off`. All other files
  are byte-for-byte.
- **Consequences:** A tiny, testable deviation (T-KB-02 checks "served minus block == stored");
  runtime versioned by filename.
- **Alternatives:** Rewrite bundles on import (breaks fidelity and hashes); require generator
  changes before launch (blocks existing bundles); per-user HTML (breaks CDN caching).

### ADR-006 — Content-addressed storage
Unchanged, now shared by topics, posts, templates and editor assets.

### ADR-007 (narrowed) — Markdown for site-rendered text only
- **Decision:** Markdown + directives remain for text the **main origin** renders (case studies,
  bio, contest write-ups, privacy/terms). **Blog posts no longer use Markdown** (ADR-014).

### ADR-008 — R3F with one shared canvas, progressive enhancement
Unchanged.

### ADR-009 — Postgres full-text search
Unchanged; now indexes bundle sections of posts and topics.

### ADR-010 — pg_cron + pg_net scheduler
Unchanged; now also triggers the daily per-platform CP runs.

### ADR-011 — Tailwind v4 tokens + shadcn/ui for admin
Unchanged.

### ADR-012 — Two Supabase projects (staging, production)
Unchanged.

### ADR-013 — Server Actions for UI mutations; route handlers for external callers
Unchanged; external callers now include the reader runtime, the browser extension and the CLI.

### ADR-014 — Blog posts are HTML bundles
- **Context:** The owner writes posts in HTML and wants them rendered in full (interactivity, custom
  layouts), like the topics.
- **Decision:** A post is a subject of the bundle engine: versions, CAS, validation, preview,
  scheduling, search. Authored in an in-admin HTML editor (templates, assets, live sandboxed
  preview) or uploaded as a zip/CLI. The main site shows listings and feeds from extracted and
  overridden metadata.
- **Consequences:** One engine for two content types; the editor also serves topics; feeds carry
  summaries rather than full HTML.
- **Alternatives:** Sanitised HTML fragments rendered on the main origin (loses scripts/styles, so it
  doesn't meet the requirement); MDX (executes code on the main origin; not HTML-first).

### ADR-015 — Reader session bridge for the content origin
- **Context:** The content origin must know who the reader is without sharing main-origin cookies.
- **Decision:** After main-origin sign-in, `/auth/bridge` mints a 60 s single-use code; the content
  origin exchanges it for an opaque, HttpOnly `__Host-rt_session` (DB-backed, revocable, 30 days
  sliding) plus a non-secret `rt_signed_in` hint. The session can only call `/__api/*`.
- **Consequences:** Works on any domain setup (no cookie sharing); instant revocation; one extra
  redirect on first sign-in. Accepted: bundle JS on the content origin can act on the current
  reader's progress.
- **Alternatives:** Shared parent-domain cookies (exposes the main session to author JS); CORS calls
  from the content origin to the main origin with credentials (CSRF surface, ITP issues).

### ADR-016 — Server-authoritative progress; the runtime reconciles through the page's own events
- **Context:** Bundles keep progress in `localStorage`; the owner wants progress only for signed-in
  users, synced across devices.
- **Decision:** The server is the source of truth. The runtime guards the progress keys (blocked when
  anonymous; cached and queued when signed in), applies server state by setting control `checked`
  and dispatching `change` (so the page's own UI logic updates), and flushes a pending queue.
- **Consequences:** Works with unmodified bundles; relies on the documented control contract
  (selectors, key prefix); covered by T-RT tests.
- **Alternatives:** Rewrite bundle scripts (breaks fidelity); server-rendered personalised HTML
  (uncacheable).

### ADR-017 — Judge adapters: API first, scraping behind flags, extension for the rest
- **Context:** The owner's public CP page covers 10 judges, which range from official APIs to no public
  data at all (learners have no CP tracking since 0.3). The owner's NEUPC
  already solved this in practice.
- **Decision:** Port NEUPC's adapters to TypeScript. Order of preference: official/community API →
  public profile page (flagged, polite) → browser extension ingestion (NEUPC-compatible) → CLIST
  fallback (optional). Surface "needs extension" honestly.
- **Consequences:** Reuses proven code; some judges are best-effort; the extension is optional but
  unlocks full history.
- **Alternatives:** Only API judges (fails the requirement for 10 judges); asking users for judge
  credentials (unacceptable).

### ADR-018 — Canonical problem keys
- **Decision:** Every one of the owner's solves is normalised to `{judge}:{id}`, so
  VJudge and origin-judge solves deduplicate in the owner's combined total.
- **Consequences:** One shared parser with table-driven tests; unknown ids are kept but not deduplicated.

### ADR-019 (revised in 0.3) — Per-platform scheduled runs instead of a job queue
- **Context:** In 0.2 a DB queue served many guest accounts. With learner CP tracking removed, only
  the owner's ~10 accounts are synced.
- **Decision:** One pg_cron job per platform per day (staggered), each calling
  `/api/cron/sync-cp?platform=…` with an advisory lock, a 50 s budget and a resumable cursor;
  "Run now" per platform in admin. The `cp_sync_jobs` queue is withdrawn.
- **Consequences:** Much simpler; no worker every minute; partial backfills finish over successive
  runs.
- **Alternatives:** Keep the queue (unneeded complexity); an external job service.

### ADR-020 — Generalised bundle engine (`bundle_*` tables with subjects)
- **Decision:** Replace `kb_*` storage tables with `bundle_*` tables keyed by `(subject_type,
  subject_id)`; roadmap nodes and posts are subjects; templates reuse versions.
- **Consequences:** One pipeline, one serving path, one set of tests; a polymorphic FK is enforced by
  trigger.

## Part C — Decision log

| Date | ID | Decision | By |
|---|---|---|---|
| 2026-09-24 | ADR-001…013 | Proposed (revision 0.1) | Planning |
| 2026-09-25 | ADR-003, 004, 005 revised; 007 narrowed; ADR-014…020 added | Proposed (revision 0.2): HTML blog, guest accounts, 10-judge tracking | Planning |
| 2026-09-25 | ADR-017, 018 narrowed to owner-only; ADR-019 revised (no queue) | Proposed (revision 0.3): learner CP tracking removed | Owner request |
