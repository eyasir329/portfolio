# 02 — Non-Functional Requirements

> Status: **Draft v0.3** · Related: [05 3D](05-3d-experience.md), [08 Security](08-auth-and-security.md), [14 DevOps](14-devops-and-environments.md), [15 QA](15-testing-and-qa.md), [19 Guests](19-guest-accounts-and-progress.md), [20 CP tracking](20-cp-multi-platform-tracking.md)
>
> **Revision 0.2:** new targets for the reader runtime and reader API (PERF-13/14), guest privacy
> (PRIV-07…10), open registration (SEC-10…12), progress durability (REL-07) and judge-sync capacity.
>
> **Revision 0.3:** judge sync is owner-only (learner CP tracking removed); guest data is limited to
> account + reading progress.

Each NFR is measurable and has a verification method. "p75" means the 75th percentile of real-user
field data (Vercel Speed Insights), measured on mobile unless stated.

---

## 1. Performance (`NFR-PERF`)

| ID | Requirement | Target | Verified by |
|---|---|---|---|
| NFR-PERF-01 | Largest Contentful Paint | ≤ 2.0 s p75 on content pages; ≤ 2.5 s on pages with a 3D scene | Speed Insights, Lighthouse CI |
| NFR-PERF-02 | Interaction to Next Paint | ≤ 200 ms p75 | Speed Insights |
| NFR-PERF-03 | Cumulative Layout Shift | ≤ 0.05 p75 (fonts and images have reserved space) | Speed Insights, Lighthouse |
| NFR-PERF-04 | Time to First Byte (cached HTML) | ≤ 400 ms p75 main site; ≤ 300 ms content origin | Speed Insights, synthetic check |
| NFR-PERF-05 | Lighthouse (mobile preset) | Perf ≥ 95 on content pages, ≥ 90 on Home/CP; Accessibility 100; Best Practices ≥ 95; SEO 100 | Lighthouse CI on every PR (preview URL) |
| NFR-PERF-06 | JavaScript budget | Initial JS per public route ≤ 120 KB gzip, **excluding** the lazy 3D chunk; 3D chunk ≤ 250 KB gzip; admin routes are exempt but code-split per module | `@next/bundle-analyzer` + size check in CI |
| NFR-PERF-07 | Fonts | ≤ 3 families, variable, subset (Latin + Latin-ext), self-hosted via `next/font`, ≤ 150 KB woff2 total on first view; `font-display: swap` with metric-matched fallbacks | Lighthouse, network panel |
| NFR-PERF-08 | Images | AVIF/WebP with responsive `sizes`, explicit dimensions, blur placeholder (LQIP), lazy below the fold; hero/LCP image `priority` | Lighthouse "properly size images" passes |
| NFR-PERF-09 | 3D runtime | 60 fps on a mid-range laptop; ≥ 30 fps on a mid-range Android phone (e.g. Snapdragon 7-series). Adaptive DPR; rendering pauses when offscreen or the tab is hidden; one WebGL context per page | Manual fps sampling + `PerformanceMonitor` telemetry |
| NFR-PERF-10 | 3D never blocks content | The LCP element is text; the canvas mounts after `requestIdleCallback` / first interaction and fades in over its poster | Lighthouse LCP element check |
| NFR-PERF-11 | Content origin | Bundles (topics and posts) are served as stored, plus the runtime block in entry HTML, with CDN caching; a republish reaches readers ≤ 60 s after publish | Synthetic test after publish (T-KB-20) |
| NFR-PERF-12 | Admin responsiveness | List views ≤ 1 s for 1,000 rows (server pagination); saves ≤ 1 s round-trip; HTML-editor preview refresh ≤ 1.5 s after typing stops | Manual timing in UAT |
| NFR-PERF-13 | Reader runtime | ≤ 8 KB gzip, immutable cache; < 5 ms main-thread work before first paint; no layout shift from the chip | Size check in CI; Lighthouse on a topic page |
| NFR-PERF-14 | Reader API and panel | `/__api/progress` p95 ≤ 300 ms; a tick reaches the server ≤ 2 s after the click (online); `/me` LCP ≤ 2.5 s p75 | Synthetic checks; Speed Insights |
| NFR-PERF-15 | Judge sync freshness (owner) | Daily runs for all API judges finish by 04:00 UTC; "Run now" for one platform completes ≤ 2 min p90 | `sync_runs` in admin |

