# 00 — Project Charter

> Status: **Draft v0.3** · Owner: Eyasir Ahamed · Related: [01 PRD](01-product-requirements.md), [16 Delivery plan](16-delivery-plan.md), [17 Risks](17-risks-and-decisions.md), [CHANGELOG](CHANGELOG.md)

---

## 1. Vision

> **One home for everything Eyasir builds, solves and teaches. It should read like a well-made book,
> feel like walking through a quiet gallery, stay current without redeploying, and give learners a
> place to track their own journey.**

The site should make four things obvious:

1. **Builder.** Production-grade full-stack work (NEUPC, Joborx, …) with honest case studies.
2. **Problem solver.** A measurable competitive-programming record across 10 judges
   (1000+ problems, ICPC 2025 Asia Dhaka Regional: 112th overall, Mymensingh Divisional Champion).
3. **Teacher.** Public roadmap documentation and HTML-crafted blog posts, in the rigorous format of
   the `3_std_vector` reference topic.
4. **Companion for learners.** Readers who sign in can track their roadmap progress in one private
   panel.

## 2. Problem statement

| Today | Consequence |
|---|---|
| Credentials are spread across a PDF CV, GitHub, Codeforces, LinkedIn, NEUPC and Discord | A recruiter has to open 4–6 tabs, and most won't |
| CV stats go stale as soon as it's printed | Numbers under-sell current ability |
| Roadmap topics exist only as local HTML bundles | No public home, no navigation, no discoverability |
| Writing that needs interactivity (demos, measured charts) doesn't fit a Markdown blog | Posts would lose what makes the topic pages good |
| Learners (club members, juniors) have no way to keep their progress through the roadmap across devices | Motivation and continuity suffer |
| A static site needs a code change and a redeploy for each edit | Content rots because updating it has friction |

## 3. Goals and success metrics

| ID | Goal | KPI (measured how) | Target (6 months post-launch) |
|---|---|---|---|
| `G-01` | **Recruiter clarity** | Clicks from landing to CV download or first project | ≤ 2 clicks; median ≤ 30 s |
| `G-02` | **Credibility through live data** | Age of newest successful sync per owner account | ≤ 48 h (API judges); "needs extension" judges shown honestly |
| `G-03` | **Knowledge sharing** | Published topics and posts; monthly readers on the content origin | ≥ 1 roadmap + ≥ 1 post at launch; steady growth |
| `G-04` | **Zero-code maintenance** | Content changes that needed a code deploy | 0 |
| `G-05` | **Distinctive but fast** | Lighthouse (mobile) and field Core Web Vitals | Content pages Perf ≥ 95, 3D pages ≥ 90; LCP p75 ≤ 2.0 s / 2.5 s |
| `G-06` | **Low running cost** | Monthly bill | $0 at launch; documented upgrade triggers ([14 §9](14-devops-and-environments.md)) |
| `G-07` | **Accessible to everyone** | axe violations; manual audit | 0 serious/critical; WCAG 2.2 AA |
| `G-08` | **Learner engagement** | Registered readers; weekly active readers; topics completed | Trend upwards month over month |
| `G-09` | **Trustworthy with personal data** | Privacy incidents; export/delete requests fulfilled on time | 0 incidents; 100% within 30 days |

## 4. Scope

### 4.1 In scope (v1 launch)

