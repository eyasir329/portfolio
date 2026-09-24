# 19 — Audit Checklist, Open Questions & Sign-off

> Status: **Awaiting owner audit** · This is the gate between planning (P0) and building (P1).
> Nothing is implemented until this page is signed.

---

## 1. How to audit

1. Read the documents in the order given in [README §1](README.md) (or the 30-minute path).
2. For each document, work through its checklist in §4 and tick ✅ (agree), ✎ (change needed) or ❌
   (reject). Put comments inline in the document as:
   `> **Audit (Eyasir):** …`
3. Answer the questions in §3. **Every question has a recommended default.** If you leave one blank,
   the default is used.
4. Sign §2. After that, changes to approved content go through a PR that updates the doc and adds an
   ADR if it's architectural ([README §4](README.md)).

## 2. Sign-off sheet

| # | Document | Decision | Comments / change requests |
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
| 10 | Roadmap Docs system | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 11 | Content modules | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 12 | Integrations & sync | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 13 | API & data flow | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 14 | DevOps & environments | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 15 | Testing & QA | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 16 | Delivery plan | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 17 | Risks & ADRs | ☐ ✅ ☐ ✎ ☐ ❌ | |
| 18 | Content inventory | ☐ ✅ ☐ ✎ ☐ ❌ | |

**Final approval:** ☐ Approved to start Phase 1 · Name: ____________ · Date: ____________

## 3. Decisions only the owner can make

| ID | Question | Options | Recommended default | Answer |
|---|---|---|---|---|
| Q-01 | Domain name? | e.g. `eyasir329.dev`, `eyasir.dev`, `eyasirahamed.com`, or `*.vercel.app` for now | Buy a `.dev` (HTTPS-only TLD, ~$12–15/yr) | |
| Q-02 | Admin Google account(s)? A second owner email as backup? | primary only / primary + backup | `eyasir329@gmail.com` as owner + one backup Google account you control | |
| Q-03 | Show the email address publicly? | yes / form only | Yes (as on the CV), plus the contact form | |
| Q-04 | Content-origin subdomain name | `kb.` / `docs.` / `learn.` | `kb.` (short, not confused with the `/docs` pages) | |
| Q-05 | Navigation labels | "Work" or "Projects"; "CP" or "Competitive Programming" | Work · Experience · CP · Blog · Docs · About | |
| Q-06 | Typefaces | Newsreader + Geist + Geist Mono / EB Garamond + Inter + JetBrains Mono / other | Newsreader + Geist + Geist Mono | |
| Q-07 | Accent colour | Oxblood `#8B2A1C` / Lapis `#1E3A8A` / other | Oxblood | |
| Q-08 | Projects: NEUPC status, Joborx repo/live links (or private?), is Tourmate a 3rd featured project? | — | NEUPC "maintained"; Joborx "ongoing" with no public link until ready; 3rd featured = Tourmate | |
| Q-09 | Which other judges to show? Can NEUPC expose a read-only stats endpoint for your profile? | none / AtCoder / LeetCode / CodeChef / NEUPC adapter | Codeforces synced + other handles as manual cards; explore a NEUPC endpoint after launch | |
| Q-10 | Exact ranks/dates/teams for the MU, NSUCEC, BUET and other IUPCs | — | Show each contest with the details you provide; hide ranks you don't have | |
| Q-11 | Graduation: final CGPA and date; confirm the "graduate" wording | — | Update the headline/bio to "CSE graduate" once the result is final | |
| Q-12 | Any internships/freelance/teaching entries? Certificate links? | — | Launch with leadership only if none | |
| Q-13 | Full roadmap outline (all topics, serials, folder names) and which bundles are ready | — | Provide the outline YAML (format in [10 §7.3](10-roadmap-docs-system.md)) | |
| Q-14 | Publish the `data/` verbatim book excerpts? | private / public | **Private** (copyright risk) | |
| Q-15 | Licences | text: CC BY-NC-SA 4.0 / CC BY 4.0 / all rights reserved; code: MIT / none | Docs & blog text CC BY-NC-SA 4.0; code snippets MIT; site source private until launch | |
| Q-16 | Serve `assets/src/` original images (unreferenced)? | serve / private / strip from bundles | Private (saves bandwidth; licences stay in `SOURCES.md`) | |
| Q-17 | YouTube thumbnails: keep local copies or hotlink `i.ytimg.com`? | local / hotlink | Local (as authored, byte-for-byte principle) | |
| Q-18 | Name teammates on contest entries? | names / team name only | Team name only unless teammates agree | |
| Q-19 | Delivery ordering | standard / docs-first / early MVP | **Docs-first** if topic bundles are ready; otherwise standard | |
| Q-20 | Blog at launch? | yes with 1–3 posts / enable later | Build it; publish when the first post is ready (section hides when empty) | |
| Q-21 | Comments on posts (Giscus) | yes / no | No at launch; revisit in v1.1 | |
| Q-22 | 3D scope for launch | S1 only / S1 + S2 + S4 / all four | S1 + S2 + S4; S3 (plinth) after launch | |
| Q-23 | Confirm visitors never sign in (v1) | confirm / need reader accounts | Confirm | |
| Q-24 | Will a second person ever edit (editor role)? | yes / no | Keep the role; nobody assigned | |
| Q-25 | Budget ceiling if free tiers run out | $0 / ≤ $25/mo / ≤ $50/mo | ≤ $25/mo (Supabase Pro for production first) | |

