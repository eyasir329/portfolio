# 04 — Design System: "Marble & Ink"

> Status: **Draft v0.1** · Related: [05 3D](05-3d-experience.md), [02 NFR §2](02-non-functional-requirements.md), [03 IA §5](03-information-architecture.md)

---

## 1. Concept

**Marble & Ink** treats the site as a small **museum-library of an engineer's work**. The
classical part comes from books and galleries: serif typography, generous margins, hairline rules,
Roman numerals, small capitals, captions and colophons. The minimal part comes from restraint: one
accent colour, no gradients, no drop shadows on UI, no decoration that doesn't carry information.

The 3D is the *sculpture* in the gallery. Every scene is monochrome **plaster white**, lit like a
studio photograph, sitting on the same paper colour as the page, so it reads as part of the
composition rather than a tech demo.

| Metaphor | Where it shows up |
|---|---|
| **Museum wall label** | Project cards: *Title*, years, *Medium:* stack, one-line description |
| **Plaster sculpture** | 3D scenes: graph (home), colonnade (CP), plinth (projects), broken column (404) |
| **Book typography** | Blog: drop cap, sidenotes, ToC in the margin, footnote-style references |
| **Chronicle** | Experience and milestones as a chronology with Roman-numeral year ornaments |
| **Library / codex** | Docs: roadmaps presented as volumes → chapters (phases) → sections (modules) → topics |
| **Colophon** | Footer states typefaces, tools and last-updated date, as a book's colophon does |

### 1.1 Design principles

1. **Paper first.** Typography and whitespace carry the design; if a page works in plain black on
   ivory, it's done.
2. **One accent.** Oxblood is used only for links, focus, the current state and one highlight per
   view.
3. **Hairlines, not boxes.** Group content with 1 px rules and spacing, not cards with borders and
   shadows.
