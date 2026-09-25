# UX-04 — Wireframes: Blog, Docs & the Reading Room

> Status: **Draft v0.4** · Related: [01 FR-BLOG, FR-DOCS, FR-PROG](../01-product-requirements.md), [10 Content origin & bundles](../10-roadmap-docs-system.md), [11 §7 Blog](../11-content-modules.md), [19 Reader runtime](../19-guest-accounts-and-progress.md)

Two surfaces meet here:

- **Main origin** (`eyasir329.dev`): blog index, archives, docs catalog and roadmap map, in Marble & Ink.
- **Reading room** (`read.eyasir329.dev`): the HTML posts and topics exactly as authored, plus
  generated roadmap pages in the roadmap's own theme. The platform's only UI there is the **runtime
  chip** and the disabled-control hint.

---

## WF-30 — Blog index `/blog`

**FRs:** FR-BLOG-06, 09.

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ WRITING                                                                            RSS ↗ (1)     │
│ Essays                                                                                           │
│ Notes on building software and solving problems, with the numbers to back them.                  │
│ Tags: [All] [c++] [stl] [icpc] [nextjs] [system-design] …                                        │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ SEP 2026 (2)                                                                                     │
│ Measuring std::vector (3) ......................................................  11 min read    │
│ Construction, growth and traps, with every claim benchmarked.                                    │
│ c++ · stl · Series: STL in depth (part 1 of 4)                                    12 Sep 2026    │
│                                                                                                  │
│ What ICPC Dhaka taught me .......................................................  7 min read    │
│ …                                                                                                │
│ AUG 2026                                                                                         │
│ Building NEUPC's multi-judge tracker ............................................  14 min read   │
│ …                                                                                                │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ ← Newer                            Page 1 of 3                                       Older →     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M**

```text
┌────────────────────────────────────┐
│ Essays                     RSS ↗   │
│ [Tags ▾]                           │
│════════════════════════════════════│
│ SEP 2026                           │
│ Measuring std::vector              │
│ Construction, growth and traps…    │
│ 12 Sep · 11 min · c++, stl         │
│────────────────────────────────────│
│ What ICPC Dhaka taught me          │
│ 02 Sep · 7 min · icpc              │
│────────────────────────────────────│
│ [ Older posts ]                    │
└────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | Feed link + `<link rel="alternate">` in head |
| (2) | Month groupings in small caps (table-of-contents feel, not cards) |
| (3) | Whole row is the link (title = accessible name); it opens `read…/blog/{slug}/` in the **same tab**, and the Back button returns here |

**Empty state (before the first post):** the page isn't in the nav yet (hidden with the section);
direct visits show "The first essay is on its way." + a link to Docs.

## WF-31 — Tag and series archives

`/blog/tags/[tag]`: header "Tagged · c++" + count + the same list as WF-30.
`/blog/series/[series]`: series title, description, and an **ordered** list ("Part 1 …
Part 4") with read-time totals ("4 parts · 46 min").

## WF-32 — Post on the reading room `read…/blog/{slug}/` (Marble & Ink essay template)

The author's HTML controls this page. This wireframe shows the **default template**, whose layout
the owner can change per post.

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ← eyasir329.dev / Writing (1)                                                         ◐          │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ ESSAY · 12 SEP 2026 · 11 MIN                                                                     │
│ Measuring std::vector                                                                            │
│ Construction, growth and traps, with every claim benchmarked. (standfirst)                       │
│ Series: STL in depth · Part 1 of 4 · ‹Next: std::string ›                                        │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ T he first paragraph opens with a drop cap…                        │ CONTENTS (2)                │
│ …body text, 38 rem measure…                                        │ Why growth doubles          │
│                                                                    │ › Measuring push_back       │
│ ## Why growth doubles                                              │ The 2D trap                 │
│ …                                                         ¹ sidenote in the margin (3)           │
│ ┌──────────────────────────────────────────────┐                   │                             │
│ │ interactive <canvas> demo, author's own JS   │ (4)               │                             │
│ └──────────────────────────────────────────────┘                   │                             │
│ ```cpp code block with copy button```                                                            │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ c++ · stl   Share: ‹Copy link› ‹LinkedIn› ‹X›                                                    │
│ ← Previous essay                 ‹All writing›                          Next essay →             │
│ Text CC BY-NC-SA 4.0 · © 2026 Eyasir Ahamed                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | Template back link to the main site; the post's own header |
| (2) | Margin ToC at ≥ 1280 px; "Contents" disclosure below that |
| (3) | Sidenotes in the margin at ≥ 1280 px; inline expandable notes below that |
| (4) | Author scripts run as written (content-origin sandbox) |

No runtime chip on posts by default (chip mode `hidden`). **M:** single column; the ToC becomes a
disclosure; sidenotes inline.

## WF-33 — Docs catalog `/docs`

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ THE LIBRARY                                                                                      │
│ Docs                                                                                             │
│ Learning roadmaps, written the long way: every claim measured, every topic self-contained.       │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ▓▓▓▓▓ cover ▓▓▓▓▓   CP Knowledge Base                                                        │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   From arrays to advanced graph algorithms, in 8 phases.                   │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   66 topics · 24 published · updated 2 days ago                            │ │
│ │                     [[ Open roadmap ]]  ‹Start reading: 00.01.01 Hello, C++›                 │ │
│ │                     Signed in: ▮▮▮▯▯▯▯▯▯▯ 12% · ‹Continue: std::vector §4›                   │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

The progress line appears only for signed-in readers (server-rendered dynamic hole); otherwise
"‹Sign in› to track your progress" in `--muted`.

## WF-34 — Roadmap map `/docs/[roadmap]`

**FRs:** FR-DOCS-02.

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ‹Docs› / CP Knowledge Base                                                                       │
│ CP Knowledge Base                                                                                │
│ 66 topics · 24 published · ~31 h of reading                                                      │
│ [ ⌕ Find a topic_______________ ]  Show: (o) All ( ) Published ( ) Coming soon    [ Expand all ] │
│ Signed out: ‹Sign in› to save your progress across devices. (1)                                  │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ I   PHASE 0 — FOUNDATIONS                                                          8/8 published │
│     ▸ 1 Basics (8)                                                                               │
│ II  PHASE 1 — CORE CP TOOLKIT                                                     10/24 published│
│     ▾ 1 Basics                                                                                   │
│       01.01.13  Lambdas & Comparators ..................... 25 min   ● published   ▮▮▮▮▯ (2)     │
│       01.01.14  std::vector ................................ 30 min   ● published   ▮▮▯▯▯        │
│       01.01.15  std::string & Text Processing .............. —        ○ coming soon (3)          │
│     ▸ 2 Sorting & Searching (6)                                                                  │
│ III PHASE 2 — …                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M**

```text
┌────────────────────────────────────┐
│ CP Knowledge Base                  │
│ 66 topics · 24 published           │
│ [ ⌕ Find a topic_______ ]          │
│ [Show: All ▾]                      │
│════════════════════════════════════│
│ I · Phase 0 — Foundations      ▸   │
│ II · Phase 1 — Core CP Toolkit ▾   │
│   1 Basics                     ▾   │
│   01.01.14 std::vector             │
│   30 min · ● · ▮▮▯▯▯               │
│   01.01.15 std::string…            │
│   coming soon                      │
└────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | One quiet sign-in invitation; never a modal |
| (2) | Progress dots only when signed in (sections read / total); `aria-label="8 of 13 sections read"` |
| (3) | Planned topics are listed but not linked (text colour `--muted`), with "coming soon" |

