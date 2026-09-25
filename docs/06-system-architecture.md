# 06 — System Architecture

> Status: **Draft v0.2** · Related: [07 DB](07-database-design.md), [08 Security](08-auth-and-security.md), [10 Bundles & Docs](10-roadmap-docs-system.md), [13 API](13-api-and-data-flow.md), [14 DevOps](14-devops-and-environments.md), [17 ADRs](17-risks-and-decisions.md), [19 Guests](19-guest-accounts-and-progress.md), [20 CP tracking](20-cp-multi-platform-tracking.md)
>
> **Revision 0.2:** content origin renamed `read.` and extended to blog posts; reader runtime, reader
> API and session bridge; guest accounts; CP worker queue for 10 judges; extension ingestion.

---

## 1. Architecture at a glance

A **single Next.js 16 application** on **Vercel** serves two hosts:

- the **main origin**: portfolio, blog index, docs map, sign-in, reader panel, admin and APIs;
- the **content origin**: HTML bundles for topics and posts, generated pages, reader runtime and
  reader API.

**Supabase** provides Postgres (RLS), Auth (Google + GitHub) and Storage. **pg_cron + pg_net** drive
scheduled work, including a CP sync worker every minute.

### 1.1 System context (C4 level 1)

```mermaid
flowchart LR
  V(["Anonymous visitor"]) --> SITE["eyasir329.dev"]
  V --> READ["read.eyasir329.dev: topics and posts"]
  GU(["Signed-in guest"]) --> SITE
  GU --> READ
  AD(["Admin: owner/editor"]) --> SITE
  CLI(["Bundle CLI"]) --> SITE
  EXT(["Browser extension"]) --> SITE
  SITE --> SB[("Supabase: Postgres, Auth, Storage")]
  READ --> SB
  SB --> IDP["Google / GitHub OAuth"]
  SITE --> GH["GitHub API"]
  SITE --> JUD["10 judges: Codeforces, AtCoder, LeetCode, CodeChef, LightOJ, UVa, SPOJ, CSES, Toph, VJudge"]
  SITE --> CLS["CLIST.by (optional)"]
  SITE --> TS["Turnstile"]
  SITE --> RS["Resend"]
  SITE --> SE["Sentry"]
  SB -- "pg_cron + pg_net" --> SITE
```

### 1.2 Containers (C4 level 2)

```mermaid
flowchart TB
  subgraph Vercel["Vercel project (one deployment)"]
    PX["proxy.ts: host routing, session refresh, role gates, headers"]
    subgraph App["Next.js App Router"]
      PUB["(site) public routes"]
      ME["(me) reader panel"]
      ADM["(admin) routes + Server Actions"]
      API["Route handlers: auth, bridge, cron, workers, bundles, extension, feeds, og"]
      CO["Content-origin handler: bundle files, generated pages, runtime, reader API"]
    end
    CDN["Vercel CDN"]
  end
  subgraph Supabase
    PG[("Postgres: schema, RLS, FTS, pg_cron, pg_net, queue")]
    AU["Auth: Google, GitHub, hooks"]
    ST["Storage: media, resumes, bundle-uploads, bundle-objects"]
  end
  PX --> PUB & ME & ADM & API & CO
  PUB --> PG
  ME --> PG
  ADM --> PG & ST
  API --> PG & ST
  CO --> PG & ST
  AU --> PG
  PG -- "cron, webhooks" --> API
  CDN --- PX
```

## 2. Technology stack