## 4. Area checklists

### 00 Charter & 01 PRD
- [ ] The vision statement and the three "obvious within seconds" points represent me
- [ ] Goals G-01…G-07 and their targets are right
- [ ] Out-of-scope list (§4.2) is acceptable for v1
- [ ] Every **M** requirement is truly a launch blocker; the **S**/**C** priorities are right
- [ ] The user stories in PRD §4 describe the behaviour I expect

### 02 NFRs
- [ ] Performance budgets (LCP ≤ 2.0 s content / 2.5 s with 3D) are acceptable
- [ ] WCAG 2.2 AA is the bar; 3D must always have text equivalents
- [ ] Privacy: phone hidden, IP hashed, 12-month message retention

### 03 IA
- [ ] Sitemap and URLs look right; `kb.` host for topic pages is acceptable
- [ ] Page section orders (§5) match what I want visitors to see first

### 04 Design & 05 3D
- [ ] "Marble & Ink" (classical, minimal, museum-library) is the right direction
- [ ] Palette, fonts and the wall-label project card appeal to me
- [ ] The four scenes (Plaster Graph, Colonnade, Plinth, Broken Column) are the right metaphors
- [ ] I'm fine with no 3D on Blog/Docs/About (reading first)

### 06 Architecture, 07 DB, 13 API
- [ ] Single Next.js app on Vercel + Supabase (two projects: staging, production)
- [ ] Schema covers everything I want to manage; nothing is missing from admin
- [ ] Server Actions for admin, route handlers only for cron/CLI/webhooks/feeds

### 08 Security
- [ ] Only allowlisted Google accounts; no accounts created for anyone else
- [ ] Roadmap bundles run on an isolated origin with a strict CSP
- [ ] The secrets list and the rotation runbook are acceptable

### 09 Admin
- [ ] Every screen I need is listed; the owner/editor split is right
- [ ] The Docs admin flow (upload → report → preview → publish → rollback) fits how I work

### 10 Roadmap Docs (most important)
- [ ] The reference analysis (§2) matches how my generator works
- [ ] Byte-for-byte serving + generated index/coming-soon pages is what I want
- [ ] URL tree `kb…/{roadmap}/{phase}/{module}/{topic}/` mirrors my folders
- [ ] Private-by-default for `data/` (book excerpts) is acceptable
- [ ] CLI + bulk import will cover publishing 60+ topics
- [ ] Observations O1–O5 for the generator are useful (e.g. the quiz key collision)

### 11 Content, 12 Integrations
- [ ] Blog in Markdown with directives (callouts, figures, YouTube, problem cards, KB links) is enough
- [ ] Codeforces + GitHub synced daily; other judges manual for now
- [ ] Override rule ("1000+" beats the synced count) is right

### 14 DevOps, 15 QA, 16 Delivery, 17 Risks
- [ ] Cost plan (~$1/month at launch) and upgrade triggers are acceptable
- [ ] The backup approach (nightly encrypted dumps) is acceptable
- [ ] UAT scripts cover what I'll check before each milestone
- [ ] Estimates (~100 dev-days + 20%) and the phase order are realistic for me
- [ ] Top risks (R-01, R-02, R-03, R-11) have acceptable mitigations

### 18 Content
- [ ] The CV data is transcribed correctly
- [ ] I will supply the missing items in §9 by the phases listed in [16 §8](16-delivery-plan.md)

## 5. After sign-off (what happens next)

1. Create GitHub Issues from the backlog ([16 §4](16-delivery-plan.md)) with epic/priority labels
   and a project board.
2. Run the P1 spikes (SP-01…SP-07) and record the results as ADR updates.
3. Scaffold the app (US-100…) on a feature branch; the first PR includes the wireframes and the 3D
   art-direction stills for design approval.
4. Weekly demos on preview URLs; each phase closes with its UAT scripts.
