# 12 — Integrations & Sync

> Status: **Draft v0.3** · Related: [20 CP tracking (judges, runs, extension)](20-cp-multi-platform-tracking.md), [01 FR-SYNC](01-product-requirements.md), [07 §4.3–4.4, §9](07-database-design.md), [06 §6.5](06-system-architecture.md)
>
> **Revision 0.3:** judge integrations cover **10 judges for the owner only** (learner CP tracking
> was removed). The full design (capability matrix, adapters, canonical problems, scheduled runs,
> extension) is in
> [20](20-cp-multi-platform-tracking.md). This document keeps the overall catalogue, GitHub,
> scheduling, revalidation and testing.

---

## 1. Integration catalogue

| Integration | Purpose | API / method | Auth | v1 |
|---|---|---|---|---|
| **GitHub** | Owner profile, repos, contributions | GraphQL v4 | Fine-grained PAT (read-only) | **M** |
| **Codeforces** | Owner: rating, history, solves | Official API (1 call / 2 s) | None | **M** |
| **AtCoder** | Owner | `atcoder.jp/users/{u}/history/json` + AtCoder Problems v3 | None | **M** |
| **LeetCode** | Owner: counts, contest rating; full history via extension | Undocumented GraphQL + extension | None / owner token | **M** (profile) · S (history) |
| **CodeChef** | Owner | Profile page (scrape, flagged) + CLIST fallback + extension | None | S |
| **LightOJ** | Owner | Profile page (scrape) + extension | None | S |
| **UVa** | Owner | uHunt API | None | **M** |
| **SPOJ** | Owner | Profile page (Cloudflare-prone) + VJudge fallback + extension | None | S |
| **CSES** | Owner | Profile page (count only) + extension | None | S |
| **Toph** | Owner | Unofficial API/profile page | None | S |
| **VJudge** | Owner; also covers many origin judges | Unofficial JSON (`status/data`, `solveDetail`) | None | **M** |
| **CLIST.by** | Optional fallback for contest results | API v4 (~10 req/min) | API key | C (`Q-31`) |
| **NEUPC browser extension** | Full submission history for judges without public lists | The owner's extension posts to a NEUPC-compatible ingestion API on this site | Owner `cp:ingest` token | S (`Q-30`) |
| Google, GitHub OAuth | Sign-in (admin + guests) | Via Supabase Auth | Provider secrets in Supabase | **M** |
| Cloudflare Turnstile | Contact form bot protection | `siteverify` | Secret | **M** |
| Resend | Owner notifications; guest account notices (inactivity, incident) | REST | API key | **M** |
| Sentry | Errors and traces | SDK | DSN | **M** |
| YouTube | Click-to-load embeds in bundles | None | — | M |

Judge feasibility is grounded in the owner's NEUPC implementation (July 2026) and re-verified in
`SP-08` before building ([20 §1–2](20-cp-multi-platform-tracking.md)).

## 2. GitHub sync (owner, daily)

| Step | Detail |
|---|---|
| Query | One GraphQL call: profile counts, 100 owned public repos (stars, forks, languages, topics, `pushedAt`), pinned repos, contribution calendar |
| Writes | Upsert `github_profile` and `github_repos`; compute total stars and top languages (excluding forks) |
| Visibility | New repos default to hidden; repos linked to projects are always used |
| Invalidate | `revalidateTag('github')`, `revalidateTag('projects')` |

## 3. Judge sync (summary; full design in [20](20-cp-multi-platform-tracking.md))

- One **adapter per judge** with declared capabilities and politeness budgets, ported from NEUPC's
  services.
- **Scheduled runs:** one daily pg_cron job per platform (staggered 5 min apart) calls
  `/api/cron/sync-cp?platform=…`; an advisory lock prevents overlaps; 50 s budget per run.
- **Triggers:** daily schedule + admin "Run now" per platform.
- **Incremental cursors** per account; runs that don't finish end as `partial` and continue next
  time; canonical problem keys for cross-judge dedupe.
- **Extension ingestion** endpoints accept the **owner's** submissions for LeetCode, CSES, LightOJ,
  SPOJ, CodeChef (and any other judge).

## 4. Scheduling

| Mechanism | Role |
|---|---|
| **pg_cron + pg_net** | Primary: GitHub daily, one CP job per platform daily, post publishing every 5 min, cleanup jobs ([07 §9](07-database-design.md)) |
| Vercel Cron (daily) | Backup trigger for `sync-github` and the CP platform runs (Hobby allows daily jobs only) |
| Admin "Run now" | Server action → triggers the same route handler for one platform |

**Owner-level run protocol** (GitHub, scheduler summaries): `sync_runs` row → advisory lock →
fetch/map/upsert → status and stats → revalidate → email after 3 consecutive failures.

## 5. Freshness & display

| Rule | Detail |
|---|---|
| "As of" | CP and GitHub blocks show "as of {relative time}" |
| Account states | synced · syncing · needs extension · failing · paused ([20 §5](20-cp-multi-platform-tracking.md)) |
| Stale in admin | Owner accounts amber after 48 h, red after 7 days; platform health tiles show error rates |
| Public on failure | Last good snapshot; never an error on public pages |
| Overrides | Owner's manual values win on the public page |

## 6. Webhook & revalidation contract

`POST /api/revalidate` with `{ tags: string[] }` and `X-Signature: sha256=HMAC(body, secret)`. Used
by pg_cron jobs (scheduled posts, CP public updates) and Supabase Database Webhooks. The tag
allowlist is the catalogue in [06 §3](06-system-architecture.md).

## 7. Keeping the free tier awake

The daily jobs and the every-5-minute post publisher run real queries, which keeps the Supabase
project active; an external uptime monitor also pings `/api/health` every 10 minutes.

## 8. Politeness & terms of service

- Identify the client (`User-Agent: eyasir329.dev-cp-sync/1.0 (+https://eyasir329.dev/contact)`).
- Honour each platform's budget; back off on 429/403/challenge pages; cache profile pages ≥ 6 h.
- HTML adapters read **public profile pages only**, respect `robots.txt`, and are behind
  per-platform kill switches (`cp_platforms.scraping_enabled`).
- No judge credentials are ever stored. Data that isn't public comes only through the owner's own
  browser extension.

## 9. Testing integrations

| Test | How |
|---|---|
| Mapping | Unit tests per adapter with recorded fixtures (`tests/fixtures/judges/{platform}/…`) |
| Error paths | `FAILED` responses, 429, Cloudflare challenge HTML, timeouts, malformed JSON |
| Idempotency | Re-running a sync yields no duplicates (unique keys + upserts) |
| Canonical keys | Table-driven tests for every URL pattern in [20 §4](20-cp-multi-platform-tracking.md) |
| Runs | Overlapping runs of one platform are prevented by the advisory lock; `partial` runs resume from the saved cursor |
| Contract drift | Weekly scheduled CI job hits live endpoints read-only (owner handles) and opens an issue on shape changes |
