# DEV-06 — Operations Handbook

> Status: **Draft v0.5** · Related: [14 §6–9](../14-devops-and-environments.md) (monitoring, backups, runbooks, cost; this handbook supersedes 14 §8), [08 §13](../08-auth-and-security.md), [DEV-05 §8](dev-05-cicd-and-release.md)

A solo-operated site still needs clear operations. This handbook says what is watched, who reacts
how fast, and the exact steps for the situations that will happen.

---

## 1. Ownership and response targets

| Severity | Examples | Response | Resolve or mitigate |
|---|---|---|---|
| **S1 Critical** | Site or content origin down; data leak; sign-in broken for everyone; secret leaked | Same day, immediately if awake | Mitigate ≤ 4 h (rollback, flag, rotate) |
| **S2 Major** | Reader API errors > 2%; a phase feature broken; nightly backup failed twice | ≤ 24 h | ≤ 3 days |
| **S3 Minor** | One judge failing; a page's layout bug; slow page | This week | Next release |
| **S4 Cosmetic** | Copy, spacing | Backlog | When convenient |

Owner = operator. Alerts go to the owner's email and phone push (uptime monitor, Sentry, GitHub
Actions failures).

## 2. Observability, added phase by phase

| Phase | Added |
|---|---|
| P1 | Sentry (server + client, releases), `/api/health` (DB round trip + version), uptime monitors (production + staging), Speed Insights, CI failure notifications |
| P2 | Contact-form delivery check (Resend webhook or daily test message on staging), `audit_log` viewer |
| P3 | Uptime check on a published topic (content host); import-job failures on the dashboard; CDN cache-hit spot check after publish |
| P4 | `publish-due-posts` missed-run alert (a due post still unpublished 10 min later) |
| P5 | Reader API error rate and p95 (`/__api/*`); runtime error tag in Sentry; sign-ups/day; deletion backlog > 25 days alert |
| P6 | Per-platform health (`cp_platforms.health`, `sync_runs`), alert after 3 consecutive failures; weekly contract check |
| P7 | Web vitals by page with 3D on/off; WebGL context-loss events |
| P8 | Analytics dashboards; quota alerts at 70%; backup success monitor |

## 3. Incident process

1. **Detect:** alert, monitor, or a report through the contact form.
2. **Triage:** assign S1–S4 (§1); open a GitHub issue labelled `incident`.
3. **Mitigate first:** flag off, rollback, kill switch or rotate (DEV-05 §8). Don't debug on a
   broken production.
4. **Communicate:** for S1/S2 affecting readers, enable the announcement bar (WF-05) with a plain
   message; for data incidents, follow the privacy notice obligations in [19](../19-guest-accounts-and-progress.md).
5. **Fix forward** through the normal PR → staging → production path (hotfix PRs may skip the
   Friday demo but not CI).
6. **Review** (S1/S2): a short post-incident note in the issue: timeline, cause, what detected it,
   what will prevent it (test, alert, runbook change).

## 4. Runbooks