## 2. Accessibility (`NFR-A11Y`)

| ID | Requirement |
|---|---|
| NFR-A11Y-01 | Conform to **WCAG 2.2 AA** on all public pages and the admin panel |
| NFR-A11Y-02 | Text contrast ≥ 4.5:1 (body text target ≥ 7:1); non-text UI ≥ 3:1. Token ratios are listed in [04 §3](04-design-system.md) |
| NFR-A11Y-03 | Everything reachable and operable by keyboard; visible focus ring (2 px accent outline, offset 2 px); skip-to-content link; logical focus order; no keyboard traps (dialogs trap focus and restore it on close) |
| NFR-A11Y-04 | 3D canvases are decorative (`aria-hidden="true"`) **and** every piece of information they convey has a text/table equivalent in the DOM (e.g. the Colonnade ↔ monthly-solves table) |
| NFR-A11Y-05 | `prefers-reduced-motion: reduce` disables scroll-linked animation, parallax, auto-rotation and page transitions; the site-level "Motion/3D off" toggle does the same |
| NFR-A11Y-06 | Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, ordered headings, lists as lists, tables with `th`/`scope` |
| NFR-A11Y-07 | All images have meaningful `alt` (enforced as required in the media library) or `alt=""` when decorative |
| NFR-A11Y-08 | Charts expose values through a visually-hidden table or an explicit "View as table" toggle |
| NFR-A11Y-09 | Forms: visible labels, inline errors tied with `aria-describedby`, error summary on submit, no placeholder-only labels |
| NFR-A11Y-10 | Target size ≥ 24×24 CSS px (WCAG 2.5.8); touch targets on mobile nav ≥ 44×44 |
| NFR-A11Y-11 | Uploaded bundles (topics and posts) are the author's responsibility, but the importer and editor report basic a11y lint warnings (missing `lang`, images without `alt`, missing `<title>`) |
| NFR-A11Y-12 | The runtime chip and disabled progress controls are accessible: keyboard reachable, `aria-describedby` explains "Sign in to track your progress", contrast from the page's tokens with a safe fallback |

## 3. SEO & discoverability (`NFR-SEO`)

| ID | Requirement |
|---|---|
| NFR-SEO-01 | All public content is server-rendered HTML (RSC/static); no content depends on client JS to appear |
| NFR-SEO-02 | Clean, stable, lowercase, hyphenated URLs; slug changes create 308 redirects |
| NFR-SEO-03 | Canonical URLs: main site on the apex domain (`www` → apex 308); topics **and blog posts** canonical on the content origin, directory URLs ending in `/`; main-site `/blog/{slug}` 308-redirects there |
| NFR-SEO-04 | Drafts, previews, admin, `/me`, `/login`, APIs and "coming soon" pages are `noindex` (header **and** meta where applicable) |
| NFR-SEO-05 | Structured data validates in Google's Rich Results Test with no errors |
| NFR-SEO-06 | Sitemaps regenerate on publish (cache tag invalidation) and include `lastmod` |

## 4. Security (`NFR-SEC`) — full design in [08](08-auth-and-security.md)

