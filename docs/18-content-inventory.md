# 18 — Content Inventory & Seed-Data Mapping

> Status: **Draft v0.1** · Source: `Eyasir_Ahamed_CV.tex` ("Last updated in August 2026") and the
> owner's brief · Related: [07 DB](07-database-design.md), [11 Content modules](11-content-modules.md)

Everything the CV already gives us, where it goes in the database, and what's still missing. Seed rows
are created as **drafts**. The owner reviews and publishes them in admin, so nothing goes live
unreviewed.

---

## 1. Identity & contact → `profile`, `social_links`

| Field | Value from the CV | Target | Public? |
|---|---|---|---|
| Name | Eyasir Ahamed | `profile.full_name` | ✅ |
| Headline | Full-Stack Developer · Software Engineer | `profile.headline` | ✅ |
| Location | Netrokona, Bangladesh | `profile.location` | ✅ |
| Email | eyasir329@gmail.com | `profile.email_public`, `social_links(email)` | ✅ (proposed; `Q-03`) |
| Phone | (in the CV; deliberately not repeated in this repo) | `profile.phone` entered via admin, `show_phone=false` | ❌ by default (privacy) |
| LinkedIn | linkedin.com/in/eyasir329 | `social_links(linkedin)` | ✅ |
| GitHub | github.com/eyasir329 | `social_links(github)`, GitHub sync login | ✅ |
| Codeforces | codeforces.com/profile/eyasir329 | `social_links(codeforces)`, `cp_profiles(codeforces, 'eyasir329', primary, sync on)` | ✅ |
| Availability | "Exploring roles in Software Engineering, DevOps & Cloud, QA, and AI/ML Engineering" | `profile.availability.roles` | ✅ |

### 1.1 Summary / positioning (needs an update)

The CV summary says **"Final-year Computer Science & Engineering student"**, and the degree is
"Expected Aug 2026". Today is after that date, and the owner's brief says **CSE graduate**.
Proposed seed copy for review:

> **Positioning (hero):** "I build production-grade web platforms with Next.js, TypeScript and
> PostgreSQL, and I train for contests the way I build software: measured, iterative, and in the
> open."
>
> **Short bio (≤ 280):** "Full-stack developer and CSE graduate from Netrokona University. I build
> role-based, AI-integrated platforms with Next.js, Node.js and PostgreSQL. ICPC 2025 Asia Dhaka
> Regionalist (Mymensingh Divisional Champion), 1000+ problems solved."

Owner to confirm the wording and graduation status (`Q-11`).

## 2. Skills → `skill_categories`, `skills`

| Category | Skills |
|---|---|
| Languages | C++, C, Java, Python, JavaScript, TypeScript, SQL |
| Frontend | React, Next.js, Tailwind CSS, Bootstrap, HTML5, CSS3 |
| Backend & Databases | Node.js, Express.js, Supabase, REST APIs, OAuth 2.0, PostgreSQL, MySQL, MongoDB |
| Tools & DevOps | Git, Docker, Linux, Vercel, GitHub Actions, CI/CD |
| Concepts | Data Structures & Algorithms, OOP, System Design, Database Design, Authentication, LLM Integration |

Proposed **featured** skills (Home/About highlight): TypeScript, Next.js, React, Node.js,
PostgreSQL, Supabase, C++, Docker.

## 3. Projects → `projects`, `project_skills`