**Interaction:** phases/modules are disclosure buttons (`aria-expanded`); the module containing
the reader's last-read topic is expanded by default; the search filters in place with a live count.

## WF-35 — Reading-room home `read…/`

Generated, Marble & Ink: "The Reading Room" title, roadmap cards (as WF-33), latest 5 essays, and
a link back to `eyasir329.dev`. The runtime chip is compact.

## WF-36 — Roadmap root (generated) `read…/docs/cp/`

Uses the **roadmap's** theme CSS (the same look as the topics).

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CP Knowledge Base                                                             ‹eyasir329.dev›  ◐ │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ CP Knowledge Base                                                                                │
│ From arrays to advanced graph algorithms, in 8 phases.   Licence: CC BY-NC-SA 4.0                │
│                                                                                                  │
│ ┌─ Signed in ─────────────────────────────────────────┐  ┌─ Signed out ──────────────────────┐   │
│ │ 37 of 280 sections read · 4 topics completed        │  │ Sign in to track your progress    │   │
│ │ ‹Continue: std::vector › §4 Growth›                 │  │ across devices. [ Sign in ]       │   │
│ └─────────────────────────────────────────────────────┘  └───────────────────────────────────┘   │
│                                                                                                  │
│ Phase 0 — Foundations ............................. 8 topics · ▮▮▮▮▮▮▮▮▯▯ (signed in)            │
│ Phase 1 — Core CP Toolkit ......................... 24 topics · ▮▮▯▯▯▯▯▯▯▯                       │
│ …                                                                                                │
│                                                              (runtime chip, bottom-right) ▣      │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Only **one** of the two boxes is shown (depending on the session); both are drawn here for
comparison.

## WF-37 — Phase / module index (generated) `read…/docs/cp/phase-1/1_basics/`

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CP Knowledge Base / Phase 1 / Basics                                                          ◐  │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ PHASE 1 — CORE CP TOOLKIT · MODULE 1                                                             │
│ Basics                                                                                           │
│ The containers and idioms used in almost every solution.                                         │
│ 16 topics · 10 published · ~6 h                                                                  │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ 01.01.13  Lambdas & Comparators          25 min   13/13 read ✓   5/6 solved                      │
│ 01.01.14  std::vector   ← next (1)       30 min    8/13 read     3/11 solved                     │
│           The resizable array you will use in almost every solution…                             │
│ 01.01.15  std::string & Text Processing  coming soon                                             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

