# 00 — Project Charter

> Status: **Draft v0.1** · Owner: Eyasir Ahamed · Related: [01 PRD](01-product-requirements.md), [16 Delivery plan](16-delivery-plan.md), [17 Risks](17-risks-and-decisions.md)

---

## 1. Vision

> **One home for everything Eyasir builds, solves and teaches. It should read like a well-made book,
> feel like walking through a quiet gallery, and stay current without redeploying.**

The site should make three things obvious within seconds:

1. **Builder.** Production-grade full-stack work (NEUPC, Joborx, …) with honest case studies.
2. **Problem solver.** A measurable competitive-programming record (1000+ problems, ICPC 2025 Asia
   Dhaka Regional: 112th overall, Mymensingh Divisional Champion).
3. **Teacher.** Public roadmap documentation that other programmers can learn from, in the same
   rigorous format as the `3_std_vector` reference topic.

## 2. Problem statement

| Today | Consequence |
|---|---|
| Credentials are spread across a PDF CV, GitHub, Codeforces, LinkedIn, NEUPC and Discord | A recruiter has to open 4–6 tabs, and most won't |
| Stats in the CV (rating, problem counts) go stale as soon as it's printed | Numbers under-sell current ability |
| The roadmap topics (e.g. `std::vector`) exist as local HTML bundles | No public home, no navigation between topics, nobody can find them |
| There's no place for long-form technical writing | No way to show depth of thinking beyond bullet points |
| Any static site needs a code change and a redeploy for each edit | Content rots because updating it has friction |

## 3. Goals and success metrics

| ID | Goal | KPI (measured how) | Target (6 months post-launch) |
|---|---|---|---|
| `G-01` | **Recruiter clarity.** Role, stack, best work and CV reachable fast | Clicks from landing to CV download or first project (analytics funnels) | ≤ 2 clicks; median ≤ 30 s |
| `G-02` | **Credibility through live data** | Age of newest successful sync (admin dashboard) | Stats never older than 48 h |
| `G-03` | **Knowledge sharing** via Roadmap Docs | Published topics; monthly KB visitors; share of sessions that reach the last section | ≥ 1 roadmap live at launch; steady growth after |
| `G-04` | **Zero-code maintenance** | Content changes that needed a code deploy | 0 (every public text, image, number and link is editable in admin) |
| `G-05` | **Distinctive but fast** classical-minimal design with real 3D | Lighthouse (mobile) and field Core Web Vitals | Content pages Perf ≥ 95, 3D pages ≥ 90; LCP p75 ≤ 2.0 s (content) / 2.5 s (3D) |
| `G-06` | **Low running cost** | Monthly bill | $0 at launch on free tiers; upgrade only on a documented trigger (see [14 §9](14-devops-and-environments.md)) |
| `G-07` | **Accessible to everyone** | axe violations; manual keyboard/screen-reader pass | 0 serious/critical violations; WCAG 2.2 AA |

## 4. Scope

### 4.1 In scope (v1 launch)

- Public portfolio: Home, About, Projects (+ case studies), Experience, CP Journey, Blog, Docs catalog
  and roadmap views, Contact, Resume download.
- Roadmap Docs **content origin** that serves uploaded HTML topic bundles unmodified, with generated
  index and "coming soon" pages, versioning, preview, publish and rollback.
- Classical-minimal design system, light/dark themes, and four Three.js scenes (hero, CP colonnade,
  project exhibit, 404), all with non-3D fallbacks.
- Supabase: Postgres schema with RLS, Google OAuth, Storage buckets, scheduled jobs.
- Admin panel behind Google login, restricted to allowlisted emails: CRUD for all content, media
  library, Markdown editor with live preview, bundle importer (single and bulk) plus CLI, sync
  centre, messages inbox, settings, audit log.
- Daily sync from GitHub and Codeforces. Adapters are built so other judges can be added later.
- SEO (metadata, JSON-LD, sitemaps, RSS, dynamic OG images), privacy-friendly analytics, error
  monitoring, backups.

### 4.2 Out of scope for v1 (Won't; candidates for later)

| Item | Why not now | Revisit |
|---|---|---|
| Visitor accounts (sign-in for readers, synced KB progress) | Adds a whole auth surface. The KB already tracks progress in the browser | v2 |
| Comments on posts | Moderation load; Giscus (GitHub Discussions) is a cheap later option | v1.1 (Could) |
| Newsletter | Needs a list, double opt-in and compliance work | v2 |
| Bengali (বাংলা) localisation | Doubles content effort | v2 |
| Writing KB topics inside admin (Markdown → KB template) | v1 imports bundles made by the existing generator | v1.1 |
| Multi-author blog, e-commerce, paid content, mobile app | Not a goal | — |
| Generating the PDF CV from the database | The LaTeX CV stays the source of truth for print | v2 (Could) |

