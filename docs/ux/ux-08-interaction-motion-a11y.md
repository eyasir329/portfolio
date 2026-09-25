# UX-08 — Interaction, Motion & Accessibility

> Status: **Draft v0.4** · Related: [02 NFR-A11Y](../02-non-functional-requirements.md), [04 Design system §7](../04-design-system.md), [05 3D §5](../05-3d-experience.md), [UX-07](ux-07-components-and-states.md)

This document specifies how every page is **operated** (pointer, touch, keyboard, screen reader), how
it **moves**, and what each page must satisfy to meet **WCAG 2.2 AA** (NFR-A11Y-01). Wireframe IDs
refer to UX-02…UX-06.

---

## 1. Interaction model

| Input | Design rule |
|---|---|
| **Pointer** | Hover is an enhancement only; nothing is revealed *only* on hover (card actions, tooltips and table actions are also reachable by focus and tap) |
| **Touch** | Targets ≥ 44 × 44 px on M; no gesture-only actions (swipe to dismiss always has a ✕); no pinch-zoom lock (`user-scalable` stays on) |
| **Keyboard** | Every action reachable in a logical order; visible focus everywhere; shortcuts never override browser or screen-reader keys and are listed in a `?` help dialog |
| **Screen reader** | Landmarks, one `h1`, ordered headings, names for every control, live regions for background changes (§5) |
| **Dragging** | Every drag (reorder, re-parent, drop files) has a non-drag alternative: arrow keys, a "Move to…" menu, or a file picker (WCAG 2.5.7) |
| **3D** | Decorative and `aria-hidden`; information in the scene also exists as text/table (NFR-A11Y-04); pointer interaction on the canvas is optional sugar |

## 2. Keyboard map

### 2.1 Global (main origin)

| Key | Action | Notes |
|---|---|---|
| `Tab` / `Shift+Tab` | Move focus | First stop is the skip link |
| `⌘K` / `Ctrl K` / `/` | Open search (WF-02) | `/` only when focus is not in a text field |
| `Esc` | Close the topmost dialog, sheet, menu or tooltip | Focus returns to the trigger |
| `↑` `↓` `↵` | Move and open in search results and menus | |
| `?` | Keyboard shortcuts dialog | Only where shortcuts exist (admin, search) |

### 2.2 Reading room (content origin)

| Key | Action | Notes |
|---|---|---|
| `Tab` into the chip | The chip is the **last** stop in the tab order of every page | It is fixed, so it must not steal early focus |
| `Space` on a section tick | Toggle ticked (signed in) | Signed out: the control is `aria-disabled` and its description says "Sign in to save your progress" |
| Topic pages' own shortcuts | Belong to the bundle, not the platform | The runtime adds no global shortcuts to uploaded pages |

### 2.3 Admin

| Key | Action |
|---|---|
| `⌘K` | Admin command palette (screens, entities, actions) |
| `⌘S` | Save the current form or *Save version* in the HTML editor |
| `⌘↵` | Primary action of an open dialog |
| `g` then `d` / `p` / `b` / `o` / `m` / `s` | Go to Dashboard / Projects / Blog / Docs / Messages / Sync & judges |
| `j` / `k`, `e`, `!` | Next / previous message, archive, mark spam (WF-76) |
| Outline (WF-67): `↑↓` `→←` `Enter` `⌘↑` `⌘↓` `Tab` `Shift+Tab` | Move, expand/collapse, rename, reorder, indent/outdent |
| Sortable lists: `Space`, arrows, `Space`, `Esc` | Grab, move, drop, cancel (each announced) |

Single-key shortcuts (`g`, `j`, `k`, `e`, `!`) are inactive inside text fields and can be turned off
in the shortcuts dialog (WCAG 2.1.4).

## 3. Motion specification

Tokens from [04 §7](../04-design-system.md): `--dur-1` 120 ms, `--dur-2` 240 ms, `--dur-3` 480 ms,
`--ease-out`, `--ease-in-out`.

