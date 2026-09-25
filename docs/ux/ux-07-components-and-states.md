# UX-07 — Components & States Catalogue

> Status: **Draft v0.4** · Related: [04 Design system §6–8](../04-design-system.md), [UX-02](ux-02-layout-and-shell.md), [UX-08](ux-08-interaction-motion-a11y.md)

This catalogue lists every interactive component used in UX-02…UX-06 with **all of its states**, and
the shared patterns for forms, feedback, empty/loading/error states, destructive actions and
microcopy. Visual tokens come from [04](../04-design-system.md); this document adds behaviour.

---

## 1. The state model

Every interactive component is specified against the same list. A cell marked "—" means the state
doesn't apply; anything else must be designed and built.

| State | Visual rule (Marble & Ink) | Notes |
|---|---|---|
| Default | Ink text on paper; hairline borders in `--rule` | |
| Hover | One step of change only: underline, `--paper-sunk` wash, or 2 px lift on cards | Pointer devices only (`@media (hover: hover)`) |
| Focus-visible | 2 px `--accent` outline, 2 px offset, never removed | Must be visible on paper, sunk, raised and on images |
| Active / pressed | 1 px translate or 6% darker fill | 120 ms |
| Selected / current | Accent underline or `--accent-wash` background + `aria-current` / `aria-selected` | Never colour alone: also weight or an icon |
| Disabled | `--faint` border, `--muted` text, `cursor: not-allowed`, tooltip saying why | Prefer hiding for permissions and disabling only for "not yet" |
| Loading | Label kept, spinner or skeleton after **150 ms** (no flash for fast responses) | `aria-busy` |
| Error | Accent text + "!" glyph + message; field border in accent | Message says what to do |
| Success | Quiet: a "✓" and text, green only in admin | Public site stays monochrome + oxblood |
| Read-only | Plain text, no field chrome | Used on phones in admin editors |

## 2. Component catalogue

### 2.1 Buttons & links

```text
PRIMARY    [[ Download CV ]]   hover: ink fill darkens 6%   focus: 2 px oxblood ring, 2 px offset
SECONDARY  [ View work ]       hover: paper-sunk wash       pressed: translateY 1 px
QUIET      ‹Sign in›           hover: underline             visited links: no colour change
LOADING    [[ Sending… ◌ ]]    width locked, label kept, aria-busy="true"
DISABLED   [  Publish v4  ]    faint border + muted text + tooltip that says why
DANGER     [ Delete account… ] outline in accent; filled only inside the confirmation dialog
```

| Rule | Why |
|---|---|
| One primary (`[[ ]]`) per view (U2) | Clear next step, Hick's law |
| Labels are verb + object ("Publish v4", not "OK") | Predictable outcome |
| Minimum target 44 × 44 px (24 × 24 px for inline text links, with spacing) | WCAG 2.5.8, Fitts's law |
| Links that leave the site show `↗` and say so to screen readers ("opens in a new tab") | Orientation |
| Destructive actions end with "…" when they open a confirmation | Signals a second step |

### 2.2 Public components

| Component | Used in | States beyond the defaults | Behaviour notes |
|---|---|---|---|
| `SiteHeader` | All main-origin pages (WF-00) | Transparent over hero → solid after 8 px; hidden-on-scroll (M only) | Current section via `aria-current` |
| `MobileNav` | WF-01 | Open / closed | Focus trap, `Esc` closes, returns focus |
| `SearchDialog` | WF-02 | Empty, typing, loading, results, no results, error | Results update after 120 ms debounce; `↑↓ ↵ esc` |
| `AccountMenu` | WF-03 | Signed out (text link), signed in (avatar), admin (extra item) | Menu button pattern |
| `WallLabel` (project card) | WF-10, WF-12 | Hover (image to colour, 2 px lift), focus (whole card outline), featured, archived | The whole card is one link; the repo link inside is a separate, smaller target |
| `ProofStrip` | WF-10 | Stale data ("as of 20 Sep") | Numbers are `tabular-nums`; each links to its evidence |
| `Timeline` | WF-14, WF-11 | Collapsed/expanded entry (M) | Year markers are headings for navigation |
| `JudgeCard` | WF-15 | Synced, needs extension, profile-only, failing (shows last snapshot + "as of"), overridden | Status uses glyph + text |
| `RatingChart`, `Heatmap` | WF-15 | Loading, empty, "table view" | Every chart has a table twin |
| `ContestRow` | WF-15, WF-16 | Highlighted (ICPC) | Row is a link to WF-16 when a write-up exists |
| `PostListItem` | WF-30, WF-31 | New (< 14 days), series badge | Opens the post on the reading room |
| `RoadmapMap` | WF-34, WF-36 | Topic: published, coming soon, private; signed in: not started / in progress / completed | Tree semantics on D, list on M |
| `ContactForm` | WF-17 | See §3 | |
| `Scene3D` | WF-10, WF-13, WF-15, WF-20 | Poster, loading canvas, live, paused (off-screen), off (user), unavailable | Poster is always the first paint |
| `ThemeToggle`, `MotionToggle` | WF-05 | System / light / dark; on / off / unavailable | Persisted; labels for screen readers |
| `Colophon` | WF-04 | — | |

