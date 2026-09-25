# UI/UX Design Documentation — Index

> **Version:** 0.4 (draft for owner audit) · **Date:** 2026-09-25 · Part of the planning set
> ([../README.md](../README.md)). **No code**: everything here is design specification.

This folder turns the product plan into a **designable, auditable user experience**. For every page
on every surface, it defines what the page is for, what's on it and in what order, how it responds to
screen size, which states it has, how it's operated by keyboard and screen reader, and why each
decision was made.

---

## 1. Documents

| # | Document | What you audit there |
|--:|---|---|
| UX-00 | [Strategy, research & UX methods](ux-00-strategy-and-methods.md) | UX goals, audiences, jobs-to-be-done, principles, the UX skills/methods applied, research and usability-testing plan |
| UX-01 | [User flows & journeys](ux-01-user-flows.md) | Journey maps and step-by-step flows for every key task, including error paths |
| UX-02 | [Layout, grid & global shell](ux-02-layout-and-shell.md) | Grid, breakpoints, header, footer, mobile nav, search, account menu, theme/3D toggles |
| UX-03 | [Wireframes — public portfolio](ux-03-wireframes-public.md) | Home, About, Projects, Project, Experience, CP Journey, Contest, Contact, Resume, Search, Legal, 404/500 |
| UX-04 | [Wireframes — blog, docs & reading room](ux-04-wireframes-blog-docs.md) | Blog index/archives, essay template, docs catalog/map, content-origin pages, topic page with the runtime chip |
| UX-05 | [Wireframes — reader accounts](ux-05-wireframes-reader.md) | Sign-in, `/me` dashboard, roadmap progress, settings, export/delete, chip states |
| UX-06 | [Wireframes — admin panel](ux-06-wireframes-admin.md) | Every admin screen, including the HTML editor, versions, imports, sync & judges, users, readers |
| UX-07 | [Components & states catalogue](ux-07-components-and-states.md) | Every component with all its states; forms; feedback; empty/loading/error patterns; microcopy |
| UX-08 | [Interaction, motion & accessibility](ux-08-interaction-motion-a11y.md) | Keyboard map, focus order, motion specs, screen-reader annotations, per-page a11y checklist |
| UX-09 | [UX audit & sign-off](ux-09-ux-audit.md) | Heuristic evaluation matrix and findings, cognitive walkthroughs, dark-pattern checklist, a11y audit record, open UX questions (Q-37…42), sign-off sheet |

**Reading order:** UX-00 → UX-01 → UX-02, then the wireframes you care about most (UX-03 for
recruiters, UX-04/05 for learners, UX-06 for yourself), then UX-07/08, and finally audit in UX-09.

## 2. How to read the wireframes

Wireframes are **low-fidelity**: they fix structure, hierarchy, content and behaviour, not final
visuals. Visual language comes from the design system ([../04-design-system.md](../04-design-system.md)).

| Notation | Meaning |
|---|---|
| `┌─┐ │ └─┘` | Frame of a viewport, region or card |
| `[ Label ]` | Button (primary buttons are written `[[ Label ]]`) |
| `‹link›` | Text link |
| `[x]` / `[ ]` | Checkbox checked / unchecked |
| `( )` / `(o)` | Radio / selected radio |
| `[____]` | Text input; `[____ ▾]` select |
| `▓▓▓` | Image or screenshot placeholder |
| `░░░` | 3D canvas (with poster fallback) |
| `═══` | Hairline rule |
| `▮▮▮▯▯` | Progress bar |
| `(1)`, `(2)` … | Annotation markers, explained in the table under each wireframe |
| `…` | Repeating or truncated content |
| `D:` / `T:` / `M:` | Desktop (≥ 1280 px) / Tablet (768–1279) / Mobile (≤ 767) |

Every wireframe has an ID (`WF-nn`), so audit comments can point at one screen:
`> **Audit (Eyasir):** WF-10 (3) — move the CV button left of "View work".`

## 3. Screen inventory

| Surface | IDs | Count |
|---|---|--:|
| Global shell | WF-00 … WF-05 | 6 |
| Public portfolio (main origin) | WF-10 … WF-21 | 12 |
| Blog & docs (main origin) | WF-30 … WF-34 | 5 |
| Reading room (content origin) | WF-35 … WF-41 | 7 |
| Reader accounts | WF-50 … WF-55 | 6 |
| Admin panel | WF-60 … WF-81 | 22 |
| **Total** | | **58** |

## 4. Relationship to the rest of the plan

| Plan document | UX documents build on it by… |
|---|---|
| [01 PRD](../01-product-requirements.md) | Each wireframe lists the FR IDs it satisfies |
| [03 Information architecture](../03-information-architecture.md) | Routes and section orders become full page layouts |
| [04 Design system](../04-design-system.md) | Tokens, type and components are applied; UX-07 adds states and behaviour |
| [05 3D](../05-3d-experience.md) | 3D placement, fallbacks and reduced-motion behaviour are drawn into pages |
| [09 Admin](../09-admin-panel.md) | Admin screens are **redrawn** here in full; the sketches in 09 are superseded by UX-06 |
| [19 Guest accounts](../19-guest-accounts-and-progress.md) | Sign-in flows, chip states and `/me` are drawn in UX-01/04/05 |
