# 12 — Integrations & Sync

> Status: **Draft v0.1** · Related: [01 FR-SYNC, FR-CP](01-product-requirements.md), [07 §4.3–4.4, §9](07-database-design.md), [06 §6.5](06-system-architecture.md)

---

## 1. Integration catalogue

| Integration | Kind | API | Auth | Stability | v1 |
|---|---|---|---|---|---|
| **GitHub** | Profile, repos, contributions | GraphQL v4 (+ REST for languages if needed) | Fine-grained PAT, public read-only | Official, stable | **M** |
| **Codeforces** | Rating, contests, submissions | Official `https://codeforces.com/api/*` (`user.info`, `user.rating`, `user.status`) | None (public methods) | Official; **max 1 request / 2 s** | **M** |
| AtCoder | Rating history, solved | Community "AtCoder Problems" API (unofficial) + AtCoder's rating history JSON | None | Unofficial; be polite (≥ 1 s between calls) | C |
| LeetCode | Solved counts, contest rating | Public GraphQL endpoint (undocumented) | None | Unofficial, can break | C |
| CodeChef | Rating | No official public API | — | Scraping is out of scope | Manual |
| CSES, VJudge, Toph, LightOJ, SPOJ, HackerRank | Solved counts | None practical | — | — | Manual |
| **NEUPC** (owner's platform) | Aggregated multi-judge stats (NEUPC already tracks dozens of judges) | Possible internal API | Token | Owned by the owner | Option (`Q-09`) |
| LinkedIn | — | No usable profile API | — | — | Link only |
| Google OAuth | Admin sign-in | Via Supabase | — | Official | **M** ([08](08-auth-and-security.md)) |
| Cloudflare Turnstile | Bot protection | `siteverify` | Secret key | Official | **M** |
| Resend | Email notifications | REST | API key | Official | **M** |
| Sentry | Errors/traces | SDK | DSN | Official | **M** |
| YouTube | Embeds only (facade) | None (static thumbnails) | — | — | M |

> **Why NEUPC matters:** NEUPC already integrates many online judges plus a browser extension for
> submission sync. If it exposes (or can expose) a read-only endpoint for one user's aggregated
> stats, the portfolio can show **all judges** through one adapter instead of fragile unofficial
> APIs. Decision `Q-09`.

## 2. Adapter design

```ts
// lib/integrations/judges/types.ts  (design sketch, not implemented)
export interface JudgeAdapter {
  platform: 'codeforces' | 'atcoder' | 'leetcode' | 'neupc' | string;
  minIntervalMs: number;                 // politeness / rate limit
  fetchProfile(handle: string): Promise<ProfileSnapshot>;            // rating, max, rank, solved
  fetchRatingHistory?(handle: string): Promise<RatingChange[]>;
  fetchSolved?(handle: string, since?: Date): Promise<SolvedProblem[]>; // first AC per problem
}
```

- Each adapter is pure fetch + mapping, unit-tested against **recorded fixtures** (real JSON saved
  once, stored in `tests/fixtures/integrations/`), so tests never hit the network.
- A shared `politeFetch` enforces `minIntervalMs`, timeouts (15 s), retries (3× with exponential
  backoff + jitter, only for 429/5xx/network errors), and a descriptive `User-Agent`.
- Adding a judge = one adapter + one `cp_platforms` row. No schema change.

## 3. GitHub sync (daily)

| Step | Detail |
|---|---|
| Query | One GraphQL call: `user(login:"eyasir329") { name avatarUrl followers { totalCount } following { totalCount } repositories(first:100, ownerAffiliations:OWNER, privacy:PUBLIC, orderBy:{field:PUSHED_AT, direction:DESC}) { nodes { nameWithOwner description url homepageUrl stargazerCount forkCount isFork isArchived pushedAt primaryLanguage { name } languages(first:8, orderBy:{field:SIZE,direction:DESC}) { edges { size node { name } } } repositoryTopics(first:10) { nodes { topic { name } } } } } pinnedItems(first:6, types:REPOSITORY) { nodes { ... on Repository { nameWithOwner } } } contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { date contributionCount contributionLevel } } } } }` |
| Writes | Upsert `github_profile` (single row) and `github_repos` (by `full_name`); compute `total_stars` and `top_languages` (bytes-weighted, excluding forks) |
| Visibility | New repos default to `show_on_site = false`; repos linked to a project are always used on the project page |
| Budget | 1 call/day (GitHub allows 5,000 points/hour with a token) |
| Invalidate | `revalidateTag('github')`, `revalidateTag('projects')` |

## 4. Codeforces sync (daily)

| Call | Maps to |
|---|---|
| `user.info?handles=eyasir329` | `cp_profiles`: `current_rating`, `max_rating`, `rank_title`, `max_rank_title` |
| `user.rating?handle=eyasir329` | `cp_rating_changes` upsert by `(profile_id, contestId)`; `contests_count` |
| `user.status?handle=eyasir329` (first run: all; then `from=1&count=500`, stopping at the newest known submission id) | `verdict = OK` → `cp_solved_problems` (first AC per `contestId+index`, with `rating` and `tags`); `cp_daily_activity` (accepted & total per day, in `Asia/Dhaka`); `solved_count` = distinct solved |

- Calls are spaced ≥ 2 s apart (Codeforces limit); a full first sync of ~5,000 submissions is a
  single `user.status` call (~1–2 MB JSON).
- The response `status: "FAILED"` with `comment` is treated as an error with that message.
- Gym/unofficial participations are counted as solves but excluded from rating history (as
  Codeforces itself does).

## 5. Scheduling & orchestration

| Mechanism | Role |
|---|---|
| **pg_cron + pg_net** (Supabase) | Primary scheduler: any cadence, calls `POST /api/cron/{job}` with `Authorization: Bearer CRON_SECRET` (secret stored in Supabase Vault) |
| Vercel Cron (daily) | Backup trigger for `sync-all` in case pg_cron is misconfigured; Hobby allows only daily jobs, which is enough for a backup |
| Admin "Run now" | Server action → same service function, `trigger = 'manual'` |

**Run protocol** (identical for every job):

```text
1. insert sync_runs(integration, trigger, status='running')
2. pg_try_advisory_lock(hash(integration))  → if taken: mark run 'failed' ("already running"), exit
3. for each enabled profile of this integration:
      fetch (politeFetch) → map → upsert in one transaction per profile
      record per-profile outcome; one profile failing ≠ whole run failing
4. status = succeeded | partial | failed; stats { api_calls, inserted, updated, ms }
5. revalidateTag(...) for affected tags
6. if this integration has failed 3 runs in a row → one email to the owner (not every time)
7. release lock
```

Function time budget: the Codeforces run is ~3 calls × 2 s spacing plus processing, well under the
Vercel function time limit. Long first-time imports can run in pages via repeated invocations if
needed.

## 6. Data freshness & display

| Rule | Detail |
|---|---|
| "As of" | CP and GitHub blocks show "as of {relative time}" from `last_synced_at` / `fetched_at` |
| Stale in admin | Amber after 48 h without success, red after 7 days |
| Public on failure | Always the last good snapshot; never an error message on public pages |
| Overrides | Manual values win (see [11 §6.3](11-content-modules.md)) |

## 7. Webhook & revalidation contract

- `POST /api/revalidate` accepts `{ tags: string[] }` with `X-Signature: sha256=HMAC(body,
  REVALIDATE_WEBHOOK_SECRET)`. Used by pg_cron jobs (scheduled posts) and by Supabase Database
  Webhooks if content is ever edited outside the app (e.g. SQL editor).
- Unknown tags are rejected (the allowlist is the tag catalogue in [06 §3](06-system-architecture.md)).

## 8. Keeping the free tier awake

Supabase pauses free projects after 7 days without API requests. The daily GitHub/Codeforces jobs
are real requests against the project every day, and an external uptime monitor pings
`/api/health` (which runs a trivial `select 1`) every 10 minutes. If the project is ever paused, the
runbook in [14 §8](14-devops-and-environments.md) covers resuming it.

## 9. Testing integrations

| Test | How |
|---|---|
| Mapping correctness | Unit tests with recorded fixtures (`codeforces/user.status.json`, `github/user.graphql.json`) |
| Error paths | Fixtures for `FAILED` responses, 429, timeouts, malformed JSON |
| Idempotency | Running the same sync twice produces no duplicate rows (unique constraints + upserts) |
| Contract drift | A weekly scheduled CI job calls the live APIs (read-only) and diffs the response shape against the fixtures; it opens an issue on drift |
