# UX-02 — Layout, Grid & Global Shell

> Status: **Draft v0.4** · Related: [04 Design system §2](../04-design-system.md), [03 IA §4](../03-information-architecture.md), [UX-08](ux-08-interaction-motion-a11y.md)

---

## 1. Grid & breakpoints

| Breakpoint | Width | Columns | Gutter | Side padding | Typical layout |
|---|---|--:|---|---|---|
| M (mobile) | 320–767 px | 4 | 16 px | 16–24 px | Single column; sticky bottom actions where useful |
| T (tablet) | 768–1279 px | 8 | 24 px | 32 px | Single column with wider media; 2-up cards |
| D (desktop) | 1280–1535 px | 12 | 24 px | auto (max 1216 px container) | Content 8 cols + margin 4 cols (ToC/facts) |
| W (wide) | ≥ 1536 px | 12 | 32 px | auto | Same as D; extra space goes to margins, never to line length |

```text
D: 1216 px container, 12 columns
|m|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |m|
   [──────────── reading column (38 rem) ────────────]   [─ margin (14 rem) ─]
   [────────────────────── wide media (48 rem) ──────────────────────]
```

**Vertical rhythm:** sections separated by 96 px (D) / 64 px (M); section heading → content 24 px;
paragraph spacing 1 em; cards 24 px apart.

**Safe areas:** fixed elements (header, runtime chip, mobile sticky bars) respect
`env(safe-area-inset-*)`.

## 2. Reflow rules

| Pattern | D | T | M |
|---|---|---|---|
| Hero | Text 7 cols left, 3D 5 cols right | Text full width, 3D below at 60% height | Text, then 3D poster/canvas 240 px tall |
| Card grids | 3-up | 2-up | 1-up (stacked wall labels) |
| Margin column (ToC, fact sheet) | Sticky right column | Collapses into a "Contents" disclosure under the title | Same as T |
| Tables | Full | Horizontal scroll inside a bordered container with a scroll shadow | Card-per-row layout for ≤ 4 columns; scroll for more |
| Filters | Inline bar | Inline bar (wraps) | "Filter" button → bottom sheet |
| Admin sidebar | Expanded | Icons only | Off-canvas sheet |

## 3. WF-00 — Header (main origin)

**D (≥ 1280 px)**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ EYASIR AHAMED    Work  Experience  CP  Blog  Docs  About   [⌕ ⌘K]   ◐   ‹Sign in›  [[ Contact ]] │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
  (1)              (2)                                       (3)      (4) (5)        (6)