### 2.3 Reader components

| Component | Used in | States | Behaviour notes |
|---|---|---|---|
| `SignInCard` | WF-50 | Default, redirecting (button shows "Opening Google…"), cancelled toast, disposable-email error, banned error | Providers in monochrome marks |
| `ContinueCard` | WF-51 | Has last position, no history yet ("Start with ‹CP Knowledge Base›") | One action only |
| `ProgressBar` / `ProgressRing` | WF-51, WF-52 | 0, partial, complete (accent) | Always paired with "8/13" text |
| `RoadmapProgressTree` | WF-52 | Collapsed, expanded, filtered (in progress only) | |
| `ActivityCalendar` | WF-51 | Empty year, normal | Summary sentence for screen readers |
| `RuntimeChip` | WF-38, WF-55 | A signed out, B signed in (saved), C saving, D offline/queued, E session expired, F menu open; compact/full/hidden | Specified in UX-05 WF-55 |
| Section tick (in topic pages) | WF-38 | Disabled (signed out, with tooltip), unticked, ticked, pending save | Native checkbox semantics |

### 2.4 Admin components

| Component | Used in | States | Behaviour notes |
|---|---|---|---|
| `DataTable` | WF-61 and all lists | Loading, empty, filtered-empty, error, selected rows, bulk bar | Sort in the header button, not the whole header cell |
| `EntityForm` | WF-62, WF-63, WF-80 | Pristine, dirty (●), saving, saved, error summary | See §3 |
| `SortableList` | WF-61, WF-67, WF-77 | Idle, grabbed, moving, dropped | Keyboard: `Space` to grab, arrows to move, `Space` to drop, `Esc` to cancel; live announcements |
| `MarkdownEditor` | WF-63 | Edit, split, preview | Toolbar is a `toolbar` with roving tabindex |
| `HtmlEditor` | WF-64 | Clean, dirty/autosaving, autosaved, save blocked by errors, read-only (M) | Autosave every 5 s while dirty |
| `FileTree` | WF-64, WF-68 | Collapsed/expanded, selected, private (⌂), uploading | `tree` role |
| `StatusBadge` | Everywhere | See §7 | |
| `DiffViewer` | WF-66, WF-70 | Text diff, binary changed, added, removed | |
| `ConfirmDialog` | WF-54, WF-65, WF-74, WF-78 | Simple confirm, typed confirm (§5) | |
| `PlatformHealthTile` | WF-60, WF-73 | Ok, degraded (◐), failing (!), off (○) | |
| `JobLog` | WF-70, WF-73 | Running, succeeded, partial, failed | Streaming lines, "Copy log" |
| `TemplatePicker` | WF-79 | Default selected, other selected | Radio group of cards |
| `MediaPicker` | WF-62, WF-63, WF-71 | Browsing, uploading, missing alt | Alt text required before insert |
| `Toast` | Everywhere | Success, info, error, with action | §4 |

### 2.5 Status vocabulary (badges)

```text
● Live      ○ Draft      ◷ Scheduled 26 Sep 09:00      ◐ Needs extension      ! Failing (3)
✓ Completed   ◑ In progress   · Not started   ◌ Coming soon   (o) Owner only   ⌂ Private file
```

The same glyph always means the same thing on every surface; glyphs are paired with text and never
rely on colour.

## 3. Forms

