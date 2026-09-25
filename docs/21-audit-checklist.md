# 21 — Audit Checklist, Open Questions & Sign-off

> Status: **Awaiting owner audit (revision 0.4)** · This is the gate between planning (P0) and
> building (P1). Nothing is implemented until this page is signed. What changed across revisions:
> [CHANGELOG](CHANGELOG.md).

---

## 1. How to audit

1. Read in the order given in [README §1](README.md). If you already audited 0.1, read the
   [CHANGELOG](CHANGELOG.md) first, then docs **10, 19, 20** in full, and the "Revision 0.2" notes at
   the top of every other document.
2. Tick ✅ / ✎ / ❌ per document in §2; comment inline as `> **Audit (Eyasir):** …`.
3. Answer the questions in §3. **Every question has a recommended default**, used if left blank.
4. Sign. Later changes go through PRs that update the docs and ADRs ([README §4](README.md)).

## 2. Sign-off sheet

| # | Document | Decision | Comments |
|--:|---|---|---|
| 00 | Project charter | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 01 | Product requirements | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 02 | Non-functional requirements | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 03 | Information architecture | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 04 | Design system | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 05 | 3D experience | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 06 | System architecture | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 07 | Database design | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 08 | Auth & security | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 09 | Admin panel | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 10 | Content origin, bundle engine & Roadmap Docs | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 11 | Content modules (incl. HTML blog) | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 12 | Integrations & sync | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 13 | API & data flow | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 14 | DevOps & environments | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 15 | Testing & QA | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 16 | Delivery plan | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 17 | Risks & ADRs | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 18 | Content inventory | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 19 | Guest accounts, reader panel & progress | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 20 | CP tracking (owner, 10 judges) | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX | UI/UX design documentation ([ux/](ux/README.md), UX-00…UX-09; detailed per-document sheet in [UX-09 §7](ux/ux-09-ux-audit.md)) | ☐ ✅ ☐ ✎ ☐ ❌ | |

**Final approval:** ☐ Approved to start Phase 1 · Name: ____________ · Date: ____________

## 3. Decisions only the owner can make

Questions marked **(new)** or **(changed)** come from revisions 0.2/0.3; Q-37…Q-42 **(UX)** come from
the UX audit in revision 0.4 ([UX-09 §5](ux/ux-09-ux-audit.md)).