(1) "Next" = first topic not completed. Signed out: counts replaced by a single sign-in line at the
top.

## WF-38 — Topic page with the runtime chip `read…/docs/cp/phase-1/1_basics/3_std_vector/`

The page body is the **author's bundle, unchanged** (reference layout shown). Annotated are the only
platform-driven behaviours.

**D — signed out**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CP Knowledge Base / Phase 1 / Basics                                     [Contents] [Theme]      │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ 01.01.14 · PHASE 1 — CORE CP TOOLKIT · TOPIC 3 OF 66                                             │
│ std::vector                                                                                      │
│ The resizable array you will use in almost every solution…                                       │
│ 13 sections · ~30 min · 11 simulations · 11 practice problems · prerequisite: Arrays…            │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ PROGRESS 0% (1)       │ Section 01                                                               │
│ ▯▯▯▯▯▯▯▯▯▯            │ What it is                          [ ] mark read (2, disabled)          │
│ CONTENTS              │ ┌──────────────────────────────────────────┐                             │
│ 01 What it is         │ │ Sign in to track your progress  ‹Sign in›│ (3) tooltip on tap/focus    │
│ 02 Construction       │ └──────────────────────────────────────────┘                             │
│ 03 The operations     │ …body, figures, "Run it" demos, quizzes all work… (4)                    │
│ …                     │                                                                          │
│                       │ PROBLEMS TO SOLVE                                                        │
│                       │ [ ] CSES 1621 Distinct Numbers (disabled)                                │
│                       │                                                                          │
│                       │                        ┌───────────────────────────────────┐             │
│                       │                        │ ◯  Sign in to track progress  (5) │             │
│                       │                        └───────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**D — signed in**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ PROGRESS 38% (1)      │ Section 04                                                               │
│ ▮▮▮▮▯▯▯▯▯▯            │ Why push_back is O(1) amortised     [x] mark read ✓ (2)                  │
│ CONTENTS              │ …                                                                        │
│ ✓01 What it is        │ PROBLEMS TO SOLVE                                                        │
│ ✓02 Construction      │ [x] CSES 1621 Distinct Numbers                                           │
│ ✓03 The operations    │ [ ] CSES 1070 Permutations                                               │
│ ›04 Why push_back…    │                        ┌───────────────────────────────────┐             │
│                       │                        │ (NR) Progress saved ✓        ▾ (6) │            │
│                       │                        └───────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M — signed out**

```text
┌────────────────────────────────────┐
│ CP KB / Phase 1 / Basics  [≡][◐]   │
│ 01.01.14 · TOPIC 3 OF 66           │
│ std::vector                        │
│ The resizable array you…           │
│════════════════════════════════════│
│ Section 01                         │
│ What it is     [ ] mark read       │
│ …                                  │
│                                    │
│               ┌──────────────────┐ │
│               │ ◯ Sign in to     │ │
│               │   save progress  │ │
│               └──────────────────┘ │
└────────────────────────────────────┘
```

| # | Element | Spec |
|---|---|---|
| (1) | Author's progress box | Driven by the author's script from browser storage; the runtime keeps it at 0% when signed out and hydrates it from the server when signed in |
| (2) | "Mark read" controls | Signed out: `disabled` + `aria-describedby` → hint (3). Signed in: enabled; changes are saved to the server |
| (3) | Hint | Appears on tap/click/focus of a disabled control; one-line with a Sign in link; dismissible; shown at most once per page view |
| (4) | Content | Unaffected by sign-in state: demos, quizzes, videos, theme all work |
| (5) | Runtime chip (signed out) | Bottom-right, 44 px tall; "Sign in to track progress"; on M it collapses to a 44 px circle after the first scroll and expands on tap |
| (6) | Runtime chip (signed in) | Avatar initials + "Progress saved ✓"; menu: *My progress*, *Sign out*. While saving: "Saving…"; offline: "Saved on this device, will sync" |

**Chip rules:** never covers the author's content controls (it shifts up when a bottom bar is
present); `Esc` collapses it; it inherits the page's `--paper/--ink/--accent` tokens, falling back
to Marble & Ink; reduced motion disables its slide-in.

## WF-39 — Coming soon (generated)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CP Knowledge Base / Phase 1 / Basics                                                          ◐  │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ 01.01.15 · COMING SOON                                                                           │
│ std::string & Text Processing                                                                    │
│ This topic is being written. It will sit between std::vector and Pairs & Tuples.                 │
│ Meanwhile: ← ‹std::vector›   ‹Back to Basics›   Prerequisites: ‹Arrays›                          │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## WF-40 — Private notice and WF-41 — Content-origin 404

- **Private notice:** "The source notes for this topic are private. The sources are credited in the
  page footer." + ‹Back to the topic›.
- **404:** roadmap-styled; "This page isn't in the library." + ‹Roadmap home› + ‹Search on
  eyasir329.dev›.

Both `noindex`, with the roadmap's header and theme.