4. **Sculpture, not spectacle.** One 3D object per view, slow and quiet, never behind body text.
5. **Evidence over adjectives.** Every claim has a number, link or artefact next to it (the reference
   bundle's "every number measured" ethos, applied to the portfolio).
6. **Motion with a reason.** Motion shows continuity (where something came from) or state change.
   Nothing loops for decoration except the idle 3D, and even that stops when motion is reduced.
7. **Clear labels beat clever labels.** The classical flavour lives in kickers and ornaments;
   navigation labels stay plain ("Blog", not "Scriptorium").

## 2. Layout

| Token | Value | Use |
|---|---|---|
| `--page-max` | `76rem` (1216 px) | Outer container (same as the reference bundle) |
| `--measure` | `38rem` (~68 characters) | Body text column |
| `--measure-wide` | `48rem` | Figures, code blocks, tables |
| `--gutter` | `clamp(1rem, 4vw, 2rem)` | Page side padding |
| Grid | 12 columns, `gap: 1.5rem` | Desktop layouts; collapses to 4 columns < 768 px |
| Margin column | `14rem` | Blog ToC/sidenotes and project fact sheet at ≥ 1280 px |

**Spacing scale** (4 px base): `0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12 rem` → tokens
`--space-1 … --space-11`. Vertical rhythm between major sections: `--space-9` (6 rem) desktop,
`--space-8` mobile.

**Breakpoints:** `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536` (px).

## 3. Colour

One neutral scale (warm paper to ink), one accent, and semantic colours used only in admin and
alerts. All contrast ratios below were calculated with the WCAG 2.x relative-luminance formula.

### 3.1 Light theme — "Paper"

| Token | Hex | Role | Contrast on `--paper` |
|---|---|---|---|
| `--paper` | `#F5F1E8` | Page background (warm ivory) | — |
| `--paper-raised` | `#FBF9F4` | Popovers, inputs, code blocks | — |
| `--paper-sunk` | `#ECE6DA` | Wells, table stripes, hover | — |
| `--ink` | `#15130F` | Headings, wordmark | **16.5 : 1** |
| `--text` | `#2B2822` | Body text | **13.0 : 1** |
| `--muted` | `#5F594F` | Secondary text, captions, meta | **6.2 : 1** (5.6 on sunk) |
| `--faint` | `#8C8578` | Non-text only: ornaments, disabled borders | 3.2 : 1 (**not for text**) |
| `--rule` | `#D8D1C3` | Hairline rules and dividers | decorative |
| `--accent` | `#8B2A1C` | **Oxblood / Pompeian red**: links, focus, active state | **7.6 : 1** |
| `--accent-wash` | `rgb(139 42 28 / 0.07)` | Selected rows, highlight marks | — |
| `--plaster` | `#ECE7DE` | 3D material base colour | — |

### 3.2 Dark theme — "Night library"

| Token | Hex | Contrast on `--paper` |
|---|---|---|
| `--paper` | `#12110F` | — |
| `--paper-raised` | `#1A1916` | — |
| `--paper-sunk` | `#0C0B0A` | — |
| `--ink` | `#F2EEE5` | **16.3 : 1** |
| `--text` | `#D9D3C7` | **12.7 : 1** |
| `--muted` | `#A39C90` | **6.9 : 1** |
| `--faint` | `#6F695F` | 3.5 : 1 (non-text only) |
| `--rule` | `#2C2A26` | decorative |
| `--accent` | `#E0826A` (terracotta, lifted for dark) | **6.8 : 1** |
| `--plaster` | `#CFC8BC` (3D lit a little darker so it doesn't glow) | — |

**Alternative accent** (owner choice `Q-07`): *Lapis* `#1E3A8A` light / `#8FA8F0` dark (9.2 : 1 /
8.1 : 1). Both pass AA and AAA for normal text.

**Semantic (admin and alerts only):** success `#2F6B4F`, warning `#8A6212`, danger = accent,
info `#2F4F7A`, each with a 7% wash. Codeforces rank colours are used **only** for rank titles on the
CP page (a data encoding, not decoration).

### 3.3 Theme mechanics

- Tokens are CSS custom properties on `:root`, overridden by `[data-theme="dark"]` and by
  `@media (prefers-color-scheme: dark)` when no explicit choice is stored. This is the same pattern
  the reference bundle uses (`:root:not([data-theme="light"])`), so the main site and the KB behave
  alike.
- A blocking inline script in `<head>` reads `localStorage['theme']` and sets `data-theme` before
  paint (no flash).
- Tailwind v4 exposes the tokens through `@theme` (`bg-paper`, `text-ink`, `border-rule`,
  `text-accent`…).

## 4. Typography

| Role | Family | Why | Source |
|---|---|---|---|
| **Display & reading serif** | **Newsreader** (variable: `opsz` 6–72, `wght` 200–800, italics) | Classical proportions, designed for screens; optical sizes let one family cover both large titles and body text | Google Fonts via `next/font` |
| **UI sans** | **Geist** (variable) | Neutral and precise; for navigation, labels, admin and data | Google Fonts via `next/font` |
| **Mono** | **Geist Mono** (variable) | Code, serials (`01.01.14`), tabular figures | Google Fonts via `next/font` |

Alternatives for the audit (`Q-06`): EB Garamond / Cormorant Garamond (more ornate) with Inter /
JetBrains Mono.

### 4.1 Type scale (major third, 1.25; fluid with `clamp`)

| Token | Size (mobile → desktop) | Line height | Family / weight | Use |
|---|---|---|---|---|
| `display` | 2.75 → 4.75 rem | 1.02 | Serif 400, `opsz` 72, tracking −0.02em | Home hero name |
| `h1` | 2.1 → 3.15 rem | 1.08 | Serif 450 | Page titles |
| `h2` | 1.6 → 2.0 rem | 1.2 | Serif 500 | Section titles |
| `h3` | 1.25 → 1.4 rem | 1.3 | Serif 600 | Sub-sections |
| `lede` | 1.15 → 1.3 rem | 1.55 | Serif italic 400 | Standfirst / positioning line |
| `body` | 1.0625 rem (17 px) | 1.7 | Serif 400 (`opsz` auto) | Long-form reading |
| `ui` | 0.9375 rem (15 px) | 1.5 | Sans 450 | Navigation, buttons, forms |
| `small` | 0.8125 rem | 1.5 | Sans 450 | Meta, captions |
| `kicker` | 0.7 rem, `letter-spacing: 0.12em`, uppercase **small caps** | 1.2 | Sans 650 | Section kickers ("I · SELECTED WORK") |
| `mono` | 0.875 em | 1.6 | Mono 400 | Code, serials, numbers |

**Figures:** `font-variant-numeric: tabular-nums` on stats and tables; `oldstyle-nums` in serif
body text.

### 4.2 Classical typographic devices

| Device | Rule |
|---|---|
| Section numerals | Home and long pages number sections with Roman numerals (I, II, III…) in the kicker; `aria-hidden` on the numeral, with the section name as the accessible heading |
| Small caps | Kickers and the proof strip use real small caps (`font-variant-caps: all-small-caps`) |
| Drop cap | First paragraph of a blog post: 3-line drop cap in the serif (`::first-letter`), disabled under 480 px |
| Sidenotes | Markdown footnotes render in the margin at ≥ 1280 px (Tufte-style) and as inline expandable notes below that |
| Hairline + ornament | Section breaks: a 1 px `--rule` line with an optional centred `§` or `·` ornament in `--faint` |
| Hanging punctuation | `hanging-punctuation: first` where supported (quotes in pull-quotes) |
| Captions | Italic serif caption, then a credit line in small sans `--muted` (mirrors the reference bundle's `<figcaption><b>…</b> … <span class="cred">`) |

## 5. Iconography & imagery

- **Icons:** Lucide at 1.5 px stroke, 16/20 px, `currentColor`. Brand marks (GitHub, LinkedIn,
  Codeforces…) from Simple Icons, monochrome.
- **Photography:** warm grayscale by default (CSS `filter: grayscale(1) sepia(.08)`), switching to
  full colour on hover/focus in galleries. This keeps the palette calm without destroying
  screenshots.
- **Screenshots:** always in a thin `--rule` frame with 2 px radius; never a fake browser chrome.
- **Diagrams:** Mermaid/SVG in `--text` strokes with the accent for the one highlighted path.
- **Charts:** one data colour (`--text` at 70%) plus the accent for the highlight/current value;
  gridlines in `--rule`; direct labels preferred over legends.

## 6. Components

### 6.1 Public components

| Component | Description | Notes |
|---|---|---|
| `SiteHeader` | Wordmark (small-caps name), nav, search, theme, Contact | Sticky, translucent paper background with backdrop blur, hairline bottom border (like the reference) |
| `MobileNav` | Full-screen sheet, large serif links, focus-trapped | |
| `SectionHeading` | Kicker (Roman numeral + label) + `h2` + optional link | |
| `WallLabel` (ProjectCard) | Title (serif), years, *Medium:* stack (italic), summary, status tag; hover lifts the image 2 px and shows it in colour | The signature component |
| `ProofStrip` | Row of figures with small-caps labels separated by hairlines | Numbers `tabular-nums` |
| `Timeline` | Vertical rule with year markers; entries with dates in mono | Experience, milestones |
| `StatCard` | Judge profile: logo, handle, rating (rank colour), max, solved | CP page |
| `RatingChart` | Line chart (SVG, server-rendered path + client tooltip) | Accessible table toggle |
| `Heatmap` | 53 × 7 grid, 5 tints of `--text` | Accessible summary text |
| `ContestRow` | Date · contest · team · rank/total · award | ICPC row visually emphasised |
| `PostListItem` | Title, date, reading time, tags; table-of-contents styling with dotted leaders | |
| `Prose` | Markdown renderer styles: headings, lists, quotes, code, tables, figures, callouts, sidenotes | Shared by public pages and the admin preview |
| `CodeBlock` | Shiki dual-theme, filename, line numbers optional, highlight lines, copy button, language tag | Mirrors the reference bundle's copy/lang UX |
| `Callout` | `note`, `tip`, `warning`, `evidence`: left hairline in the accent + small-caps label | |
| `Figure` | Image + caption + credit + licence | |
| `VideoFacade` | Thumbnail + play button → `youtube-nocookie` iframe on click | Same behaviour as the reference bundle |
| `RoadmapMap` | Phase → module → topic tree with status dots and serials | `/docs/[roadmap]` |
| `SearchDialog` | ⌘K palette: grouped results, keyboard navigation | |
| `ThemeToggle`, `MotionToggle` | Icon buttons with text labels for screen readers | |
| `ContactForm` | Labels above fields, Turnstile, inline errors | |
| `Scene3D` | Wrapper that decides poster vs. canvas ([05](05-3d-experience.md)) | |
| `Colophon` (Footer) | Four columns, see [03 §4.2](03-information-architecture.md) | |

### 6.2 Admin components

Built on **shadcn/ui** (Radix primitives + Tailwind), themed with the same tokens but in the sans
face, with denser spacing. Key pieces: `DataTable` (TanStack Table: server pagination, sort, filter,
column visibility, bulk actions), `EntityForm` (React Hook Form + Zod), `MarkdownEditor` (CodeMirror 6
+ live `Prose` preview), `MediaPicker`, `SortableList` (dnd-kit), `StatusBadge`, `ConfirmDialog`
(typed confirmation for destructive actions), `DiffViewer` (KB import dry-run, post revisions),
`FileTree` (KB bundle browser), `JobLog` (sync/import logs), `Toast` (sonner).

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances, hover |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions between states |
| `--dur-1` | 120 ms | Hover and focus colour |
| `--dur-2` | 240 ms | Menus, dialogs, tooltips |
| `--dur-3` | 480 ms | Section reveals |
| `--dur-3d` | 1.2–2.0 s | 3D layout morphs (scroll-scrubbed, never on a timer) |

Rules:
- Reveal on scroll: opacity 0 → 1 and translateY 12 px → 0, once, only for section headings and
  cards. Body text is never animated.
- Page transitions: View Transitions API (cross-fade + shared-element title) as progressive
  enhancement; off under reduced motion.
- Libraries: **Motion** (formerly Framer Motion) for DOM, **Lenis** for smooth scroll only on pages
  with scroll-linked 3D (off under reduced motion, off on touch devices by default).

## 8. Voice & microcopy

- First person, plain, specific: "I built…", "I measured…". No "passionate", "ninja", "guru".
- Numbers over adjectives: "112th of 300+ teams" rather than "top-ranked".
- Buttons are verbs: *Download CV*, *Send message*, *Open roadmap*, *Publish version 4*.
- Errors say what happened and what to do: "Couldn't send — check your connection and try again.
  Nothing was lost."

## 9. Relationship with the KB (content-origin) look

Uploaded topic pages keep **their own** CSS (the reference uses system fonts and a blue accent).
The platform does **not** restyle them. Generated KB pages (roadmap/phase/module index, coming-soon)
**reuse the roadmap's theme CSS** — extracted from its first published topic's `<style>` block,
editable in admin — so moving between generated and uploaded pages feels seamless. They also share
the bundle's theme key (`cpkb-theme` for the CP roadmap, configurable per roadmap). The main site's
`/docs` catalog and map use Marble & Ink.

## 10. Design deliverables before build (Phase 1)

| Deliverable | Format |
|---|---|
| Token file (`tokens.css` + Tailwind `@theme`) | Code (Phase 1) |
| Type specimen page (`/admin/design` — internal) | Code (Phase 1) |
| Wireframes: Home, Project, CP, Post, Docs map, Admin list + editor | Low-fi (Excalidraw/Figma), attached to the Phase 1 PR |
| 3D art-direction still for each scene | Rendered PNG from the prototype spike `SP-05` |
| Component inventory with states (default, hover, focus, active, disabled, loading, empty, error) | Storybook-lite page in `/admin/design` |