| ID | Question | Options | Recommended default | Answer |
|---|---|---|---|---|
| Q-01 | Domain name? | `eyasir329.dev`, `eyasir.dev`, `eyasirahamed.com`, `*.vercel.app` for now | A `.dev` domain | |
| Q-02 | Admin Google account(s) + a backup owner? | — | `eyasir329@gmail.com` + one backup | |
| Q-03 | Show the email publicly? | yes / form only | Yes + form | |
| Q-04 **(changed)** | Content-origin subdomain (hosts **docs and blog posts**) | `read.` / `kb.` / `library.` / `learn.` | `read.` ("reading room") | |
| Q-05 | Navigation labels | — | Work · Experience · CP · Blog · Docs · About | |
| Q-06 | Typefaces | Newsreader + Geist + Geist Mono / EB Garamond + Inter + JetBrains Mono | Newsreader + Geist + Geist Mono | |
| Q-07 | Accent colour | Oxblood / Lapis | Oxblood | |
| Q-08 | Projects: NEUPC status, Joborx links, third featured project | — | NEUPC maintained; Joborx no public link yet; Tourmate featured | |
| Q-09 **(changed)** | Port NEUPC's judge adapters (and reuse its extension) into this site? | port / write from scratch | **Port** (proven code; one extension for both projects) | |
| Q-10 | Exact IUPC ranks/dates/teams | — | Provide what you have; hide the rest | |
| Q-11 | Final CGPA and graduation wording | — | Update to "CSE graduate" | |
| Q-12 | Internships/freelance entries? Certificate links? | — | Leadership only if none | |
| Q-13 | Full roadmap outline (topics, serials, folder names) | — | Provide the outline YAML | |
| Q-14 | Publish `data/` verbatim book excerpts? | private / public | **Private** | |
| Q-15 | Licences | — | Text CC BY-NC-SA 4.0; code MIT | |
| Q-16 | Serve `assets/src/` originals? | serve / private / strip | Private | |
| Q-17 | YouTube thumbnails: local or hotlink? | local / hotlink | Local | |
| Q-18 | Name teammates on contests? | names / team only | Team only unless they agree | |
| Q-19 **(changed)** | Delivery ordering ([16 §1](16-delivery-plan.md)) | A complete / B readers first / C portfolio first | **B: readers first** (v1 ≈ 21 weeks; owner CP tracking and 3D as v1.1) | |
| Q-20 **(changed)** | Blog at launch? | ≥ 1 HTML post at launch / enable later | ≥ 1 post (the editor makes it cheap) | |
| Q-21 | Comments on posts | yes / no | No at launch (Giscus via template later) | |
| Q-22 | 3D scope | S1 / S1+S2+S4 / all | S1 + S2 + S4 | |
| Q-23 **(changed)** | Confirm: visitors can read everything without an account; **only roadmap progress needs sign-in** (learners get no CP tracking) | confirm / change | Confirm | |
| Q-24 | Will someone else ever be an editor? | yes / no | Keep the role; nobody assigned | |
| Q-25 | Budget ceiling if free tiers run out | $0 / ≤ $25 / ≤ $50 per month | ≤ $25 (Supabase Pro for production first) | |
| Q-26 **(new)** | Guest sign-in providers | Google only / Google + GitHub / + email magic link | **Google + GitHub** | |
| Q-27 **(new)** | Where do blog posts live? | content origin (`read…/blog/{slug}/`, main-domain URL redirects) / iframe inside the main site | **Content origin + redirect** (security and exact rendering) | |
| Q-28 **(new)** | Feed content | summary + link / sanitised full text | **Summary + link** (scripts/styles can't work in feed readers) | |
| Q-29 **(new)** | Enable HTML-scraping adapters (CodeChef, LightOJ, SPOJ, CSES, Toph profile pages)? | all / some / none (extension only) | **Enable at low frequency with kill switches**; drop any judge that objects | |
| Q-30 **(new)** | Browser extension for **your own** LeetCode/CSES/LightOJ/SPOJ/CodeChef history | reuse the NEUPC extension (configurable API URL + compatible endpoints) / fork a slim extension / none | **Reuse NEUPC's** (SP-10 confirms) | |
| Q-31 **(new)** | Use CLIST.by API as a fallback? | yes (needs a free key) / no | No at launch; revisit if CodeChef data is poor | |
| Q-32 **(new)** | Public learner profiles or leaderboards? | no / later | **No** (privacy; would need handle verification) | |
| Q-33 **(new)** | Anonymous readers: disable progress completely (even local)? | fully disabled / local-only allowed | **Fully disabled** (as requested) | |
| Q-34 **(new)** | Inactive-account policy | delete after 24 months (+ 30-day notice) / keep | 24 months + notice | |
| Q-35 **(withdrawn in 0.3)** | ~~Require CP handle verification?~~ Not applicable: learners have no CP tracking | — | — | n/a |
| Q-36 **(new)** | Edit topics in the admin HTML editor at v1? | yes / later | Yes (same editor as the blog; quick fixes without re-uploading) | |
| Q-37 **(UX)** | CV access on desktop deep pages (UXF-01) | "CV" text link in the desktop header / CV link in project fact sheets / footer only | Header text link next to *Contact* | |
| Q-38 **(UX)** | Runtime chip position when a bundle has its own bottom-right control (UXF-04) | auto-move to bottom-left / bundle meta tag / both | Both | |
| Q-39 **(UX)** | Merge Education, Skills and Certifications into one "CV data" admin screen (UXF-05) | merge with tabs / keep separate | Merge with tabs | |
| Q-40 **(UX)** | Nav label for the CP page (UXF-16) | "CP" / "CP Journey" / "Competitive Programming" | "CP" on desktop, "CP Journey" in the mobile sheet; confirmed by the card sort | |
| Q-41 **(UX)** | Collapse "Activity" on the CP page on phones (UXF-17) | collapsed / expanded | Collapsed | |
| Q-42 **(UX)** | Which screens get hi-fi mock-ups in P1 | the 6 in UX-00 §7 / all public screens | The 6 in UX-00 §7 | |

## 4. Area checklists

### 00 Charter & 01 PRD
- [ ] The vision now includes learners tracking their journey; goals G-08/G-09 are right
- [ ] Priorities of FR-BLOG, FR-PROG and FR-GUEST match what I want at launch; FR-CPT is withdrawn
- [ ] User stories US-080 … US-091 describe the behaviour I expect

### 02 NFRs
- [ ] Runtime and reader-API targets (PERF-13/14/15) are acceptable
- [ ] Guest privacy rules (PRIV-07…10) and open-registration safety (SEC-10…12) are right

### 03 IA & 04 Design & 05 3D
- [ ] `read.` hosts docs and posts; `/blog/{slug}` redirects there
- [ ] "Sign in" is a quiet header link, not a hero CTA
- [ ] `/me` layout (Continue card, roadmap cards, activity) is what I want (drawn in UX-05 WF-51)
- [ ] No 3D in the reader panel

### 06 Architecture, 07 DB, 13 API
- [ ] One deployment, two hosts; the bundle engine serves topics and posts
- [ ] Owner-only CP tables with daily per-platform runs; guest data (reading progress only) behind RLS
- [ ] Reader API and extension endpoints (NEUPC-compatible) are acceptable

### 08 Security
- [ ] Anyone can sign up as a guest; admin only through the allowlist
- [ ] Reader session bridge (separate HttpOnly session on the content origin)
- [ ] Accepted risk: author JS can touch the current reader's own progress

### 09 Admin
- [ ] HTML editor with templates and live preview covers how I want to write posts
- [ ] Users (ban/delete) and aggregate-only Readers analytics are right
- [ ] Sync & judges platform health and kill switches are enough

### 10 Content origin & bundles (most important)
- [ ] Stored bytes immutable; one runtime block injected in entry HTML is acceptable
- [ ] Same engine, versions, preview and rollback for posts and topics
- [ ] The generator observations O1–O6 are useful

### 19 Guest accounts & progress
- [ ] Anonymous readers: everything readable, progress controls disabled, nothing saved
- [ ] Signed-in: server-authoritative progress synced across devices
- [ ] Export/delete/inactivity rules

### 20 CP tracking
- [ ] The capability matrix matches my NEUPC experience; the "needs extension" judges are acceptable
- [ ] The public CP page uses my accounts on all 10 judges
- [ ] Learners have **no** CP tracking; they tick roadmap practice problems themselves

### UX — UI/UX design (revision 0.4)
- [ ] The UX principles U1–U8 and content ladders (UX-00 §3, §5) match my priorities
- [ ] Flows F-01…F-11 cover what visitors, learners and I actually do (UX-01)
- [ ] Home, Project, CP, Topic + chip, `/me` and the HTML editor wireframes are right (WF-10, 13, 15, 38, 51, 64)
- [ ] UX-06 replaces the admin sketches in 09
- [ ] Components/states, microcopy (UX-07) and the keyboard/motion/a11y specs (UX-08) are acceptable
- [ ] UX audit findings accepted; Q-37…Q-42 answered (UX-09)

### 14–18
- [ ] Cost triggers (DB growth from guest reading progress; reader-API invocations) are acceptable
- [ ] Estimate ≈ 135 days (+20%) and option B ordering are realistic
- [ ] Top risks R-01, R-05, R-16, R-18 have acceptable mitigations
- [ ] I'll provide the content in [18 §9](18-content-inventory.md), including all judge handles

## 5. After sign-off

1. Create GitHub Issues from the backlog ([16 §4](16-delivery-plan.md)).
2. Run spikes SP-01 … SP-11 and record results as ADR updates (SP-08 updates the judge matrix;
   SP-09 confirms the runtime approach).
3. Scaffold (US-100 …) on a feature branch; the first PR includes wireframes, the essay template
   draft and 3D stills.
4. Weekly demos; each phase closes with its UAT scripts.