```text
DEFAULT + HINT                     ERROR (after blur)                 VALID (quiet)
┌────────────────────────────────┐ ┌────────────────────────────────┐ ┌────────────────────────────────┐
│ Email *                        │ │ Email *                        │ │ Email *  ✓                     │
│ [ nabila@example_________ ]    │ │ [ nabila@_________________ ]   │ │ [ nabila@example.com_____ ]    │
│ We only use it to reply.       │ │ ! Enter an email like          │ │                                │
└────────────────────────────────┘ │   name@example.com             │ └────────────────────────────────┘
                                   └────────────────────────────────┘
```

| Rule | Spec |
|---|---|
| Labels | Above the field, always visible; never placeholder-only. Required marked `*` with "* required" at the top |
| Hints | Under the label or field, linked by `aria-describedby` |
| Validation timing | On blur for the first time; then live on change for that field; on submit for all |
| Error message | Under the field, starts with "!", says what to do ("Enter an email like name@example.com") |
| Error summary | On submit with errors: summary at the top, focus moves to it, each item links to the field |
| Success | Contact: the form is replaced by a confirmation panel with a copy of the message; admin: toast + "Saved" |
| Input types | `email`, `url`, `tel`, `date` with the right `autocomplete` and mobile keyboards |
| Long forms (admin) | Sections with headings; sticky save bar with the dirty indicator; ⌘S |
| Unsaved changes | Leaving asks "Discard changes?" with *Keep editing* (default) and *Discard* |
| Spam protection | Turnstile runs invisibly; only on failure shows "Please confirm you're human" |

**Error summary pattern**

```text
┌────────────────────────────────────────────────────────────┐
│ ! 2 things need fixing before sending                      │
│   • ‹Email: enter an email like name@example.com›          │
│   • ‹Message: write at least 20 characters›                │
└────────────────────────────────────────────────────────────┘
```

## 4. Feedback & system status