| Layer | Choice | Why | ADR |
|---|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, Cache Components, `proxy.ts`) | RSC, Server Actions, Vercel-native | ADR-001 |
| UI runtime | **React 19** | Required by Next 16 | — |
| Language | **TypeScript** strict | End-to-end types | — |
| Styling | **Tailwind CSS v4** + CSS tokens | Token-driven | ADR-011 |
| Admin UI | **shadcn/ui** (Radix) | Accessible, owned source | ADR-011 |
| 3D | three.js + R3F v9 + drei + detect-gpu | Mandated; progressive enhancement | ADR-008 |
| Motion | Motion, Lenis (3D pages only) | Small, reduced-motion aware | — |
| Data | Supabase Postgres + `@supabase/supabase-js` + `@supabase/ssr`, generated types, SQL migrations | RLS-first, no ORM | ADR-002 |
| Auth | Supabase Auth (Google, GitHub) + hooks; custom reader-session bridge for the content origin | Guests + allowlisted admins in one system | ADR-003, ADR-015 |
| Validation / forms / tables | Zod · React Hook Form · TanStack Table | — | — |
| Site-rendered rich text | Markdown via unified/remark/rehype + Shiki + KaTeX (case studies, bio, write-ups, privacy) | Safe on the main origin | ADR-007 (narrowed) |
| **Author HTML** (topics, posts) | **Bundle engine**: `fflate` (zip), `parse5` (metadata extraction, runtime injection), SHA-256 CAS | Faithful rendering, versioning | ADR-004/005/006/014/020 |
| **HTML editor** | CodeMirror 6 (HTML/CSS/JS), Prettier standalone in a worker | Write posts/topics in admin | ADR-014 |
| **Reader runtime** | Vanilla TS → `runtime.v1.js` (≤ 8 KB gzip), built by esbuild | Runs inside untrusted pages; no framework | ADR-016 |
| **Judge adapters** | TypeScript ports of NEUPC services; `node-html-parser` for HTML adapters | Reuse proven logic | ADR-017, ADR-018 |
| Queue | Postgres table + `FOR UPDATE SKIP LOCKED`, pg_cron worker | No extra service | ADR-019 |
| Search | Postgres FTS + `pg_trgm` | No extra service | ADR-009 |
| Charts | Server-rendered SVG + small client tooltips | Tiny, accessible | — |
| Email · bot protection · analytics · errors | Resend · Turnstile · Vercel Analytics/Speed Insights · Sentry | Free tiers | — |
| Scheduling | pg_cron + pg_net (primary), Vercel Cron (daily backup) | Hobby cron limit | ADR-010 |
| Tooling | pnpm, ESLint + Prettier, Vitest, Playwright, axe, Lighthouse CI, pgTAP | — | — |
| Hosting | Vercel (Hobby at launch) | — | — |

## 3. Rendering & caching

| Surface | Strategy | Invalidation |
|---|---|---|
| Public main-origin pages | Prerendered shell + `"use cache"` loaders with tags | `updateTag` in actions; `revalidateTag` from jobs |
| `/docs/[roadmap]` progress dots | Dynamic hole (per user) inside a cached page | n/a (no-store) |
| `/me/**`, `/admin/**` | Dynamic, never cached | n/a |
| Content-origin HTML and files | Same bytes for every visitor (runtime block is identical for all) → CDN cached; `Vercel-Cache-Tag: content:{subjectId}` | `invalidateByTag` on publish/rollback |
| Reader API (`/__api/*`) | `private, no-store` | n/a |
| Feeds, sitemaps, OG | Cached with content tags | Same tags |