| Slug | Title | Kind / status | Stack (skills) | Highlights (from the CV) | Links | Flags |
|---|---|---|---|---|---|---|
| `neupc` | NEUPC — Full-Stack Club Management Platform | web / completed or maintained (`Q-08`) | Next.js, Supabase, PostgreSQL, Auth.js | Role-based multi-tenant platform (student, mentor, admin) with database-level access control · CP tracker integrating dozens of online judges + custom browser extension for submission and rating sync · AI-assisted solution analysis pipeline resilient to AI-provider outages; real-time chat, forums, secure sign-in; deployed to production | github.com/eyasir329/NEUPC | featured |
| `joborx` | Joborx — AI-Powered Job-Hunting Assistant | ai / ongoing | Next.js, TypeScript, PostgreSQL | AI job-matching engine scoring listings against resumes with plain-language explanations · automated research agent preparing interview-prep summaries · resilient to AI-provider failure; bilingual (English/Bengali) UI | (repo/live `Q-08`) | featured |
| `tourmate` | Tourmate | web / completed | React, Express, MySQL | Tour/hotel booking platform with role-based dashboards | github.com/eyasir329/tourmate | additional (or featured #3, `Q-08`) |
| `eduflow329` | Eduflow329 | web / completed | React, Express, MySQL | Academic management system with role-based access | github.com/eyasir329/eduflow329 | additional |
| `surveillance-car` | Surveillance Car | hardware / completed | C++, ESP32 | Wireless camera vehicle with real-time video monitoring | github.com/eyasir329/surveillanceCar_using_esp32 | additional |

**Relations:** NEUPC ↔ experience "Programming Secretary" (built and maintained for the club) ↔ CP
page ("NEUPC tracks members' progress").

## 4. Education → `education`

| Degree | Institution | Years | Result | Notes |
|---|---|---|---|---|
| B.Sc. in Computer Science and Engineering | Netrokona University | 2022 – Aug 2026 | CGPA 3.51 / 4.00 | "after 6 semesters" → **final CGPA needed** (`Q-11`) |
| Higher Secondary Certificate (HSC) | Govt. Ashek Mahmud College | 2019 – 2020 | GPA 5.00 / 5.00 | |
| Secondary School Certificate (SSC) | Jamalpur Zilla School | 2017 – 2018 | GPA 5.00 / 5.00 | |

## 5. Competitive programming → `cp_profiles`, `cp_contests`, `cp_milestones`

| Item | Value | Target |
|---|---|---|
| Codeforces | handle `eyasir329`, max rating 1101 (sync will refresh) | `cp_profiles` (primary, sync on) |
| Total solved | "1000+ problems solved across judges" | `cp_profiles.override.solved_label = "1000+"` on the primary profile, or a site-level stat (`v_public_stats`) |
| ICPC | **ICPC 2025 Asia Dhaka Regional** (host BUBT): **112th overall**, **Mymensingh Divisional Champion**, of **300+** teams | `cp_contests` (featured, series ICPC) |
| IUPCs (ranked) | MU, NSUCEC and BUET inter-university contests: ranked 40th–75th (2025–2026) | 3 × `cp_contests`; **per-contest rank, date and team needed** (`Q-10`) |
| IUPCs (participation) | 7+ other national onsite contests including UU, DUET, UIU, KUET, IUT IUPCs | `cp_contests` rows (rank optional) |
| Other judges | Not listed in the CV | `Q-09` (AtCoder, LeetCode, CodeChef, CSES, VJudge handles) |

## 6. Experience & leadership → `experiences`

| Kind | Title | Organisation | Dates | Highlights |
|---|---|---|---|---|
| leadership | Programming Secretary | Netrokona University Programming Club | Aug 2025 – Aug 2026 | Designed a CP syllabus; ran practice contests and training sessions · Founded the club's Discord community for discussions, resources and contest announcements · Built and maintained the NEUPC platform to track members' progress |

**Gap:** no employment, internship or freelance entries in the CV (`Q-12`). The Experience page
works with leadership entries alone; the Home "Chronology" also includes education and contests.

## 7. Certifications → `certifications`

| Title | Issuer | Date | Description |
|---|---|---|---|
| AI/ML Expert | Phitron (Batch 01) | 2025 | 8–10 month professional AI/ML project track: supervised/unsupervised learning, deep learning, applied AI projects |
| Responsive Web Design | Creative IT Institute, Dhaka | 2021 | HTML5, CSS3, JavaScript, jQuery |

Credential URLs/images needed (`Q-12`).

## 8. Roadmap Docs → `kb_roadmaps`, `kb_nodes`

| Item | Known | Needed |
|---|---|---|
| Roadmap | "CP Knowledge Base" (brand in the reference), slug proposal `cp` | Description, licence (`Q-15`), cover |
| Phases | `phase-0`, `phase-1` ("Core CP Toolkit") seen in links | Full list with titles |
| Modules | `1_basics` ("Basics") | Full list |
| Topics | `3_std_vector` (01.01.14, published bundle available), `2_lambdas_and_comparators`, `4_std_string_and_text_processing`, `16_amortised_analysis`, `10_algorithm_sort_lower_bound_and_friends`, `5_std_set_and_std_map`, `11_std_bitset`, `9_iterators_and_ranges`, `phase-0/1_basics/8_arrays_and_multidimensional_indexing` (all referenced by the reference page) | The complete 66-topic outline with serials (`Q-13`), and the other bundles |

## 9. Content still needed (checklist for the owner)

| # | Content | For | Priority |
|---|---|---|:-:|
| 1 | Domain name | Everything | M |
| 2 | Confirm the owner Google account email for admin | Auth | M |
| 3 | Portrait photo (optional) | About, OG | S |
| 4 | Project screenshots (3–6 each for NEUPC and Joborx; 1–2 for others), live URLs, dates, role, team size | Projects | M |
| 5 | Case-study notes per featured project (problem, architecture, decisions, results/metrics) | Projects | M |
| 6 | Final CGPA and graduation date | Education | M |
| 7 | Any internships/freelance/teaching entries | Experience | S |
| 8 | ICPC/IUPC details: exact ranks, dates, team names, teammates (with consent), photos, standings links | CP | M |
| 9 | Other judge handles | CP | S |
| 10 | Certificate links/images | Certifications | S |
| 11 | Current CV PDF (compiled from the `.tex`) | Resume | M |
| 12 | Roadmap outline + bundles + licence + decision on `data/` sources | Docs | M |
| 13 | 1–3 launch blog post drafts (ideas: "Building NEUPC's multi-judge tracker", "What ICPC Dhaka taught me", "Measuring std::vector") | Blog | C |
| 14 | "Now" paragraph (what you're focused on) | About | C |

## 10. Seed file plan

`supabase/seed.sql` (Phase 2) will contain: owner allowlist row; `cp_platforms`; skill categories
and skills (§2); five projects (§3, drafts, with CV highlights as `highlights[]`); education (§4);
CP profile + ICPC contest (§5); the leadership experience (§6); certifications (§7); an empty `cp`
roadmap with the nodes known from the reference links (§8, status `planned`); `site_settings`
defaults. Personal data such as the phone number goes into the **production** database only
through admin, never into the seed file committed to git.