```text
TOAST (bottom-left D / top M, 6 s, pauses on hover and focus)
┌──────────────────────────────────────────────────┐
│ ✓ v4 is live · ‹View› · ‹Undo›                 ✕ │
└──────────────────────────────────────────────────┘

BANNER (inline, persistent until resolved or dismissed)
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ ! Sync for SPOJ failed 3 times. Last error: Cloudflare challenge.  ‹Open Sync & judges›    ✕ │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

| Situation | Pattern | Timing |
|---|---|---|
| Action succeeded, low stakes | Toast | 6 s, pauses on hover/focus, `role="status"` |
| Action succeeded, reversible and important (publish, delete draft) | Toast with *Undo* | 10 s |
| Action failed | Inline error near the control + toast only if the control is gone | Persistent until retried |
| System problem (sync failing, storage near limit) | Banner in admin; tile in dashboard | Until resolved |
| Background save (reader progress) | Runtime chip state C (saving, after 300 ms) → B ("Progress saved ✓") | ✓ shown for 2 s |
| Long job (import, upload) | Progress bar with count ("11/17") and cancel | Updates at least every 2 s |
| Response < 150 ms | No indicator | Avoid flicker |
| 150 ms – 1 s | Inline spinner / skeleton | |
| > 1 s | Skeleton or progress with a text label | |
| > 10 s | Progress with count + "You can leave this page; we'll keep going" where true | |

## 5. Empty, loading, error & destructive patterns

```text
EMPTY                            LOADING (skeleton)               ERROR (scoped)
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
│                              │ │ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭           │ │                              │
│   No posts yet.              │ │ ▭▭▭▭▭▭▭▭▭▭                   │ │   Couldn't load contests.    │
│   Your essays appear here    │ │                              │ │   Other sections still work. │
│   once you publish one.      │ │ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭             │ │                              │
│                              │ │ ▭▭▭▭▭▭▭▭                     │ │   [ Try again ]              │
│   [[ Write the first post ]] │ │                              │ │                              │
│                              │ │                              │ │                              │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
```

| Pattern | Rules |
|---|---|
| **Empty (first use)** | Say what will appear here and offer the one action that fills it |
| **Empty (filtered)** | "No results for these filters" + *Clear filters*; never the first-use copy |
| **Empty (public)** | Hide the section on public pages rather than showing an empty state (e.g. no talks yet) |
| **Loading** | Skeletons match the final layout (no layout shift); text-first pages render server-side so most public pages never show skeletons |
| **Error (scoped)** | Fail per section: the rest of the page stays usable; *Try again* re-fetches only that section |
| **Error (page)** | WF-20 500 page: plain apology, *Try again*, links to Home and Docs |
| **Offline** | Reader progress queues locally (chip state D); public pages served from cache where possible |
| **Stale data** | Show "as of <date>" instead of hiding numbers (U4) |

**Destructive actions — typed confirmation**

```text
┌────────────────────────────────────────────────────────────────┐
│ Delete your account?                                           │
│                                                                │
│ This removes your progress on every roadmap and signs you      │
│ out everywhere. It can't be undone after 30 days.              │
│                                                                │
│ Type DELETE to confirm   [ DEL______ ]                         │
│                                                                │
│                     [ Cancel ]   [[ Delete account ]] (off)    │
└────────────────────────────────────────────────────────────────┘
```

| Level | Examples | Confirmation |
|---|---|---|
| Reversible | Unpublish, archive, roll back, delete draft | Toast with *Undo* (no dialog) |
| Hard to reverse | Revoke token, ban user, delete media | Dialog naming the object and consequence; verb button |
| Irreversible / personal data | Delete account (reader), delete user (owner), remove an admin | **Typed confirmation** (`DELETE` or the object name); button disabled until it matches; focus starts on *Cancel* |

## 6. Microcopy & voice

Tone follows [04 §8](../04-design-system.md): first person, plain, specific, calm.

| Situation | Do | Don't |
|---|---|---|
| Sign-in invitation (chip) | "Sign in to track your progress" | "Unlock premium features!" |
| Disabled tick (signed out) | Tooltip: "Sign in to save your progress. Reading stays free." | "Login required" |
| Sign-in cancelled | "Sign-in cancelled. You can keep reading." | "Error: access_denied" |
| Session expired | "Sign in again to keep saving. Your last ticks are kept on this device." | "401 Unauthorized" |
| Contact sent | "Thanks, Rina. I'll reply to rina@acme.com within 2 working days." | "Success!" |
| Network error | "Couldn't send. Check your connection and try again. Nothing was lost." | "Something went wrong" |
| 404 | "This page isn't here. It may have moved." + links | "Oops! 404" |
| Coming soon topic | "This topic is being written. ‹See what's ready›" | "Under construction 🚧" |
| Delete account | "Delete account" (button), consequences in the body | "Are you sure?" alone |
| Empty `/me` | "Nothing tracked yet. Open any topic and tick a section to start." | "No data" |
| Publish | "Publish v4" / "v4 is live" | "Submit" / "Done" |
| Judge failing (admin) | "SPOJ failed 3 times. Last error: Cloudflare challenge." | "Sync error" |

**Word list:** *Sign in* (not *Log in*), *Sign out*, *progress* (not *stats*), *topic*, *roadmap*,
*post* (admin) / *essay* or *note* (public), *version*, *publish*, *roll back*, *reader* (not
*user* on public pages), *CV* (not *resume* in labels; the route stays `/resume`).

**Formatting:** dates "25 Sep 2026" (en-GB order, no ordinal); times 24-hour with the time zone in
admin; numbers with thin grouping (`1,420`); ranges with an en dash (`2024–2026`); serials in mono
(`01.01.14`).

## 7. Status badges

| Badge | Meaning | Where |
|---|---|---|
| ● Live | A version is published and served | Admin lists, WF-66 |
| ○ Draft | Never published or has unpublished edits | Admin lists |
| ◷ Scheduled | Will publish at the shown time | Admin lists, WF-65 |
| ◐ Needs extension / profile only | Data comes from the NEUPC extension or only profile totals exist | WF-15, WF-72, WF-73 |
| ! Failing (n) | Sync failed n times in a row | WF-60, WF-72, WF-73 |
| ✓ Completed | Reader finished all sections of a topic | WF-51, WF-52, WF-36/37 signed in |
| ◑ In progress | At least one section ticked | Same |
| · Not started | Default | Same |
| ◌ Coming soon | Planned topic with no published version | WF-34, WF-39 |
| (o) Owner only | Hidden for editors | Admin sidebar |
| ⌂ Private file | Not served publicly | WF-68, WF-64 |