**Tag catalogue** (`lib/cache/tags.ts`): `settings`, `profile`, `projects`, `project:{id}`,
`experiences`, `education`, `skills`, `certifications`, `cp` (owner's public CP data), `github`,
`posts`, `post:{id}`, `docs`, `docs:{roadmapId}`, `resume`, `redirects`; CDN tags
`content:{subjectId}`.

## 4. Layered code architecture

```mermaid
flowchart TB
  UI["app/: routes (site, me, admin), client islands"] --> ACT["Server Actions / route handlers: authn, authz, Zod, audit"]
  UI --> DATA
  ACT --> SVC["lib/services: use-cases"]
  SVC --> DATA["lib/data: typed queries + cached loaders (server-only)"]
  SVC --> BUN["lib/bundles: unzip, validate, extract, CAS, inject, serve, generate"]
  SVC --> RDR["lib/reader: sessions, bridge, progress, verification"]
  SVC --> CPX["lib/cp: adapters, problem keys, queue worker, extension ingest"]
  SVC --> INT["lib/integrations: GitHub, Resend, Turnstile"]
  DATA & BUN & RDR & CPX --> SBC["lib/supabase: server, browser, admin clients"]
  RT["runtime/ (separate build): reader runtime for the content origin"]
```

Rules: `lib/data`, `lib/services`, `lib/bundles`, `lib/reader`, `lib/cp` are `server-only`. The
secret-key client is used only in services for cron/workers, contact, bundle serving, reader-API
writes (after session validation) and extension ingestion (after token validation).

## 5. Host routing (`proxy.ts`)

```mermaid
flowchart TD
  R["Request"] --> H{"Host"}
  H -- "www.*" --> WW["308 to apex"]
  H -- "read.*" --> K["Rewrite to /_content/…, content-origin headers, no Supabase session work"]
  H -- "apex" --> A{"Path"}
  A -- "/admin/**" --> S["Refresh session, require owner/editor, else login or 403"]
  A -- "/me/**" --> G["Refresh session, require any user, else /login?return="]
  A -- "other" --> P["Refresh session if cookies exist (header avatar), security headers, redirects lookup"]
```

`/_content/*` is reachable only through the content host (404 on the apex).

## 6. Key sequences

### 6.1 Public page request

Unchanged from revision 0.1: CDN hit, or render with cached loaders under RLS.

### 6.2 Admin edits content

`requireRole` → Zod → upsert under RLS → audit trigger → `updateTag` → typed result.

### 6.3 Content-origin request (topic or post)

```mermaid
sequenceDiagram
  participant B as Reader
  participant C as Vercel CDN
  participant K as Content-origin handler
  participant D as Postgres
  participant S as Storage
  B->>C: GET read…/docs/cp/phase-1/1_basics/3_std_vector/
  alt CDN hit
    C-->>B: 200 (stored bytes + runtime block)
  else miss
    C->>K: forward
    K->>D: resolve subject + published manifest (cached by version id)
    K->>S: object by sha256
    K->>K: inject runtime block before </head>
    K-->>C: 200 + headers + cache tag
    C-->>B: 200
  end
  B->>K: GET /__rt/runtime.v1.js (immutable)
  B->>K: GET /__api/progress?node=… (reader session, no-store)
  K->>D: select own progress (validated session → user_id)
  K-->>B: progress JSON → runtime applies it
```

### 6.4 Guest sign-in from the content origin

See [19 §2.2](19-guest-accounts-and-progress.md) (main-origin OAuth → one-time code → reader
session).

### 6.5 Scheduled and queued sync

```mermaid
sequenceDiagram
  participant Cron as pg_cron
  participant W as /api/cron/cp-worker
  participant DB as Postgres
  participant J as Judge APIs / pages
  Cron->>W: every minute (Bearer CRON_SECRET)
  loop until 50 s budget used
    W->>DB: claim_cp_jobs(n) FOR UPDATE SKIP LOCKED
    W->>DB: platform budget ok? (next_allowed_at)
    W->>J: adapter calls (incremental cursor)
    J-->>W: data
    W->>DB: upsert accounts, solves, ratings, activity, verify_practice(user)
    W->>DB: job done / re-queue with backoff
  end
  W->>W: revalidateTag('cp') if any public (owner) account changed
```

### 6.6 Bundle import & publish

[10 §6.2](10-roadmap-docs-system.md).

## 7. Repository layout (planned)

```text
/
├─ app/
│  ├─ (site)/            # public portfolio, blog index, docs catalog/map, login
│  ├─ (me)/me/           # reader panel
│  ├─ (admin)/admin/     # admin panel (HTML editor under blog/, docs/, templates/)
│  ├─ _content/[...path]/route.ts   # content-origin handler (files, generated pages, /__api, /__auth, /__rt)
│  ├─ auth/{callback,bridge,signout}/route.ts
│  ├─ api/{cron,revalidate,bundles,cp/ext,problem-solving,views,health}/…
│  ├─ blog/[slug]/route.ts          # 308 to the content origin
│  ├─ og/[type]/[id]/route.tsx  feed.xml/  sitemap.ts  robots.ts
├─ components/{ui,site,me,admin,three,prose,editor}/
├─ lib/{supabase,auth,data,services,bundles,reader,cp,integrations,markdown,cache,seo,validation,security}/
├─ runtime/                          # reader runtime source (vanilla TS) → public/__rt/runtime.v1.js
├─ proxy.ts
├─ supabase/{config.toml,migrations/,seed.sql,tests/}
├─ scripts/{bundle-cli/,build-scene-layouts.ts,render-posters.ts}
├─ public/{3d,posters}/
├─ tests/{unit,e2e,fixtures/{bundles,judges,markdown}}/
└─ docs/
```

## 8. Cross-cutting concerns

| Concern | Approach |
|---|---|
| Configuration | Typed env (`lib/env.ts`); fail fast |
| Feature flags | `site_settings.flags` + per-platform `cp_platforms.enabled`/`scraping_enabled` |
| Logging | Structured logs; secrets, emails and tokens redacted; judge responses never logged in full |
| Errors | Segment error boundaries; typed action errors; Sentry with digests |
| Time | UTC storage; display in the viewer's timezone (`/me`), `Asia/Dhaka` for owner pages |
| Privacy by design | Guest data behind RLS; aggregates for admin; export/delete built in from day one |