- Public portfolio: Home, About, Projects, Experience, CP Journey (the owner's 10 judge accounts synced), Contact, Resume.
- **Content origin** (`read.eyasir329.dev`) serving **HTML bundles**: roadmap topics under
  `/docs/…` and **blog posts under `/blog/…`**, rendered exactly as authored. It also serves
  generated roadmap pages and hosts the reader runtime.
- **HTML blog:** posts authored as full HTML (in-admin HTML editor with templates and live
  preview, or zip/CLI upload), versioned and schedulable; main-site index, tags, series and feeds.
- **Guest accounts** (Google/GitHub sign-in) and a **reader panel** (`/me`). **Roadmap progress is
  saved only for signed-in readers**; anonymous readers can read everything but not track progress.
- **The owner's CP tracking** on Codeforces, AtCoder, LeetCode, CodeChef, LightOJ, UVa, SPOJ, CSES,
  Toph and VJudge (API first; the owner's browser extension where judges don't expose solved
  lists) for the public CP Journey page.
- Classical-minimal design system, light/dark themes, Three.js scenes with fallbacks.
- Supabase (Postgres + RLS, Auth, Storage, cron), admin panel for everything (including users and
  reader analytics), SEO, analytics, monitoring and backups.

### 4.2 Out of scope for v1

| Item | Why not now | Revisit |
|---|---|---|
| **Learner CP tracking** (guests linking judge handles, CP dashboards, auto-verified practice) | Declined by the owner in revision 0.3 | — |
| Public learner profiles, leaderboards | Not needed without learner CP tracking | — |
| Reader notes/bookmarks | Nice, but not requested | v2 |
| Comments | Moderation load; Giscus can be added inside the post template later | v1.1 (Could) |
| Newsletter | Double opt-in and compliance work | v2 |
| Bengali localisation | Doubles content effort | v2 |
| Email/password or magic-link sign-in | Google + GitHub cover the audience | v1.1 (Could) |
| Multi-author blog, paid content, mobile app | Not a goal | — |
| Building a new browser extension from scratch | The owner reuses the NEUPC extension ([20 §7](20-cp-multi-platform-tracking.md)) | — |

## 5. Stakeholders and audiences

| Who | Role | Interest |
|---|---|---|
| **Eyasir Ahamed** | Product owner, developer, sole admin (`owner`) | Approves scope; maintains content |
| Recruiters and hiring managers | Primary audience (`P-01`) | Fast proof of fit |
| Senior engineers and interviewers | Primary audience (`P-02`) | Depth: architecture, code, writing |
| CP learners (NEUPC members, juniors, peers) | Primary audience for Docs; **registered guests** (`P-03`) | Structured roadmap, saved progress |
| Contest organisers and collaborators | Secondary (`P-05`) | Contact, credibility |
| Optional future editor | `editor` role | Content help |

## 6. Constraints

| # | Constraint |
|---|---|
| C-1 | Next.js + Three.js + modern tooling |
| C-2 | Supabase as the database (also Auth and Storage) |
| C-3 | Google login (admin); guests use the same sign-in system |
| C-4 | Unique, classical, minimal design with proper 3D |
| C-5 | Docs render **full HTML** topic pages in the reference format, organised as a public roadmap |
| C-6 | **Blog posts are written in HTML and rendered in full** |
| C-7 | **Progress tracking only for signed-in readers**; anonymous = read-only |
| C-8 | The owner's CP progress on the 10 listed judges (public CP Journey). **No CP tracking for learners** (revision 0.3) |
| C-9 | Solo maintainer, near-zero budget at launch |
| C-10 | Planning is audited by hand before any code is written or run |

## 7. Assumptions

| ID | Assumption | If false |
|---|---|---|
| `A-01` | A custom domain will be bought | `*.vercel.app` aliases still isolate origins |
| `A-02` | Topic bundles keep the reference structure | Extraction fallbacks + optional `kb.json` |
| `A-03` | Traffic < 50k page views/month in year 1 | Upgrade triggers |
| `A-04` | One primary admin | Roles support more |
| `A-05` | **Year-1 registered readers < 2,000, of whom < 500 active monthly** | Database sizing is reviewed ([07 §11](07-database-design.md)) |
| `A-06` | The owner supplies missing content | Sections hide when empty |
| `A-07` | **Judges keep today's public endpoints** (as used by NEUPC in July 2026); scraping-based ones may break | Adapters degrade to "needs extension"; per-platform flags |
| `A-08` | **The owner's NEUPC extension can be pointed at this site** (configurable API URL + compatible endpoints) | Fork a slim extension, or show profile-level stats only for those judges |

## 8. External dependencies

Google Cloud OAuth client · **GitHub OAuth app** (guest sign-in) · Supabase projects (staging +
production) · Vercel · domain/DNS · GitHub token (owner stats) · Cloudflare Turnstile · Resend ·
Sentry · judge endpoints ([20 §2](20-cp-multi-platform-tracking.md)) · optional CLIST.by API key.

## 9. High-level milestones

| Milestone | Content | Exit criterion |
|---|---|---|
| **M0 Plan approved** | This document set (rev 0.2) | Signed off in [21](21-audit-checklist.md) |
| **M1 Foundations** | Scaffold, CI, Supabase, auth with roles (owner/editor/guest), tokens, shells | Admin reaches `/admin`; a non-allowlisted account becomes a guest and gets 403 on `/admin` |
| **M2 Portfolio core** | Profile, projects, experience, education, skills, contact, resume | All CV content visible and editable |
| **M3 Bundle engine & Docs** | Content origin, importer, versions, generated pages, CLI | `3_std_vector` served faithfully with working links |
| **M4 HTML blog** | Editor, templates, scheduling, index/feeds | First post published from the editor |
| **M5 Reader accounts & progress** | Session bridge, runtime, `/me`, analytics | Anonymous read-only; signed-in progress syncs across devices |
| **M6 Owner CP tracking** | 10 adapters, per-platform scheduled runs, owner extension ingestion, public CP page | The public CP page shows correct data for every API judge |
| **M7 3D & polish** | Scenes, motion, fallbacks | 3D budgets met |
| **M8 Launch** | SEO, a11y, security, performance, privacy, content | Launch checklist green |

Details: [16 — Delivery plan](16-delivery-plan.md).

## 10. Approval

| Role | Name | Decision | Date |
|---|---|---|---|
| Product owner | Eyasir Ahamed | ☐ Approved ☐ Changes requested | |