| ID | Requirement |
|---|---|
| NFR-SEC-01 | RLS enabled on **every** table in exposed schemas; default deny; policies tested by automated tests |
| NFR-SEC-02 | Privileged Supabase secret key used only server-side, never in a `NEXT_PUBLIC_*` variable or client bundle (CI grep check) |
| NFR-SEC-03 | Admin authorisation checked in four layers: proxy, admin layout, every server action/route handler, and RLS |
| NFR-SEC-04 | Author HTML (topics **and blog posts**) executes only on the isolated content origin, which never receives main-origin cookies; its reader session can only reach the reader API |
| NFR-SEC-05 | Security headers on every response: HSTS (preload-ready), CSP (per host), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geolocation off), `frame-ancestors` |
| NFR-SEC-06 | All inputs validated server-side with Zod; Markdown rendered without raw HTML; filenames and paths normalised; zip-slip and zip-bomb protection |
| NFR-SEC-07 | Rate limits: contact 5/h/IP; reader API writes 120/min/session; "Sync now" 1 per account per 30 min; extension 600 submissions/min/token; CLI 60 req/min/token ([08 §10](08-auth-and-security.md)) |
| NFR-SEC-08 | Dependencies: automated update PRs (Renovate/Dependabot), `pnpm audit` in CI (fail on high/critical), lockfile committed |
| NFR-SEC-09 | Secrets rotated on suspicion of leak and at least yearly; rotation runbook in [14 §8](14-devops-and-environments.md) |
| NFR-SEC-10 | **Open registration is safe:** guests hold no admin capability; every user-owned table enforces `user_id = auth.uid()`; `/admin` returns 403 to guests (pgTAP + E2E) |
| NFR-SEC-11 | Sign-up abuse controls: OAuth-only, disposable-domain blocklist, ban, per-user limits |
| NFR-SEC-12 | Tokens (bundle CLI, owner's CP extension) are admin-only, hashed at rest, scoped, expiring and revocable; guests hold no tokens |

## 5. Privacy (`NFR-PRIV`)

| ID | Requirement |
|---|---|
| NFR-PRIV-01 | No third-party tracking cookies; analytics are cookieless/aggregate |
| NFR-PRIV-02 | Contact messages are kept 12 months, then deleted by a scheduled job; spam after 30 days |
| NFR-PRIV-03 | IP addresses are never stored raw — only `sha256(ip + daily_salt)` for rate limiting and abuse detection |
| NFR-PRIV-04 | A `/privacy` page states what's collected (contact form, aggregate analytics, **accounts, progress, judge handles and solves, extension data**), why, how long, and how to export or delete it |
| NFR-PRIV-05 | The phone number and personal address are not public by default (the CV has them; the site doesn't need them) |
| NFR-PRIV-06 | YouTube embeds load `youtube-nocookie.com`, and only after an explicit click (facade pattern — the reference bundle already does this) |
| NFR-PRIV-07 | **Data minimisation for guests:** only email, display name and avatar from the provider, plus their reading progress. No judge handles or CP data are collected from guests |
| NFR-PRIV-08 | Self-service export (JSON) and deletion; deletion completes ≤ 30 days; sessions and tokens revoked immediately |
| NFR-PRIV-09 | Admin sees guests' reading data only as aggregates; individual views are limited to account metadata needed for moderation |
| NFR-PRIV-10 | Inactive accounts: notice after 24 months, deletion 30 days later (`Q-34`) |

## 6. Reliability & availability (`NFR-REL`)

| ID | Requirement |
|---|---|
| NFR-REL-01 | Availability target 99.5% monthly for public pages (bounded by free-tier SLAs) |
| NFR-REL-02 | If Supabase is down, cached public pages keep serving (stale-while-revalidate); the admin shows a clear "database unavailable" state |
| NFR-REL-03 | If an integration fails, the last good snapshot is shown with its "as of" date; public pages never error because of sync |
| NFR-REL-04 | Backups: nightly logical DB dump + weekly storage manifest export. **RPO ≤ 24 h, RTO ≤ 4 h** ([14 §7](14-devops-and-environments.md)) |
| NFR-REL-05 | The free-tier pause after 7 days of inactivity is prevented by the daily sync (a real API request every day) and monitored by an uptime check |
| NFR-REL-06 | Database migrations are forward-only and backward-compatible for one release (expand → migrate → contract) |
| NFR-REL-07 | **No progress is lost:** failed/offline reader writes are queued in the browser and retried; server writes are idempotent |
| NFR-REL-08 | A judge outage or block affects only that judge: accounts show "failing" with the last snapshot; other judges keep syncing |

## 7. Maintainability (`NFR-MAINT`)

| ID | Requirement |
|---|---|
| NFR-MAINT-01 | TypeScript `strict`; no `any` in app code without a justified `// eslint-disable-next-line` comment |
| NFR-MAINT-02 | DB types generated from the schema (`supabase gen types`) and committed; CI fails if they drift |
| NFR-MAINT-03 | Data access only through `lib/data/*` server modules (marked `server-only`); components never call Supabase directly |
| NFR-MAINT-04 | Every architectural change is recorded as an ADR |
| NFR-MAINT-05 | Unit coverage ≥ 80% for `lib/` (parsers, validators, bundle resolver/injector, judge adapters, problem keys) and the reader runtime; E2E covers every Must user story |
| NFR-MAINT-06 | Content model changes need a migration + seed update + type regeneration in the same PR |

## 8. Compatibility (`NFR-COMP`)

| ID | Requirement |
|---|---|
| NFR-COMP-01 | Browsers: latest 2 versions of Chrome, Edge, Firefox, Safari; iOS Safari 16.4+; Samsung Internet latest |
| NFR-COMP-02 | 3D requires WebGL2; without it (or on low-tier GPUs detected at runtime) the poster is shown |
| NFR-COMP-03 | Works without JavaScript for reading (main-origin content is SSR; bundles as authored); interactive widgets degrade to links. Progress tracking requires JavaScript |
| NFR-COMP-04 | Viewports 320 px → 2560 px; the reading measure is capped (~38–42 rem) on wide screens |

## 9. Scalability & capacity (`NFR-SCALE`)

| Dimension | Year-1 expectation | Headroom plan |
|---|---|---|
| Page views | < 50k/month | CDN caching; almost all traffic is cache hits |
| Registered readers | < 2,000; < 500 active monthly | OAuth-only sign-up; Supabase free tier allows 50k MAU |
| DB size | Up to ~150 MB worst case (guest `reading_progress` dominates, [07 §11](07-database-design.md)) | Free tier 500 MB; upgrade trigger at 350 MB |
| Judge sync | The owner's ~10 accounts; ~20–60 API calls/day | Per-platform budgets and daily staggered runs |
| Storage | Topics ≈ 2.3 MB each → ~150 MB for 66; posts 0.2–3 MB each; media ~200 MB | Free tier 1 GB; content-addressed dedupe; upgrade trigger at 70% |
| Egress | Topics, posts and media served through the Vercel CDN, so Supabase egress stays low; the reader API is small JSON | Monitor monthly; upgrade trigger at 70% |

## 10. Legal & content compliance (`NFR-LEGAL`)

| ID | Requirement |
|---|---|
| NFR-LEGAL-01 | Every third-party image has credit + licence metadata (media library fields), shown in captions — mirroring the reference bundle's `SOURCES.md` practice |
| NFR-LEGAL-02 | Verbatim excerpts from copyrighted books (the bundle `data/` folders) are **private by default** until the owner confirms the right to publish them ([10 §15](10-roadmap-docs-system.md), `Q-14`) |
| NFR-LEGAL-03 | Licence notices: site code (e.g. MIT, if the repo goes public), writing and docs (e.g. CC BY-NC-SA 4.0) — owner decision `Q-15` |
| NFR-LEGAL-04 | Judge data: official/community APIs first; HTML adapters read public profile pages only, at low frequency, respecting `robots.txt`, with per-platform kill switches (`Q-29`) |
| NFR-LEGAL-05 | `/terms` for account use; `/privacy` updated for accounts before guest sign-up goes live |
