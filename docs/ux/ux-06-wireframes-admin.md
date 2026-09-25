# UX-06 — Wireframes: Admin Panel

> Status: **Draft v0.4** · Related: [09 Admin panel](../09-admin-panel.md) (these wireframes **supersede** its sketches), [10 Bundles](../10-roadmap-docs-system.md), [20 CP tracking](../20-cp-multi-platform-tracking.md), [UX-07](ux-07-components-and-states.md)

Admin UI principles: **dense but calm** (sans face, 14 px UI text, 8 px grid), **keyboard first**
(⌘K, ⌘S, `g` shortcuts), **status always visible** (draft/live/scheduled badges, sync health in the
top bar), **no destructive action without a preview or typed confirmation**.

---

## WF-60 — Admin shell & dashboard `/admin`

**FRs:** FR-ADM-01, FR-ADM-14, FR-ADM-15.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Dashboard                                                                    │
│                   │                                                                              │
│ › Dashboard       │ ┌──────────────────────────────────┐  ┌───────────────────────────────────┐  │
│ ─ Content ─       │ │ HEALTH (1)                       │  │ INBOX (2)                         │  │
│   Profile         │ │ ● GitHub synced 3 h ago          │  │ 2 unread                          │  │
│   Projects        │ │ ● 9/10 judges ok  ! SPOJ failing │  │ Rina K. — "Role at…"  2 h         │  │
│   Experience      │ │ ● Storage 38% · DB 21%           │  │ ‹Open inbox →›                    │  │
│   Education       │ │ ‹Sync & judges →›                │  └───────────────────────────────────┘  │
│   Skills          │ └──────────────────────────────────┘                                         │
│   Certifications  │                                                                              │
│   CP Journey      │ ┌──────────────────────────────────┐  ┌───────────────────────────────────┐  │
│   Blog            │ │ DRAFTS & SCHEDULED (3)           │  │ READERS (4)                       │  │
│   Docs            │ │ Post ICPC notes · sched. 09:00   │  │ 412 registered · +23 this week    │  │
│   Templates       │ │ Topic 01.02.03 v2 · ready        │  │ 96 active this week               │  │
│   Media           │ │ Project Joborx · draft           │  │ ‹Readers →›                       │  │
│   Resume          │ │ ‹View all →›                     │  └───────────────────────────────────┘  │
│ ─ People ─        │ └──────────────────────────────────┘                                         │
│   Messages (2)    │                                                                              │
│   Users           │ ACTIVITY (5)                                                                 │
│   Readers         │ 10:42 You published std::vector v4                                           │
│ ─ System ─        │ 09:10 Sync: Codeforces +3 solves                                             │
│   Sync & judges   │ Yesterday  Rina K. sent a message                                            │
│   Settings        │ QUICK ACTIONS  [ New post ] [ Upload topic ] [ Run sync ] [ Replace CV ]     │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | Health tile: worst status first; each line links to its fix screen |
| (2) | Inbox preview: newest unread first |
| (3) | Drafts, scheduled posts, ready-but-unpublished versions (owner's to-do list) |
| (4) | Reader counts (aggregate) |
| (5) | Activity feed from `audit_log` + quick actions |

**Shell:** the sidebar collapses to icons at 768–1279 px and becomes a sheet below 768 px; the top
bar holds the admin search (⌘K) and the judge-health pill (click → WF-73); `(EA)` opens the user
menu (View site, My progress, Sign out). Owner-only items show a lock "(o)" and are hidden for
editors.

## WF-61 — Generic list view (example: Projects)

**FRs:** FR-ADM-02, FR-ADM-03.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Projects                                                    [[ + New ]]      │
│                   │ Status [All ▾]  Kind [All ▾]  [ ] Featured only    [⌕ Search______]          │
│   Dashboard       │ ─────────────────────────────────────────────────────────────────────────────│
│ ─ Content ─       │ [ ]  ⠿  Title                    Status       Featured  Updated   ⋯          │
│   Profile         │ [ ]  ⠿  NEUPC                    ● Published  ★         2 d ago   ⋯          │
│ › Projects        │ [ ]  ⠿  Joborx                   ○ Draft      ★         5 h ago   ⋯          │
│   Experience      │ [x]  ⠿  Tourmate                 ● Published            1 mo ago  ⋯          │
│   Education       │ ─────────────────────────────────────────────────────────────────────────────│
│   Skills          │ 1 selected: [ Publish ] [ Unpublish ] [ Archive ] [ Delete… ]                │
│   Certifications  │ ← Prev   Page 1 of 1   Next →          25 per page ▾                         │
│   CP Journey      │ (1) ⠿ drag handle: only when sorted by Order  (2) row click opens editor     │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**States:** empty ("No projects yet. [[ Create your first project ]]"), loading (row skeletons),
filtered-empty ("No drafts. ‹Clear filters›"), error banner with retry.

## WF-62 — Generic entity form (example: Experience)

**FRs:** FR-ADM-02.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ ‹Experience› / Programming Secretary   ● Published  [ Preview ] [[ Save ]]   │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ Kind        ( ) Work ( ) Internship (o) Leadership ( ) Teaching ( ) Volunteer│
│ ─ Content ─       │ Title *       [ Programming Secretary______________________ ]                │
│   Profile         │ Organisation* [ Netrokona University Programming Club_______ ]  URL [_______]│
│   Projects        │ Dates *       [ Aug 2025 ▾ ] → [ Aug 2026 ▾ ]   [ ] Present                  │
│ › Experience      │ Location      [ Netrokona___________ ]                                       │
│   Education       │ Highlights    ⠿ Designed a CP syllabus…                       ✕              │
│   Skills          │               ⠿ Founded the club's Discord community          ✕              │
│   Certifications  │               [ + Add highlight ]                                            │
│   CP Journey      │ Skills        [Leadership ✕] [Next.js ✕] [+ ]                                │
│   Blog            │ Projects      [NEUPC ✕] [+ ]                                                 │
│   Docs            │ Description   (Markdown editor with preview, see WF-63)                      │
│   Templates       │ ─────────────────────────────────────────────────────────────────────────────│
│   Media           │ Unsaved changes ●     ⌘S to save     Last saved 3 min ago by Eyasir          │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Behaviour:** validate on blur, re-validate on change after the first error; the error summary at
the top on submit; ⌘S saves; leaving with unsaved changes asks "Discard changes?".

## WF-63 — Project editor with Markdown case study

**FRs:** FR-ADM-02, FR-ADM-05.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ ‹Projects› / NEUPC               ● Published   [ Preview ↗ ]  [[ Save ]]     │
│                   │ [ Basics ] [ Case study ] [ Media ] [ Links ] [ Relations ] [ SEO ]  (1)     │
│   Dashboard       │ ─────────────────────────────────────────────────────────────────────────────│
│ ─ Content ─       │ CASE STUDY (Markdown)                 │ PREVIEW (same renderer as public)    │
│   Profile         │ [H2][H3][B][I][code][link][figure][callout]  [ Insert section ▾ ]            │
│ › Projects        │ ## Overview                           │ Overview                             │
│   Experience      │ NEUPC is a role-based platform…       │ NEUPC is a role-based platform…      │
│   Education       │ ## Architecture                       │ Architecture                         │
│   Skills          │ ::figure{src="media:9f3c" alt="…"}    │ ▓▓▓▓▓▓▓▓▓ figure ▓▓▓▓▓▓▓▓            │
│   Certifications  │ ─────────────────────────────────────────────────────────────────────────────│
│   CP Journey      │ 1,420 words · Missing alt text: 0 · Last saved 12 s ago                      │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

(1) Tabs keep their own scroll; a dot marks tabs with validation errors.

## WF-64 — HTML editor (blog posts; also topics via "Open in editor")

**FRs:** FR-BLOG-12, FR-DOCS-11, FR-ADM-06, FR-ADM-07.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Measuring std::vector ▾   Draft (v3 live)   [ Preview ↗ ]  [[ Save version ]]  [ Publish ▾ ]     │
│ Slug measuring-std-vector · Tags [c++][stl][+] · Series [STL ▾] · Runtime [inject ▾] ‹SEO ▸› (5) │
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ FILES (1)       │ index.html  ● autosaved (2)             │ PREVIEW (3)  [360][768][1280] ↻ ⤢    │
│  index.html     │  1 <!doctype html>                      │ ┌─────────────────────────────┐      │
│  style.css      │  2 <html lang="en">                     │ │ ESSAY · 12 SEP 2026         │      │
│  script.js      │  3 <head>                               │ │ Measuring std::vector       │      │
│  assets/        │  4   <title>Measuring std::vector</…    │ │ ▓▓▓▓▓▓▓ canvas demo ▓▓▓▓▓▓  │      │
│    growth.svg   │  5   <meta name="description" …>        │ │ …                           │      │
│    fig1.png     │ …                                       │ │                             │      │
│  + Add file     │ 42   <canvas id="demo"></canvas>        │ └─────────────────────────────┘      │
│  ⇪ Drop files   │                                         │ sandboxed · scripts run              │
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ Autosaved 4 s ago · 2,310 words · 11 min · Report: 0 errors, 1 warning ▸ (4) · Versions (3) ▸    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | File tree: add, rename, delete; drag files in to upload; the selected file highlighted |
| (2) | CodeMirror with HTML/CSS/JS modes; autosave every 5 s while dirty (draft overlay) |
| (3) | Sandboxed preview of the **draft** on the content origin; device-width toggles; refresh on save |
| (4) | Report drawer runs the same validation as imports; errors block *Save version* |
| (5) | Listing & SEO drawer: title/excerpt/cover/tags overrides, extracted-metadata view |

**M:** editor is read-only on phones (preview + publish actions only), with a banner "Edit HTML on
a larger screen".

## WF-65 — Publish / schedule dialog

**FRs:** FR-ADM-07, FR-DOCS-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   ┌──────────────────────────────────────────────────────────┐                   │
│                   │ Publish "Measuring std::vector"                          │                   │
│                   │ Version 4 will replace version 3 on                      │                   │
│                   │ read.eyasir329.dev/blog/measuring-std-vector/            │                   │
│                   │                                                          │                   │
│                   │ (o) Publish now                                          │                   │
│                   │ ( ) Schedule   [ 26 Sep 2026 ] [ 09:00 ] Asia/Dhaka      │                   │
│                   │                                                          │                   │
│                   │ Report: 0 errors · 1 warning (image > 2 MB)  ‹view›      │                   │
│                   │ Change note [ Fix typo in §3____________________ ]       │                   │
│                   │                                                          │                   │
│                   │                        [ Cancel ]   [[ Publish v4 ]]     │                   │
│                   └──────────────────────────────────────────────────────────┘                   │
│                                                                                                  │
│                   After publishing: toast "v4 is live · ‹View› · ‹Undo (roll back)›" for 10 s    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Summary line | Always names the version being replaced ("v4 will replace v3") and the public URL, so the effect is explicit |
| Schedule | Date and time pickers in the site time zone (Asia/Dhaka), shown next to the field; past times are rejected inline |
| Report line | Warnings are shown but never block; errors disable *Publish* and link to the report |
| Primary button | Verb + object: *Publish v4* / *Schedule v4*; the label follows the selected radio |
| After | Toast with *Undo (roll back)* for 10 s; the list row shows a ● Live or ◷ Scheduled badge |

## WF-66 — Versions & compare

**FRs:** FR-ADM-07, FR-DOCS-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ VERSIONS — std::vector                                              [ Compare selected ]         │
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ [ ] v4  ● live   upload   45 files · 2.31 MB   today 10:42   "Fix §3 typo"     ‹Preview› ⋯       │
│ [x] v3           editor   45 files · 2.31 MB   20 Sep        "Add quiz"        ‹Preview› ⋯       │
│ [x] v2           upload   44 files · 2.29 MB   15 Sep                          ‹Preview› ⋯       │
│ [ ] v1  failed   upload   —                    14 Sep        E02 unsafe path   ‹Report›          │
│ ⋯ menu: Publish this version · Roll back to this · Download zip · Open in editor                 │
│ ════════════════════════════════════════════════════════════════════════════════════════════════ │
│ COMPARE v2 → v3                    + added 1   ~ changed 2   − removed 0                         │
│ ~ index.html          [ Text diff ▸ ]                                                            │
│ ~ assets/growth.svg   (binary, hash changed)                                                     │
│ + assets/quiz-4.svg                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Rules:** exactly one ● live version; *Roll back* is a publish of an older immutable version (no
re-upload) and asks for a one-line confirmation, not typed text, because it is reversible. Compare
works on any two versions; text files show a unified diff, binaries show the hash change.

## WF-67 — Docs roadmap outline

**FRs:** FR-DOCS-10, FR-ADM-03.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ CP KB  [ Outline ][ Settings ][ Imports ][ Link report ][ Readers ]          │
│                   │ [ + Phase ]  [ Import outline… ]   [⌕ filter____]   Status [All ▾]           │
│   Dashboard       │ ─────────────────────────────────────────────────────────────────────────────│
│ ─ Content ─       │ ⠿ ▾ phase-1   Phase 1 — Core CP Toolkit             published  24 topics     │
│   Profile         │ ⠿   ▾ 1_basics   Basics                             published                │
│   Projects        │ ⠿       2_lambdas…  01.01.13 Lambdas & Comparators  ● v2 live       ⋯        │
│   Experience      │ ⠿       3_std_vector 01.01.14 std::vector            ● v4 live       ⋯       │
│   Education       │ ⠿       4_std_string 01.01.15 std::string & Text…   ○ planned       ⋯        │
│   Skills          │ ⠿     ▸ 2_sorting    Sorting & Searching             6 topics                │
│   Certifications  │ (drag to reorder / re-parent · Enter to rename · ⋯: add child, open, delete) │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│ › Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Keyboard:** ↑/↓ move, →/← expand/collapse, `Enter` rename, `⌘↑/⌘↓` reorder, `Tab` indent
(re-parent). Every drag action has this keyboard equivalent and an "Undo" toast. Serial numbers
recompute live and a banner lists which public URLs would change before saving.

## WF-68 — Docs node page

**FRs:** FR-DOCS-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ ‹Docs› / CP KB / Phase 1 / Basics / std::vector       [ Open live ↗ ]        │
│                   │ 01.01.14 · segment 3_std_vector · ● v4 live · 13 sections · 11 practice      │
│   Dashboard       │ [ Versions ][ Upload ][ Open in editor ][ Files ][ Practice ][ Metadata ]    │
│ ─ Content ─       │ ─────────────────────────────────────────────────────────────────────────────│
│   Profile         │ (Versions tab = WF-66)                                                       │
│   Projects        │ FILES: tree with type, size, private flag · "View raw" · "Quick edit"        │
│   Experience      │   index.html   117 KB  text/html                                             │
│   Education       │   data/ (14)            private  (1)                                         │
│   Skills          │   assets/ (29)                                                               │
│   Certifications  │ PRACTICE: p0 Vector (vjudge) … p10 CSES 1619   (listed only)                 │
│   CP Journey      │ METADATA: extracted values (read-only) + overrides (title, serial)           │
│   Blog            │ (1) private folders shown with a lock and the rule that made them private    │
│ › Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The header always shows the node's serial, segment and live version; *Open live* opens the reading
room URL in a new tab. Tabs are deep-linkable (`?tab=files`).

## WF-69 — Upload & validation report

**FRs:** FR-DOCS-10, FR-ADM-06.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ UPLOAD NEW VERSION — std::vector                                                                 │
│ ┌────────────────────────────────────────────────────────────┐                                   │
│ │   ⇪  Drop a .zip here or [ Choose file ]                   │                                   │
│ │   3_std_vector.zip · 1.86 MB  ▮▮▮▮▮▮▮▮▯▯ 80% uploading (resumable)│                            │
│ └────────────────────────────────────────────────────────────┘                                   │
│ Note [ Regenerated charts____________ ]                                                          │
│ ════════════════════════════════════════════════════════════════════════════════════════════════ │
│ VALIDATION REPORT (v5)                                    Status: ● ready (warnings)             │
│ Title std::vector · Serial 01.01.14 · 45 files · 13 sections · 11 practice · 5 videos            │
│                                                                                                  │
│ ▾ ERRORS (0)                                                                                     │
│ ▾ WARNINGS (3)                                                                                   │
│    W02 Link to a planned topic → shows "coming soon"   index.html:… ../2_lambdas…  [Create node] │
│    W08 Public page links a private file                 footer → data/00-index.md  [Make public…]│
│    W09 Image larger than 2 MB                           assets/src/mailboxes.jpg                 │
│ ▸ INFO (2)  orphan files: assets/src/* (3)                                                       │
│                                                                                                  │
│ [ Preview v5 ↗ ]   [[ Publish v5 ]]   [ Discard ]                                                │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Warnings are grouped by code, each with the exact file and an action where one exists. Errors stop
at "failed" with the fix hint ("E02: `../../evil.sh` escapes the bundle. Remove it and re-zip.").

## WF-70 — Bulk import dry run

**FRs:** FR-DOCS-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ IMPORT — CP Knowledge Base          Source: phase-1.zip (CLI push by Eyasir, 10:02)              │
│ DRY RUN PLAN                        12 new · 5 changed · 7 unchanged · 1 only in DB              │
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ [x] NEW       01.02.01 Sorting                         ready     0 errors  2 warnings  ‹report›  │
│ [x] CHANGED   01.01.14 std::vector      v4 → v5         ready     0 errors  1 warning   ‹diff›   │
│ [ ] CHANGED   01.01.09 Iterators        v1 → v2         failed    1 error   E04 .exe    ‹report› │
│ [ ] UNCHANGED 01.01.13 Lambdas & Comparators                                                     │
│ [ ] ONLY IN DB 01.01.20 Old topic (nothing is deleted automatically)                             │
│ ──────────────────────────────────────────────────────────────────────────────────────────────── │
│ Applying… ▮▮▮▮▮▮▯▯▯▯ 11/17 topics (steps continue while this tab is open)                        │
│ [ Cancel ]    [[ Apply selected (16) ]]    then  [ Publish all ready ]                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Nothing is deleted automatically: "only in DB" rows are listed for a manual decision. Failed rows are
unticked by default and cannot be applied until fixed. Progress survives a page refresh (the job
runs server-side; the bar reattaches).

## WF-71 — Media library

**FRs:** FR-ADM-04.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Media                               [ Grid | List ]   [[ Upload ]]           │
│                   │ Kind [All ▾]  [ ] Missing alt  [ ] Unused   [⌕____]                          │
│   Dashboard       │ ─────────────────────────────────────────────────────────────────────────────│
│ ─ Content ─       │ ▓▓▓▓▓▓  ▓▓▓▓▓▓  ▓▓▓▓▓▓  ▓▓▓▓▓▓  ▓▓▓▓▓▓      │ DETAIL (drawer)                │
│   Profile         │ neupc1  neupc2  icpc1   ! alt   cv.pdf      │ ▓▓▓▓▓▓▓▓▓▓▓▓                   │
│   Projects        │                                             │ Alt text * [__________]        │
│   Experience      │                                             │ Caption    [__________]        │
│   Education       │                                             │ Credit     [__________]        │
│   Skills          │                                             │ Licence    [ CC BY 4.0 ▾ ]     │
│   Certifications  │                                             │ Used in: NEUPC (cover)         │
│   CP Journey      │                                             │ [ Replace file ] [ Delete ]    │
│   Blog            │ (Delete is disabled while the file is used; the tooltip lists where)         │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│ › Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**States:** upload in progress (per-file bar, cancel), alt text missing (amber "! alt" badge and a
filter), used/unused. Alt text is required before a file can be attached to public content.

## WF-72 — CP Journey admin (owner accounts)

**FRs:** FR-CP-09, FR-ADM-08.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ CP Journey     [ Accounts ] [ Contests ] [ Milestones ] [ Preview ]          │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ Judge       Handle      Shown  Status            Last sync   Actions         │
│ ─ Content ─       │ Codeforces  eyasir329   [x]    ● synced          3 h ago     [Run now] ⋯     │
│   Profile         │ AtCoder     eyasir329   [x]    ● synced          3 h ago     [Run now] ⋯     │
│   Projects        │ LeetCode    eyasir329   [x]    ◐ needs extension 3 h ago     [Run now] ⋯     │
│   Experience      │ SPOJ        eyasir329   [x]    ! failing (3)     2 d ago     [Run now] ⋯     │
│   Education       │ ⋯ menu: Edit handle · Overrides… · Hide from site                            │
│   Skills          │ OVERRIDES drawer: solved label [ 1000+ ]  rating [___]  (badge: overridden)  │
│   Certifications  │ [ + Add account ]  (judge ▾, handle, verify exists → saved)                  │
│ › CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Status vocabulary is shared with the public CP page and WF-73: ● synced · ◐ needs extension /
profile only · ! failing (n) · ○ off. Overrides always show an "overridden" badge in admin and a
footnote on the public card (U4 honest states).

## WF-73 — Sync & judges

**FRs:** FR-ADM-08.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Sync & judges                                                                │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ Codeforces ● 100% AtCoder ● 100% LeetCode ● 98% CodeChef ◐ 71% VJudge ● 99%  │
│ ─ Content ─       │ UVa ● 100%  Toph ● 95%  CSES ◐ profile  LightOJ ◐ profile  SPOJ ! 0% (7 d)   │
│   Profile         │ Click a tile → PLATFORM PANEL:                                               │
│   Projects        │   SPOJ   Enabled [x]   Scraping [x]   Budget 10/min   Next allowed 12:40     │
│   Experience      │   Last error: Cloudflare challenge page (HTML) at 03:45        [ Run now ]   │
│   Education       │ ─────────────────────────────────────────────────────────────────────────────│
│   Skills          │ RUNS                        status     duration  stats              error    │
│   Certifications  │ sync-cp spoj   today 03:45  failed     4 s       —                  challenge│
│   CP Journey      │ sync-cp cf     today 03:10  succeeded  9 s       +3 solves, +1 rating        │
│   Blog            │ sync-cp vjudge today 03:40  partial    50 s      +120 (cursor saved)         │
│   Docs            │ github         today 03:05  succeeded  2 s       2 repos updated             │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│ › Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The ten judge tiles use shape + colour + text (never colour alone). *Run now* is rate-limited per
judge and shows "Next allowed 12:40" instead of failing silently.

## WF-74 — Users

**FRs:** FR-ADM-16, FR-AUTH-06.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Users                                   412 accounts   [⌕ name or email__]   │
│                   │ Role [All ▾]  Status [All ▾]  Provider [All ▾]                               │
│   Dashboard       │ ─────────────────────────────────────────────────────────────────────────────│
│ ─ Content ─       │ Name           Email              Role    Provider  Last seen  Topics  ⋯     │
│   Profile         │ Nabila R.      nabila@…           guest   Google    2 h ago    6       ⋯     │
│   Projects        │ Arif H.        arif@…             guest   GitHub    5 d ago    2       ⋯     │
│   Experience      │ Eyasir Ahamed  eyasir329@gmail…   owner   Google    now        9       —     │
│   Education       │ ⋯ menu (owner only): Ban… (reason) · Delete account… · Promote to editor     │
│   Skills          │ (no reading histories are shown here, by design)                             │
│   Certifications  │                                                                              │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│ › Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Ban and delete are owner-only, need a reason, and are written to the audit log. Delete uses the
typed-confirmation pattern (UX-07 §5). Readers' progress is never inspectable one person at a time.

## WF-75 — Readers (aggregate analytics)

**FRs:** FR-ADM-17.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Readers (aggregate only)                      Range [ Last 30 days ▾ ]       │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐      │
│ ─ Content ─       │ │ Registered    │ │ Active / week │ │ New / week    │ │ Topics done   │      │
│   Profile         │ │ 412  +23      │ │ 96            │ │ 23            │ │ 188           │      │
│   Projects        │ └───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘      │
│   Experience      │ FUNNEL — CP Knowledge Base (started → completed per topic)                   │
│   Education       │ 01.01.13 Lambdas     ▮▮▮▮▮▮▮▮▮▮ 120 → ▮▮▮▮▮▮▮ 84                             │
│   Skills          │ 01.01.14 std::vector ▮▮▮▮▮▮▮▮   98 → ▮▮▮▮ 41   drop-off: §6 2D vectors       │
│   Certifications  │ PRACTICE TICKED  38% of listed problems across started topics                │
│   CP Journey      │ Sign-up source: Google 71% · GitHub 29%   (every chart has a "View table")   │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│ › Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Aggregates only, with a minimum group size of 5 before a number is shown ("< 5"). Each chart has a
"View table" toggle for screen readers and exports CSV.

## WF-76 — Messages

**FRs:** FR-ADM-09.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Messages        [ Inbox (2) ] [ Archived ] [ Spam ]                          │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ ● Rina K.   Role at Acme       2 h   │ Rina K. <rina@acme.com>               │
│ ─ Content ─       │   "Hi Eyasir, I saw…"                │ Role at Acme · today 08:12            │
│   Profile         │   T. Hasan  Contest collab     1 d   │ ─────────────────────────────────     │
│   Projects        │   "We are organising…"               │ Hi Eyasir, I saw your NEUPC work…     │
│   Experience      │                                      │                                       │
│   Education       │                                      │ [[ Reply by email ↗ ]]                │
│   Skills          │                                      │ [ Archive ] [ Mark spam ]             │
│   Certifications  │                                                                              │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│ › Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Two-pane on D (list + reading pane), single pane with back button on T/M. *Reply* opens the mail
client (no in-app mail sending in v1). `j`/`k` move, `e` archives, `!` marks spam.

## WF-77 — Settings

**FRs:** FR-ADM-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Settings [Site][Navigation][Home][Social][Flags][Accounts][Legal]            │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ HOME SECTIONS (drag to reorder, toggle to show)                              │
│ ─ Content ─       │ ⠿ [x] Hero          ⠿ [x] Proof strip     ⠿ [x] Selected work                │
│   Profile         │ ⠿ [x] Contest record ⠿ [x] Writing        ⠿ [x] The library                  │
│   Projects        │ ⠿ [x] Chronology    ⠿ [x] Coda                                               │
│   Experience      │ FLAGS  3D [x]  View counter [ ]  Comments [ ]  Announcement [ ]              │
│   Education       │ ACCOUNTS (owner)  Providers [x] Google [x] GitHub  Inactivity [24 months ▾]  │
│   Skills          │                   Blocked email domains: 3,412 (refreshed monthly)  ‹view›   │
│   Certifications  │ MAINTENANCE  [ ] Show maintenance page to visitors                           │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│ › Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Each tab saves independently with its own *Save* and "Unsaved changes" marker; flag changes take
effect on the next request and show "Live in ~60 s" (cache revalidation).

## WF-78 — Tokens & admins (owner)

**FRs:** FR-ADM-12, FR-AUTH-05.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Tokens (owner)                                          [[ + New token ]]    │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ Name          Scopes                      Prefix    Expires   Last used      │
│ ─ Content ─       │ Laptop CLI    bundle:read,write,publish   bdl_8f3…  in 62 d   today          │
│   Profile         │ NEUPC ext.    cp:ingest                   cpi_2a1…  in 88 d   2 h ago        │
│   Projects        │ NEW TOKEN dialog: name, scopes (checkboxes), expiry (≤ 90 d)                 │
│   Experience      │ → shows the token ONCE with [ Copy ] and "I've stored it" confirmation       │
│   Education       │ ADMINS: email · role (owner/editor) · active · [ + Add admin ]               │
│   Skills          │                                                                              │
│   Certifications  │                                                                              │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│ › Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The full token is shown once, never again; the list shows only the prefix. Revoke is immediate and
asks for confirmation. Removing the last active owner is impossible (the control is disabled with a
tooltip saying why).

## WF-79 — Template picker (New post)

**FRs:** FR-ADM-18.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│               ┌─────────────────────────────────────────────────────────────────┐                │
│               │ New post — choose a starting point                              │                │
│               │ ┌───────────────┐  ┌───────────────┐  ┌───────────────┐         │                │
│               │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │               │         │                │
│               │ │ Marble & Ink  │  │ KB-style      │  │ Blank HTML    │         │                │
│               │ │ essay (def.)  │  │ long read     │  │               │         │                │
│               │ └───────────────┘  └───────────────┘  └───────────────┘         │                │
│               │ Title * [ Measuring std::vector_______ ]  Slug [auto]           │                │
│               │                           [ Cancel ]  [[ Create draft ]]        │                │
│               └─────────────────────────────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Cards are radio options (arrow keys move, `Enter` selects). The default template is pre-selected;
the slug is derived from the title and editable.

## WF-80 — Profile editor

**FRs:** FR-ADM-10.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   │ [⌕ Search admin…  ⌘K]            ● Judges 9/10 ok   (EA) ▾                   │
│ ──────────────────┼──────────────────────────────────────────────────────────────────────────────│
│ ◧ eyasir329 admin │ Profile                                                     [[ Save ]]       │
│                   │ ─────────────────────────────────────────────────────────────────────────────│
│   Dashboard       │ Full name   [ Eyasir Ahamed______ ]   Headline [ Full-Stack Developer · … ]  │
│ ─ Content ─       │ Positioning [ I build production-grade web platforms…              ]         │
│ › Profile         │ Short bio   [ ……………… ]  212/280                                              │
│   Projects        │ Portrait    ▓▓▓ [ Change ]   Location [ Netrokona, Bangladesh ]              │
│   Experience      │ Email       [ eyasir329@gmail.com ]   Phone [ ••••••• ] [ ] Show phone       │
│   Education       │ Availability [x] Open   Roles [SWE ✕][DevOps & Cloud ✕][QA ✕][AI/ML ✕]       │
│   Skills          │ ─────────────────────────────────────────────────────────────────────────────│
│   Certifications  │ LIVE PREVIEW of the hero (≥ 1280 px)                                         │
│   CP Journey      │                                                                              │
│   Blog            │                                                                              │
│   Docs            │                                                                              │
│   Templates       │                                                                              │
│   Media           │                                                                              │
│   Resume          │                                                                              │
│ ─ People ─        │                                                                              │
│   Messages (2)    │                                                                              │
│   Users           │                                                                              │
│   Readers         │                                                                              │
│ ─ System ─        │                                                                              │
│   Sync & judges   │                                                                              │
│   Settings        │                                                                              │
│   Redirects       │                                                                              │
│   Audit log       │                                                                              │
│   Admins (o)      │                                                                              │
│   Tokens (o)      │                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The preview column updates as you type (debounced 300 ms). The phone field is private by default and
only shown publicly when "Show phone" is ticked.

## WF-81 — Not an admin (guest on `/admin`)

**FRs:** FR-AUTH-02, FR-AUTH-03.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                  │
│                             This area is for site administrators.                                │
│                             You're signed in as nabila@example.com (reader).                     │
│                             [[ Go to My progress ]]   ‹Home›                                     │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Returned for signed-in readers who open `/admin/*` (HTTP 403, `noindex`). Signed-out visitors are
sent to WF-50 with `next=/admin` instead.

## Screens that reuse the generic templates

| Screen | Template | Differences |
|---|---|---|
| Education, Skills, Certifications, Achievements | WF-61 list + WF-62 form | Skills list groups by category with drag between groups |
| Blog list | WF-61 | Extra columns: kind (essay/note), series, scheduled time |
| Docs roadmaps | WF-61 | Row → WF-67 outline |
| Templates | WF-61 + WF-64 editor | "Default" radio column |
| Resume | WF-62 | Single PDF slot with preview, "Replace" and version history |
| Redirects | WF-61 | Inline add row (from → to, 301/302), hit count |
| Audit log | WF-61 (read-only) | Filters by actor, entity, action and date; row expands to a JSON diff |

## Admin on mobile (M)

The admin is designed for D first, but every screen must remain **usable for triage** on a phone:
dashboard tiles stack; lists become card rows; the sidebar is a sheet; editors (WF-63, WF-64) are
read-only with preview + publish/rollback actions; destructive actions stay available but with the
same typed confirmation.