## 5. Stakeholders and audiences

| Who | Role | Interest |
|---|---|---|
| **Eyasir Ahamed** | Product owner, developer, sole admin (`owner` role) | Approves scope; maintains content |
| Recruiters and hiring managers | Primary audience (`P-01`) | Fast proof of fit: stack, projects, CV |
| Senior engineers and interviewers | Primary audience (`P-02`) | Depth: architecture, code, writing |
| CP learners (NEUPC members, juniors, peers) | Primary audience for Docs (`P-03`) | Structured roadmap, readable on phone |
| Contest organisers and collaborators | Secondary (`P-05`) | Contact, credibility |
| Optional future editor | `editor` role | Help keep content fresh (cannot manage admins) |

## 6. Constraints (fixed by the owner)

| # | Constraint |
|---|---|
| C-1 | Frontend: **Next.js**. 3D: **Three.js**. Plus other modern tooling as needed |
| C-2 | Database: **Supabase** (Postgres). Auth and Storage also on Supabase |
| C-3 | Admin sign-in: **Google login** |
| C-4 | Design: **unique, classical, minimalistic**, with **proper 3D** |
| C-5 | Docs must render **full HTML topic pages** in the format of the `3_std_vector` reference bundle, organised as a public roadmap |
| C-6 | Solo maintainer, near-zero budget at launch |
| C-7 | Planning is audited by hand **before** any code is written or run |

## 7. Assumptions

| ID | Assumption | If false |
|---|---|---|
| `A-01` | The owner will buy (or already has) a custom domain | Use `*.vercel.app` aliases; the KB isolation still works because `vercel.app` is on the Public Suffix List (see [08 §6](08-auth-and-security.md)) |
| `A-02` | Topic bundles keep the reference structure (`index.html` + `assets/` + optional `data/`) | Extend the metadata extractor; an optional `kb.json` manifest removes the guesswork ([10 §5](10-roadmap-docs-system.md)) |
| `A-03` | Traffic is modest (< 50k page views/month in year 1) | Upgrade triggers in [14 §9](14-devops-and-environments.md) |
| `A-04` | One primary admin; at most one additional editor | RLS and roles already support more |
| `A-05` | Codeforces is the primary rated judge; others are shown from manual entries until an adapter exists | — |
| `A-06` | The owner supplies missing content: photos, screenshots, dates, contest details ([18](18-content-inventory.md)) | Launch with placeholders hidden behind "show only if filled" rules |

## 8. External dependencies

Google Cloud OAuth client · Supabase projects (staging + production) · Vercel project · Domain and DNS ·
GitHub fine-grained token (read-only) · Cloudflare Turnstile keys · Resend (transactional email) ·
Sentry (errors). All are free tier at launch. Setup steps are in [14](14-devops-and-environments.md).

## 9. High-level milestones

| Milestone | Content | Exit criterion |
|---|---|---|
| **M0 Plan approved** | This document set | Every doc signed off in [19](19-audit-checklist.md); open questions answered |
| **M1 Foundations** | Scaffold, CI, Supabase, auth, design tokens, admin shell | Admin can sign in on preview; unauthorised Google accounts are refused |
| **M2 Portfolio core** | Profile, projects, experience, education, skills, contact, resume | All CV content visible and editable |
| **M3 CP & integrations** | CP Journey, GitHub/Codeforces sync | Stats refresh daily with no manual step |
| **M4 Blog** | Editor, renderer, feeds, OG | First post published from admin |
| **M5 Roadmap Docs** | Content origin, importer, versions, generated pages, CLI | `3_std_vector` served byte-identical with working relative links |
| **M6 3D & polish** | Scenes, motion, fallbacks | Budgets in [02](02-non-functional-requirements.md) met |
| **M7 Launch** | SEO, a11y, security and performance audits, content entry | Launch checklist in [15 §9](15-testing-and-qa.md) all green |

Detailed estimates and sequencing: [16 — Delivery plan](16-delivery-plan.md).

## 10. Approval

| Role | Name | Decision | Date |
|---|---|---|---|
| Product owner | Eyasir Ahamed | ☐ Approved ☐ Changes requested | |
