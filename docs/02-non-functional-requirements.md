# 02 — Non-Functional Requirements

> Status: **Draft v0.1** · Related: [05 3D](05-3d-experience.md), [08 Security](08-auth-and-security.md), [14 DevOps](14-devops-and-environments.md), [15 QA](15-testing-and-qa.md)

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
| NFR-PERF-11 | Content origin | Bundles are served as stored (no transformation) with CDN caching; a republish reaches readers ≤ 60 s after publish | Synthetic test after publish (T-KB-20) |
| NFR-PERF-12 | Admin responsiveness | List views ≤ 1 s for 1,000 rows (server pagination); saves ≤ 1 s round-trip | Manual timing in UAT |

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
| NFR-A11Y-11 | Uploaded KB bundles are the author's responsibility, but the importer reports basic a11y lint warnings (missing `lang`, images without `alt`, missing `<title>`) |

## 3. SEO & discoverability (`NFR-SEO`)

| ID | Requirement |
|---|---|
| NFR-SEO-01 | All public content is server-rendered HTML (RSC/static); no content depends on client JS to appear |
| NFR-SEO-02 | Clean, stable, lowercase, hyphenated URLs; slug changes create 308 redirects |
| NFR-SEO-03 | Canonical URLs: main site on the apex domain (`www` → apex 308); KB topics canonical on the content origin, with directory URLs ending in `/` |
| NFR-SEO-04 | Drafts, previews, admin, API and "coming soon" pages are `noindex` (header **and** meta where applicable) |
| NFR-SEO-05 | Structured data validates in Google's Rich Results Test with no errors |
| NFR-SEO-06 | Sitemaps regenerate on publish (cache tag invalidation) and include `lastmod` |

## 4. Security (`NFR-SEC`) — full design in [08](08-auth-and-security.md)

| ID | Requirement |
|---|---|
| NFR-SEC-01 | RLS enabled on **every** table in exposed schemas; default deny; policies tested by automated tests |
| NFR-SEC-02 | Privileged Supabase secret key used only server-side, never in a `NEXT_PUBLIC_*` variable or client bundle (CI grep check) |
| NFR-SEC-03 | Admin authorisation checked in four layers: proxy, admin layout, every server action/route handler, and RLS |
| NFR-SEC-04 | Uploaded HTML bundles execute only on the isolated content origin, which never receives admin cookies |
| NFR-SEC-05 | Security headers on every response: HSTS (preload-ready), CSP (per host), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, mic, geolocation off), `frame-ancestors` |
| NFR-SEC-06 | All inputs validated server-side with Zod; Markdown rendered without raw HTML; filenames and paths normalised; zip-slip and zip-bomb protection |
| NFR-SEC-07 | Rate limits: contact form 5/h/IP; login attempts follow Supabase defaults; CLI API 60 req/min/token |
| NFR-SEC-08 | Dependencies: automated update PRs (Renovate/Dependabot), `pnpm audit` in CI (fail on high/critical), lockfile committed |
| NFR-SEC-09 | Secrets rotated on suspicion of leak and at least yearly; rotation runbook in [14 §8](14-devops-and-environments.md) |

## 5. Privacy (`NFR-PRIV`)

| ID | Requirement |
|---|---|
| NFR-PRIV-01 | No third-party tracking cookies; analytics are cookieless/aggregate |
| NFR-PRIV-02 | Contact messages are kept 12 months, then deleted by a scheduled job; spam after 30 days |
| NFR-PRIV-03 | IP addresses are never stored raw — only `sha256(ip + daily_salt)` for rate limiting and abuse detection |
| NFR-PRIV-04 | A `/privacy` page states what's collected (contact form, aggregate analytics), why, how long, and how to request deletion |
| NFR-PRIV-05 | The phone number and personal address are not public by default (the CV has them; the site doesn't need them) |
| NFR-PRIV-06 | YouTube embeds load `youtube-nocookie.com`, and only after an explicit click (facade pattern — the reference bundle already does this) |

## 6. Reliability & availability (`NFR-REL`)

| ID | Requirement |
|---|---|
| NFR-REL-01 | Availability target 99.5% monthly for public pages (bounded by free-tier SLAs) |
| NFR-REL-02 | If Supabase is down, cached public pages keep serving (stale-while-revalidate); the admin shows a clear "database unavailable" state |
| NFR-REL-03 | If an integration fails, the last good snapshot is shown with its "as of" date; public pages never error because of sync |
| NFR-REL-04 | Backups: nightly logical DB dump + weekly storage manifest export. **RPO ≤ 24 h, RTO ≤ 4 h** ([14 §7](14-devops-and-environments.md)) |
| NFR-REL-05 | The free-tier pause after 7 days of inactivity is prevented by the daily sync (a real API request every day) and monitored by an uptime check |
| NFR-REL-06 | Database migrations are forward-only and backward-compatible for one release (expand → migrate → contract) |

## 7. Maintainability (`NFR-MAINT`)

| ID | Requirement |
|---|---|
| NFR-MAINT-01 | TypeScript `strict`; no `any` in app code without a justified `// eslint-disable-next-line` comment |
| NFR-MAINT-02 | DB types generated from the schema (`supabase gen types`) and committed; CI fails if they drift |
| NFR-MAINT-03 | Data access only through `lib/data/*` server modules (marked `server-only`); components never call Supabase directly |
| NFR-MAINT-04 | Every architectural change is recorded as an ADR |
| NFR-MAINT-05 | Unit coverage ≥ 80% for `lib/` (parsers, validators, KB resolver, sync mappers); E2E covers every Must user story |
| NFR-MAINT-06 | Content model changes need a migration + seed update + type regeneration in the same PR |

## 8. Compatibility (`NFR-COMP`)

| ID | Requirement |
|---|---|
| NFR-COMP-01 | Browsers: latest 2 versions of Chrome, Edge, Firefox, Safari; iOS Safari 16.4+; Samsung Internet latest |
| NFR-COMP-02 | 3D requires WebGL2; without it (or on low-tier GPUs detected at runtime) the poster is shown |
| NFR-COMP-03 | Works without JavaScript for reading (all content is SSR); interactive widgets degrade to links |
| NFR-COMP-04 | Viewports 320 px → 2560 px; the reading measure is capped (~38–42 rem) on wide screens |

## 9. Scalability & capacity (`NFR-SCALE`)

| Dimension | Year-1 expectation | Headroom plan |
|---|---|---|
| Page views | < 50k/month | CDN caching; almost all traffic is cache hits |
| DB size | < 100 MB (CP submissions are the largest table) | Free tier 500 MB; aggregate old submissions if needed |
| Storage | KB ≈ 2.3 MB/topic unzipped → ~150 MB for 66 topics; media ~200 MB | Free tier 1 GB; content-addressed dedupe; upgrade trigger at 70% |
| Egress | KB and media served through Vercel CDN, so Supabase egress stays low | Monitor monthly; upgrade trigger at 70% |

## 10. Legal & content compliance (`NFR-LEGAL`)

| ID | Requirement |
|---|---|
| NFR-LEGAL-01 | Every third-party image has credit + licence metadata (media library fields), shown in captions — mirroring the reference bundle's `SOURCES.md` practice |
| NFR-LEGAL-02 | Verbatim excerpts from copyrighted books (the bundle `data/` folders) are **private by default** until the owner confirms the right to publish them ([10 §15](10-roadmap-docs-system.md), `Q-14`) |
| NFR-LEGAL-03 | Licence notices: site code (e.g. MIT, if the repo goes public), writing and docs (e.g. CC BY-NC-SA 4.0) — owner decision `Q-15` |