| # | Element | Trigger | Motion | Duration / easing | Reduced motion (or "3D off") |
|---|---|---|---|---|---|
| M1 | Links, buttons | Hover / focus | Colour, underline | `--dur-1` ease-out | Same (colour changes are not motion) |
| M2 | Project card | Hover | 2 px lift; image greyscale → colour | `--dur-2` ease-out | Colour only, no lift |
| M3 | Section heading + cards | Scrolled into view (once) | Opacity 0 → 1, translateY 12 → 0 px | `--dur-3` ease-out, 60 ms stagger, max 6 items | Visible immediately |
| M4 | Dialogs, menus, sheets | Open / close | Fade + 8 px scale/slide | `--dur-2` ease-out in, 180 ms ease-in out | Fade only, 120 ms |
| M5 | Mobile nav sheet | Open | Slide from the right | 240 ms ease-out | Fade |
| M6 | Header | Scroll down / up (M only) | Slide out / in | 200 ms | Never hides |
| M7 | Page transition | Navigation | View Transitions cross-fade + shared title | 240 ms | Off |
| M8 | Toast | Appear / leave | Slide 8 px + fade | `--dur-2` | Fade |
| M9 | Runtime chip | State change (C → B) | Text cross-fade; ✓ draws in | 200 ms | Text swap only |
| M10 | Progress bars | Value change | Width animates | 400 ms ease-in-out | Jump to value |
| M11 | Skeletons | Loading | Shimmer | 1.2 s loop | Static tint (no shimmer) |
| M12 | Hero 3D (S1 Plaster Graph) | Idle | Slow rotation ≤ 6°/s; pointer parallax ≤ 4° | Continuous; pauses off-screen and on hidden tab | Poster image, no canvas |
| M13 | Colonnade (S2) | Scroll through `/cp` | Camera dolly scrubbed by scroll | `--dur-3d` | Static frame + table twin |
| M14 | Plinth (S3), Broken column (S4) | Enter view | Single settle animation | ≤ 1.5 s | Poster |
| M15 | Smooth scroll (Lenis) | Pages with scroll-linked 3D only | — | — | Off; also off on touch devices |

**Rules:** nothing flashes more than 3 times per second (WCAG 2.3.1); no auto-playing motion longer
than 5 s without a pause control, except the idle 3D, which has the "3D: On/Off" toggle (WCAG
2.2.2); body text never animates; motion never delays an interaction (the target is usable during its
entrance animation).

## 4. WCAG 2.2 AA: how the design meets each risk area

| WCAG criterion | Risk on this site | Design answer | Screens |
|---|---|---|---|
| 1.1.1 Non-text content | Project images, figures, 3D, charts | Alt text required in the media library; 3D `aria-hidden` + text twin; charts with tables | WF-10, 13, 15, 71 |
| 1.3.1 Info & relationships | Wall labels, timelines, roadmap tree | Semantic lists, headings, `dl` for fact sheets, `tree`/nested lists for roadmaps | WF-12, 14, 34 |
| 1.4.3 / 1.4.11 Contrast | Muted meta text, faint ornaments, status glyphs | Token ratios in [04 §3](../04-design-system.md): `--muted` ≥ 6.2 : 1; `--faint` never used for text | All |
| 1.4.10 Reflow | Admin tables, code blocks, topic pages | No horizontal page scroll at 320 px; tables scroll inside their own container | All |
| 1.4.12 Text spacing | Tight small-caps kickers | Layout tolerates 1.5 line height / 0.12 em letter spacing overrides | All |
| 1.4.13 Content on hover/focus | Tooltips (disabled ticks, judge status) | Dismissible (`Esc`), hoverable, persistent until moved away | WF-38, 15, 73 |
| 2.1.1 Keyboard | Drag-and-drop, 3D hover tooltips, code editor | Keyboard alternatives (§1); 3D tooltips mirrored by table-row focus | WF-15, 61, 64, 67 |
| 2.1.4 Character key shortcuts | Admin single-key shortcuts | Off inside fields; can be disabled | WF-60…81 |
| 2.4.1 Bypass blocks | Long header and sidebar | Skip link; admin "Skip to editor" | All |
| 2.4.3 Focus order | Margin column (ToC), fixed chip | DOM order = visual order; chip last | WF-13, 32, 38 |
| 2.4.7 / 2.4.13 Focus visible / appearance | Custom cards and chips | 2 px accent outline, 2 px offset, ≥ 3 : 1 against adjacent colours | All |
| **2.4.11 Focus not obscured** (new in 2.2) | Sticky header and the fixed chip can cover focused elements | `scroll-padding-top` = header height + 16 px; `scroll-padding-bottom` = chip height + 16 px on content pages | WF-00, 38 |
| **2.5.7 Dragging movements** (new) | Reorder lists, outline, file drop | Non-drag alternatives (§1) | WF-61, 64, 67, 69 |
| **2.5.8 Target size** (new) | Inline chips, table icons, tag pills | ≥ 24 × 24 px with spacing; 44 px on M | All |
| 3.2.3 Consistent navigation | Two origins | Same header vocabulary and chip on both (U7) | WF-00, 35–41 |
| **3.2.6 Consistent help** (new) | Where to get help | Contact link always in the footer at the same place; admin help in the user menu | WF-04 |
| 3.3.1 / 3.3.3 Error identification & suggestion | Contact form, admin forms, uploads | Inline errors that say what to do + summary (UX-07 §3); upload errors with fix hints | WF-17, 62, 69 |
| **3.3.7 Redundant entry** (new) | Re-typing after a failed submit or sign-in | Form state kept after errors and after sign-in round trips; return to the same section | WF-17, 50 |
| **3.3.8 Accessible authentication** (new) | Sign-in | OAuth only (no passwords, no CAPTCHA puzzle); Turnstile is invisible | WF-50 |
| 4.1.3 Status messages | Saves, toasts, search counts | `role="status"` / `aria-live="polite"`; errors `role="alert"` | §5 |

## 5. Screen-reader annotations per page

