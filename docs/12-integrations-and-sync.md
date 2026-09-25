# 12 — Integrations & Sync

> Status: **Draft v0.2** · Related: [20 CP tracking (judges, queue, extension)](20-cp-multi-platform-tracking.md), [01 FR-SYNC](01-product-requirements.md), [07 §4.3–4.4, §9](07-database-design.md), [06 §6.5](06-system-architecture.md)
>
> **Revision 0.2:** judge integrations cover **10 judges for the owner and for guests**. Their full
> design (capability matrix, adapters, canonical problems, queue, extension) moved to
> [20](20-cp-multi-platform-tracking.md). This document keeps the overall catalogue, GitHub,
> scheduling, revalidation and testing.

---

## 1. Integration catalogue

| Integration | Purpose | API / method | Auth | v1 |
|---|---|---|---|---|
| **GitHub** | Owner profile, repos, contributions | GraphQL v4 | Fine-grained PAT (read-only) | **M** |
| **Codeforces** | Owner + guests: rating, history, solves | Official API (1 call / 2 s) | None | **M** |
| **AtCoder** | Owner + guests | `atcoder.jp/users/{u}/history/json` + AtCoder Problems v3 | None | **M** |
| **LeetCode** | Owner + guests: counts, contest rating; full history via extension | Undocumented GraphQL + extension | None / extension token | **M** (profile) · S (history) |
| **CodeChef** | Owner + guests | Profile page (scrape, flagged) + CLIST fallback + extension | None | S |
| **LightOJ** | Owner + guests | Profile page (scrape) + extension | None | S |
| **UVa** | Owner + guests | uHunt API | None | **M** |
| **SPOJ** | Owner + guests | Profile page (Cloudflare-prone) + VJudge fallback + extension | None | S |
| **CSES** | Owner + guests | Profile page (count only) + extension | None | S |
| **Toph** | Owner + guests | Unofficial API/profile page | None | S |
| **VJudge** | Owner + guests; also covers many origin judges | Unofficial JSON (`status/data`, `solveDetail`) | None | **M** |
| **CLIST.by** | Optional fallback for contest results | API v4 (~10 req/min) | API key | C (`Q-31`) |
| **NEUPC browser extension** | Full submission history for judges without public lists | Posts to a NEUPC-compatible ingestion API on this site | Per-user `cp:ingest` token | S (`Q-30`) |
| Google, GitHub OAuth | Sign-in (admin + guests) | Via Supabase Auth | Provider secrets in Supabase | **M** |
| Cloudflare Turnstile | Contact form bot protection | `siteverify` | Secret | **M** |
| Resend | Owner notifications; guest data notices (inactivity, incident) | REST | API key | **M** |
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
- **Queue:** `cp_sync_jobs` with `FOR UPDATE SKIP LOCKED`, processed every minute by
  `/api/cron/cp-worker`; per-platform throttles shared across workers.
- **Triggers:** handle linked, "Sync now" (30 min cooldown), daily scheduler (owner + active guests).
- **Incremental cursors** per account; canonical problem keys for cross-judge dedupe; practice
  auto-verification after each sync.
- **Extension ingestion** endpoints accept submissions for LeetCode, CSES, LightOJ, SPOJ, CodeChef
  (and any other judge) from the user's own linked handles.

## 4. Scheduling

| Mechanism | Role |
|---|---|
| **pg_cron + pg_net** | Primary: GitHub daily, CP scheduler daily, **CP worker every minute**, post publishing every 5 min, cleanup jobs ([07 §9](07-database-design.md)) |
| Vercel Cron (daily) | Backup trigger for `sync-github` and `cp-scheduler` (Hobby allows daily jobs only) |
| Admin / guest "Run now" | Server action → enqueue a job (never calls judges directly from the request) |

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

The every-minute CP worker (even when idle, it runs a query) and the daily jobs keep the Supabase
project active; an external uptime monitor pings `/api/health` every 10 minutes.

## 8. Politeness & terms of service

- Identify the client (`User-Agent: eyasir329.dev-cp-sync/1.0 (+https://eyasir329.dev/contact)`).
- Honour each platform's budget; back off on 429/403/challenge pages; cache profile pages ≥ 6 h.
- HTML adapters read **public profile pages only**, respect `robots.txt`, and are behind
  per-platform kill switches (`cp_platforms.scraping_enabled`).
- No credentials for judge accounts are ever requested from users. Private data comes only
  through the user's own browser extension.

## 9. Testing integrations

| Test | How |
|---|---|
| Mapping | Unit tests per adapter with recorded fixtures (`tests/fixtures/judges/{platform}/…`) |
| Error paths | `FAILED` responses, 429, Cloudflare challenge HTML, timeouts, malformed JSON |
| Idempotency | Re-running a sync yields no duplicates (unique keys + upserts) |
| Canonical keys | Table-driven tests for every URL pattern in [20 §4](20-cp-multi-platform-tracking.md) |
| Queue | Concurrency test: two workers never process the same job; budgets respected |
| Contract drift | Weekly scheduled CI job hits live endpoints read-only (owner handles) and opens an issue on shape changes |