```

**T (768–1279 px)**

```text
┌──────────────────────────────────────────────────────────────────────┐
│ EYASIR AHAMED        Work  CP  Blog  Docs   More ▾   ⌕  ◐  ‹Sign in› │
└──────────────────────────────────────────────────────────────────────┘
```

**M (≤ 767 px)**

```text
┌────────────────────────────────────┐
│ EYASIR AHAMED           ⌕   ≡ (7)  │
└────────────────────────────────────┘
```

| # | Element | Behaviour |
|---|---|---|
| (1) | Wordmark (small caps) | Links home; `aria-label="Eyasir Ahamed, home"` |
| (2) | Primary nav | Current section: accent underline + `aria-current="page"`; hover: ink colour |
| (3) | Search trigger | Opens WF-02; shows `⌘K`/`Ctrl K` hint on D only |
| (4) | Theme toggle | Cycles system → light → dark; tooltip shows the current mode |
| (5) | Account entry | Signed out: quiet text link "Sign in". Signed in: 28 px avatar → WF-03 |
| (6) | Contact | The only filled button in the header |
| (7) | Menu | Opens WF-01; label "Menu" for screen readers |

**Behaviour:** sticky; 64 px tall (D) / 56 px (M); translucent paper with blur after 8 px of
scroll plus a hairline bottom border; hides on scroll-down and reappears on scroll-up on M only
(never on D, never under reduced motion).

## 4. WF-01 — Mobile navigation sheet

```text
┌────────────────────────────────────┐
│ EYASIR AHAMED                 ✕    │
│════════════════════════════════════│
│                                    │
│  Work                          →   │
│  Experience                    →   │
│  CP Journey                    →   │
│  Blog                          →   │
│  Docs                          →   │
│  About                         →   │
│                                    │
│════════════════════════════════════│
│  [[ Contact ]]   [ Download CV ]   │
│                                    │
│  ‹Sign in›  ·  ◐ Theme  ·  3D: On  │
│                                    │
│  GitHub · LinkedIn · Codeforces    │
└────────────────────────────────────┘
```

Full-screen sheet, serif links at 28 px, focus trapped, `Esc`/✕ closes and returns focus to the
menu button. Slides in 240 ms from the right (fade under reduced motion).

## 5. WF-02 — Search dialog (⌘K)

**D**

```text
┌────────────────────────────────────────────────────────────────┐
│ ⌕ [ vector______________________________________ ]    esc      │
│════════════════════════════════════════════════════════════════│
│ DOCS                                                           │
│ > std::vector › Why push_back is O(1) amortised     01.01.14   │
│   std::vector › 2D vectors                          01.01.14   │
│ BLOG                                                           │
│   Measuring std::vector — "…every claim measured…"  Essay      │
│ WORK                                                           │
│   NEUPC — "…multi-judge tracker…"                   Project    │
│════════════════════════════════════════════════════════════════│
│ ↑↓ to move · ↵ to open · ‹See all results for "vector"›        │
└────────────────────────────────────────────────────────────────┘
```

**M:** full-screen; input at top; results scroll; the keyboard hint row is hidden.

| State | Content |
|---|---|
| Empty input | "Recent searches" (local) + shortcuts: Work, CP Journey, Docs, Download CV |
| Loading | Skeleton rows after 150 ms (not immediately) |
| No results | "Nothing for 'xyz'. Try a topic like 'segment tree' or browse ‹Docs›." |
| Error | "Search is unavailable right now." + link to `/docs` |

## 6. WF-03 — Account menu (signed in)

```text
                                ┌──────────────────────────────┐
                    (avatar) ──▶│ Nabila Rahman                │
                                │ nabila@example.com           │
                                │══════════════════════════════│
                                │ My progress                  │
                                │ Settings                     │
                                │ Admin            (admins)    │
                                │══════════════════════════════│
                                │ Sign out                     │
                                └──────────────────────────────┘
```

Menu button semantics (`aria-haspopup="menu"`), arrow-key navigation, `Esc` closes. "Admin" appears
only for owner/editor.

## 7. WF-04 — Footer (colophon)

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ INDEX                   ELSEWHERE             READERS                   COLOPHON                 │
│ Work                    GitHub                Track your roadmap        Set in Newsreader &      │
│ Experience              LinkedIn              progress → ‹Sign in›      Geist. Built with        │
│ CP Journey              Codeforces            (or ‹My progress›)        Next.js, Three.js and    │
│ Blog · Docs · About     Email                                           Supabase.                │
│ Resume · Privacy · Terms  RSS                                           Last updated 25 Sep 2026 │
│══════════════════════════════════════════════════════════════════════════════════════════════════│
│ © 2026 Eyasir Ahamed · Text CC BY-NC-SA 4.0 · Code MIT                           ↑ Back to top   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M:** columns stack in the order Index → Elsewhere → Readers → Colophon, each a disclosure
(collapsed by default except Index).

## 8. WF-05 — Utility controls

| Control | Location | States | Notes |
|---|---|---|---|
| Theme toggle | Header, mobile sheet | System ◐ / Light ○ / Dark ● | Persisted; no flash on load |
| 3D toggle | Mobile sheet, footer (D) "3D: On/Off", also a small toggle in the hero corner | On / Off / Unavailable (greyed with tooltip "Your device shows a still image") | Off also disables Lenis smooth scroll |
| Announcement bar | Above the header when enabled | Text + link + ✕ | Dismissal remembered per announcement id |
| Skip link | First focusable element | Visible on focus: "Skip to content" | Jumps to `main` |
| Back to top | Footer, and floating after 2 screens on long pages (M) | — | Moves focus to the `h1` |

## 9. Page template anatomy

```text
┌─ skip link ─────────────────────────────────────────────┐
│ [announcement]                                          │
│ WF-00 header (sticky)                                   │
├─ main ──────────────────────────────────────────────────┤
│ breadcrumb (depth ≥ 2)                                  │
│ kicker · h1 · standfirst · meta row                     │
│ page sections …                                         │
├─ footer (WF-04) ────────────────────────────────────────┤
└─────────────────────────────────────────────────────────┘
```

Landmarks: `header` (banner) · `nav` (primary, labelled) · `main` · `aside` (margin column) ·
`footer` (contentinfo). One `h1` per page.