| Screen | Landmarks & headings | Focus on arrival | Live regions & names | Special notes |
|---|---|---|---|---|
| WF-00…05 shell | `header` › `nav[aria-label="Primary"]`; `footer` | Skip link first | Theme toggle: "Theme: system" | Mobile sheet is a modal dialog with a heading |
| WF-10 Home | `h1` = name; `h2` per section (kickers are visually above, but inside the heading's `aria-describedby`) | Top of page | — | Hero canvas `aria-hidden`; proof figures read as "1000 plus problems solved" |
| WF-12 Projects | `h1` Projects; list of articles | Top | Result count "8 projects" `role="status"` after filtering | Filter sheet (M) is a dialog |
| WF-13 Project | `h1` title; `aside` fact sheet labelled "Project facts" | Top | — | Architecture diagram has a text description |
| WF-14 Experience | `h1`; years as `h2`; entries as `article` | Top | — | |
| WF-15 CP Journey | `h1`; sections: accounts, rating, contests, milestones | Top | "Data as of 25 Sep 2026" | Colonnade has a table twin; heatmap has a summary sentence; rank colours are backed by rank titles |
| WF-17 Contact | `h1`; `form` with name | First field only after the user activates it (no autofocus) | Error summary `role="alert"`; success panel gets focus | Turnstile iframe labelled |
| WF-19 Search | `h1` "Results for …" | Results heading | Count `role="status"` | Groups are `h2`s |
| WF-20 404/500 | `h1` | `h1` | — | Broken-column scene decorative |
| WF-30/31 Blog | `h1`; posts as a list | Top | — | Posts that open on the reading room are ordinary links |
| WF-32 Essay template | `h1`; ToC `nav[aria-label="Contents"]`; sidenotes as `aside` | Top | — | Template ships with the same focus and skip-link rules |
| WF-33/34 Docs | `h1`; roadmap as nested lists (tree on D, with `aria-expanded`) | Top | Signed in: "Progress: 8 of 24 topics" text | Status glyphs have text ("completed") |
| WF-35…41 Reading room | Generated pages follow the same landmarks | Top; on return from sign-in, the saved anchor | Chip region `role="status"` announces "Progress saved" at most once per 10 s | The runtime injects the chip last in `body`; it never adds `aria-hidden` to page content |
| WF-38 Topic | Bundle's own headings | Anchor from URL | Tick changes announce "Section 3 marked read" | Disabled ticks use `aria-disabled`, not `disabled`, so they stay focusable and explainable |
| WF-50 Sign in | `h1` "Sign in" | `h1` | Error messages `role="alert"` | Provider buttons: "Continue with Google" |
| WF-51/52 `/me` | `h1` "My progress"; `h2` per card | `h1` | — | Activity calendar has a summary sentence; bars have text counts |
| WF-53/54 Settings, delete | `h1`; dialog labelled by its title | Dialog: *Cancel* | Typed-confirmation field described by the consequence text | |
| WF-60…81 Admin | `nav[aria-label="Admin"]`, `main`; `h1` per screen | `h1` (after route change) | Save state "Saved" `role="status"`; job progress `aria-valuenow` | Tables have captions; icon-only buttons have labels; the HTML editor has "Skip to preview" |

## 6. Focus management rules

| Situation | Rule |
|---|---|
| Client-side route change | Move focus to the new page's `h1` (`tabindex="-1"`) and announce the title |
| Open dialog / sheet / menu | Focus the first meaningful control (or *Cancel* for destructive dialogs); trap focus |
| Close | Return focus to the element that opened it |
| Sign-in round trip (F-03) | Return to the same URL and anchor; focus the section heading the reader left from |
| Item deleted from a list | Focus the next row (or the previous if last); announce "Deleted. Undo available" |
| Form submit with errors | Focus the error summary |
| Toast with action | Toasts never take focus; the action is also reachable via the `F6`-style region cycle and stays 10 s, pausing on focus |
| Infinite/incremental lists | "Load more" button (no infinite scroll); focus moves to the first new item |

## 7. Accessibility test matrix

| Tool / AT | Browser | Scope | When |
|---|---|---|---|
| axe (automated, in CI) | Chromium | Every route in the Playwright suite | Every PR |
| Keyboard-only pass | Firefox, Chrome | Critical flows F-01…F-06 | Each phase |
| NVDA | Firefox / Chrome (Windows) | Home, Project, CP, Topic + chip, Sign-in, `/me` | Before launch |
| VoiceOver | Safari (macOS, iOS) | Same, plus mobile nav and chip on iPhone | Before launch |
| TalkBack | Chrome (Android) | Topic + chip, `/me` | Before launch |
| Zoom 200% / 400% and 320 px reflow | All | All public screens | Each phase |
| Reduced motion + "3D off" | All | Home, CP, 404 | Each phase |
| Windows high contrast / forced colours | Edge | Focus rings, badges, chip | Before launch |

Results are recorded against the wireframe IDs in [UX-09](ux-09-ux-audit.md) §4.