| ID | Situation | Steps |
|---|---|---|
| RB-01 | **Supabase project paused** (Free plan) | Dashboard → project → Restore → wait for healthy → admin "Sync all" → check uptime. Cause: were daily jobs and uptime pings failing? Consider `Q-45` |
| RB-02 | **Site or content origin down** | Check Vercel status and the latest deployment → `/api/health` (DB?) → Supabase status → if the latest deploy is suspect, RB-03 → post an announcement if > 30 min |
| RB-03 | **Bad deploy** | Vercel → Deployments → Instant Rollback to the last good production deployment → open an incident issue → fix forward. Schema stays (expand-compatible by rule) |
| RB-04 | **Migration failed in production / schema drift** | The release stops before `prod-deploy` (app unaffected). Read the error in the job log → reproduce on a fresh local DB with production's migration list (`supabase migration list --linked`) → write a forward-fix migration → PR → release. Drift found by `list_migrations` (MCP, staging) or `migration list`: never patch by hand; codify the change as a migration |
| RB-05 | **Sign-in broken** | Check Supabase Auth logs (MCP `get_logs` on staging; dashboard on production) → compare site URL and redirect URLs with DEV-03 §6 → verify provider secrets and hooks enabled → test with a fresh browser profile → if a hook function errors, fix it with a forward-fix migration (hooks are SQL). Never disable the custom-access-token hook in production: roles would disappear and admins would lose access |
| RB-06 | **Bad topic or post published** | Admin → node/post → Versions → Roll back (or `pnpm bundle publish --version N`) → confirm on the content host within 60 s |
| RB-07 | **Stale content after publish** | Check the version pointer in admin → re-run CDN purge for `content:{subjectId}` (admin action) → verify `Vercel-Cache-Tag` header → if purge failed, record in Sentry and retry; last resort redeploy |
| RB-08 | **A judge blocks us or changes its site** | Admin → Sync & judges → disable the platform (or its scraping flag) → public card keeps the last snapshot with "as of" → record new fixtures → fix adapter → re-enable on staging → production |
| RB-09 | **Content deleted or edited by mistake** | `audit_log` diff (WF viewer) → re-create from the diff; if gone, restore the table from the latest dump into staging (RB-10) and copy the rows |
| RB-10 | **Data loss: restore** | Download the latest encrypted dump → decrypt with the offline `age` key → restore into **staging** (`reset-staging` off) → verify → copy the needed rows to production with a reviewed SQL script, or for a full restore: maintenance flag on, restore into production, re-apply pending deletions from the deletion log, verify, flag off |
| RB-11 | **Rotate secrets** (scheduled or suspected) | Create the new value → update Vercel env (all scopes) and GitHub Environment → Supabase Vault for cron secrets → redeploy via release → trigger each job manually → revoke the old value → note in the rotation log (§6) |
| RB-12 | **Reader API or runtime incident** | Readers' ticks queue locally. If the runtime misbehaves on pages: set the roadmap's `runtime_mode = off` + purge (≤ 60 s) → fix → re-enable on staging → production. If only the API fails: RB-03 or fix forward; queued writes flush on the next visit |
| RB-13 | **Reader data request or deletion** | Point to `/me/settings` (self-service export/delete). If they can't sign in: verify email ownership by reply → run delete from `/admin/users` → confirm in writing |
| RB-14 | **Abusive account or sign-up spam** | `/admin/users` → Ban (reason) → sessions revoked; if a wave: `accounts.signup = invite` temporarily; add domains to the blocklist |
| RB-15 | **Security incident** (leaked secret, unintended write by a tool or agent, suspicious admin activity) | Rotate first (RB-11) → revoke the affected token or OAuth grant (Supabase account → authorised apps; GitHub tokens) → check `audit_log` and Supabase logs for the window → restore affected data (RB-09/10) → post-incident note; for agents, tighten DEV-01 §6 permissions |
| RB-16 | **Quota approaching a limit** | Identify the driver (DB size, storage, egress, function invocations, email) → apply the cheapest fix (retention, GC, image sizes, caching) → if structural, trigger the upgrade in [14 §9](../14-devops-and-environments.md) (`Q-45`) |

## 5. Backups and restore drills

| Item | Rule |
|---|---|
| Nightly | `db-backup.yml`: schema, data and roles dumps, encrypted with `age` (public key in CI; private key offline, held by the owner in a password manager and on paper) |
| Retention | 30 daily + 12 monthly for content; 30 days for guest data ([14 §7](../14-devops-and-environments.md)) |
| Monitoring | Workflow failure notifies; two consecutive failures = S2 |
| **Quarterly restore drill** | Restore the latest production dump into staging → run pgTAP and smoke tests → replay the deletion log → record time-to-restore (target ≤ 4 h) and issues in the ops log |
| Before risky migrations | Take an on-demand dump (manual run of the backup workflow) and note it in the PR |

## 6. Secret rotation calendar

| Secret | Rotation | Also rotate when |
|---|---|---|
| Supabase secret key (per project) | Every 6 months | A collaborator leaves; suspected leak |
| Supabase scoped access tokens (CI) | Every 90 days (set expiry) | — |
| `CRON_SECRET`, `REVALIDATE_WEBHOOK_SECRET`, `CONTENT_PREVIEW_SECRET` | Every 6 months | Suspected leak |
| Bundle CLI and `cp:ingest` tokens | ≤ 90 days (expiry enforced) | Device lost |
| OAuth client secrets (Google, GitHub) | Yearly | Suspected leak |
| Vercel token (CI) | Yearly | — |
| `age` backup key pair | Never routinely (old backups need it) | Private key exposure: new pair, re-encrypt retained backups |

## 7. Maintenance calendar

| Cadence | Checklist |
|---|---|
| Daily (2 min) | Sentry new issues; sync health tile; failed workflows |
| Weekly | Contract-check results; Renovate PRs; quota glance; sign-ups and bans; deletion backlog |
| Monthly | Supabase/Vercel usage vs [14 §9](../14-devops-and-environments.md) triggers; advisors on production (read-only); Lighthouse on key pages; dependency audit |
| Quarterly | Restore drill (§5); access review (Vercel, Supabase org members, GitHub, OAuth apps, MCP/authorised apps); secret rotations due |
| Yearly | Domain renewal; privacy policy review; OAuth consent screen review; retention settings review |

## 8. Cost watch

Launch cost ≈ domain only ([14 §9](../14-devops-and-environments.md)). The monthly check compares
usage with the upgrade triggers; an upgrade is proposed to the owner as an issue with the numbers,
never done silently.
