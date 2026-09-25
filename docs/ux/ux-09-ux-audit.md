# UX-09 — UX Audit & Sign-off

> Status: **Draft v0.4: expert review of the wireframes, awaiting owner audit** · Related: [UX-00 §4, §6](ux-00-strategy-and-methods.md), [UX-01](ux-01-user-flows.md), [UX-08 §7](ux-08-interaction-motion-a11y.md), [21 Audit checklist](../21-audit-checklist.md)

This is the UX gate. It records an **expert review** of UX-01…UX-08 (heuristic evaluation, cognitive
walkthroughs, dark-pattern check), lists what was fixed during the review and what is still open, and
provides the sign-off sheet. Usability tests with real people (UX-00 §6) will add their results here.

---

## 1. Heuristic evaluation (Nielsen's 10)

**Heuristics:** H1 visibility of system status · H2 match with the real world · H3 user control &
freedom · H4 consistency & standards · H5 error prevention · H6 recognition over recall · H7
flexibility & efficiency · H8 aesthetic & minimalist design · H9 error recovery · H10 help &
documentation.

**Scores:** ✓ meets · ◐ meets with a noted risk (finding ID) · ✗ fails (none remain open).

### 1.1 Matrix

| Screen group | H1 | H2 | H3 | H4 | H5 | H6 | H7 | H8 | H9 | H10 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Shell WF-00…05 | ✓ | ◐ UXF-16 | ✓ | ✓ | ✓ | ✓ | ◐ UXF-01 | ✓ | ✓ | ✓ |
| Home WF-10 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ UXF-15 | ✓ | ✓ |
| Projects WF-12/13 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ◐ UXF-01 | ✓ | ✓ | ✓ |
| About, Experience WF-11/14 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CP Journey WF-15/16 | ✓ UXF-08 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ◐ UXF-17 | ✓ | ✓ |
| Contact, Search, errors WF-17…21 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Blog WF-30…32 | ✓ | ✓ | ✓ | ◐ UXF-03 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Docs & reading room WF-33…41 | ◐ UXF-02 | ✓ | ◐ UXF-10 | ◐ UXF-03 | ✓ | ✓ | ✓ | ◐ UXF-04 | ✓ | ✓ |
| Reader panel WF-50…55 | ✓ | ✓ UXF-09 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin editors WF-62…66, 79 | ✓ | ✓ | ✓ | ✓ | ✓ UXF-11 | ✓ | ◐ UXF-06 | ✓ | ✓ | ◐ UXF-14 |
| Admin lists & system WF-60, 61, 67…78, 80, 81 | ✓ | ✓ | ✓ | ✓ | ◐ UXF-12 | ✓ | ✓ UXF-07 | ◐ UXF-05 | ✓ | ◐ UXF-14 |

### 1.2 Findings

Severity (Nielsen): 0 not a problem · 1 cosmetic · 2 minor · 3 major · 4 catastrophe.

| ID | Sev | Heuristic | Screen | Finding | Recommendation | Status |
|---|:-:|---|---|---|---|---|
| UXF-01 | 2 | H7 | WF-00 D, WF-13 | On desktop the CV is in the Home hero and the footer only; a recruiter deep in a case study has to scroll to the footer (F-01 asks for ≤ 2 clicks) | Add a quiet "CV" text link next to *Contact* in the D header, or a CV link in each project's fact sheet | **Open → UXQ-01** |
| UXF-02 | 2 | H1 | WF-38 | Disabled ticks for anonymous readers could look broken | `aria-disabled` + tooltip "Sign in to save your progress. Reading stays free." + chip state A; verify in the learner test | Mitigated; verify in test |
| UXF-03 | 1 | H4 | WF-32, WF-38 | Uploaded pages keep their own CSS (the reference topic has a blue accent), so the look changes between origins | By design (bundles are immutable, [10](../10-roadmap-docs-system.md)); continuity comes from the chip, generated pages reusing the roadmap theme, and the same words in navigation | Accepted |
| UXF-04 | 2 | H8, WCAG 2.4.11 | WF-38, WF-55 | The fixed chip (bottom-right) could cover a bundle's own fixed controls. The reference bundle is safe (its fixed elements are the top progress bar and the nav panel), but future bundles may not be | The runtime checks for fixed elements in the bottom-right corner and moves to bottom-left; a bundle can set its preferred corner in a meta tag; compact mode on M | **Open → UXQ-02** |
| UXF-05 | 1 | H8 | WF-60 sidebar | 22 sidebar entries | Grouped into Content / People / System, owner-only items hidden for editors, ⌘K palette; optionally merge Education, Skills and Certifications into one "CV data" screen with tabs | **Open → UXQ-03** |
| UXF-06 | 1 | H7 | WF-63, WF-64 M | Editors are read-only on phones | Accepted: triage (preview, publish, roll back) is possible on a phone; editing HTML on a phone is error-prone | Accepted |
| UXF-07 | 1 | H7, WCAG 2.1.4 | WF-02 | `/` as a search shortcut clashes with Firefox quick-find and with typing | Active only when focus is not in a field; `⌘K` stays primary | Resolved in UX-08 §2.1 |
| UXF-08 | 2 | H1, H2 | WF-15 | A combined "1000+" figure across judges could be read as a single-judge count | The figure says "across 10 judges", shows "as of", and each judge card has its own count | Resolved in WF-15 |
| UXF-09 | 2 | H2 | WF-54, UX-07 §5 | An early draft of the delete-dialog copy suggested the account could be restored within 30 days; doc 19 says deletion is immediate with a hard delete within 30 days | Copy corrected: "It can't be undone; remaining records are erased within 30 days." | Resolved during review |
| UXF-10 | 3 if it fails | H3 | F-03, WF-50 → WF-38 | If the sign-in round trip loses the reader's place, the core learner promise breaks | Bridge returns to URL + anchor; ticks queued locally survive (UX-01 F-03/F-04, UX-08 §6); make it a named test in the learner study and in E2E | Designed; verify in test |
| UXF-11 | 1 | H5 | WF-65 | Scheduling could be confused by time zones | The dialog shows the zone (Asia/Dhaka) next to the time and rejects past times | Resolved in WF-65 |
| UXF-12 | 1 | H5 | WF-70 | Bulk import never deletes "only in DB" topics, so stale topics can pile up | Dashboard "Drafts & scheduled" tile also counts "only in DB" topics with a link to the outline filter | Recommendation → backlog |
| UXF-13 | 2 | Ethics | WF-75 | Small aggregates can identify individual readers | Minimum group size of 5 ("< 5"); no per-reader histories anywhere | Resolved in WF-74/75 |
| UXF-14 | 1 | H10 | Admin | Little in-context help | `?` shortcuts dialog, helpful empty states, fix hints in validation reports, "Owner guide" link in the admin user menu | Partly resolved; guide written in P3 |
| UXF-15 | 2 | H8, U1 | WF-10 M | 3D could push proof below the fold on phones | Text and proof strip first; the 3D poster follows at 240 px | Resolved in WF-10 |
| UXF-16 | 1 | H2 | WF-00 | "CP" is jargon for non-technical recruiters | Page kicker and `title` spell out "Competitive programming"; the card sort (UX-00 §6) decides the label | **Open → UXQ-04** |
| UXF-17 | 1 | H8 | WF-15 | Five data blocks (judges, colonnade, rating, activity, contests) make a long page | Order follows the recruiter ladder: headline figures first, onsite contests high on M; consider collapsing Activity on M | **Open → UXQ-05** |
| UXF-18 | 2 | H4 | WF-00 D | An earlier draft of the desktop header cut off the *Contact* button | Redrawn in UX-02 §3 with annotation markers below the frame | Resolved during review |

## 2. Cognitive walkthroughs (critical tasks)

For each step: **Q1** Will the user try to achieve this effect? **Q2** Will they notice the correct
action? **Q3** Will they connect the action with the effect? **Q4** Will they see progress after the
action?

### 2.1 F-01 Recruiter: find and download the CV (M, from a LinkedIn link)

| Step | Action | Q1 | Q2 | Q3 | Q4 | Note |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | Land on Home | ✓ | — | — | ✓ | Name, role and proof visible without scrolling (WF-10 M) |
| 2 | Tap *Download CV* in the hero | ✓ | ✓ | ✓ | ✓ | PDF opens in a new tab; label names the result |
| alt | From a project page: open ≡ menu → *Download CV* | ✓ | ◐ | ✓ | ✓ | UXF-01: on D the only route is the footer |

### 2.2 F-02 Engineer: judge the depth of a project

| Step | Action | Q1 | Q2 | Q3 | Q4 | Note |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | Home → *View work* | ✓ | ✓ | ✓ | ✓ | Primary action (U2) |
| 2 | Pick a wall label | ✓ | ✓ | ✓ | ✓ | Whole card is the link |
| 3 | Read the architecture and decisions | ✓ | ✓ (ToC in margin) | ✓ | ✓ | |
| 4 | *Visit repository* | ✓ | ✓ | ✓ (↗ opens GitHub) | ✓ | |

### 2.3 F-03 Learner: read, sign in, track, continue elsewhere

| Step | Action | Q1 | Q2 | Q3 | Q4 | Note |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | Open a topic from the map | ✓ | ✓ | ✓ | ✓ | Serials and "Start here" |
| 2 | Try to tick a section (signed out) | ✓ | ✓ | ◐ | ✓ | Tooltip explains; UXF-02 |
| 3 | Tap the chip "Sign in to track progress" | ✓ | ✓ (fixed, bottom-right) | ✓ | ✓ | Returns to the same section (UXF-10) |
| 4 | Tick sections | ✓ | ✓ | ✓ | ✓ | Chip C → B "Progress saved ✓" |
| 5 | Next day, laptop: open `/me` → *Continue* | ✓ | ✓ (account menu → My progress) | ✓ | ✓ | Deep link to the last section |

### 2.4 F-04 Sign-in edge cases

| Case | Q2 (sees the way forward) | Q4 (understands the outcome) | Note |
|---|:-:|:-:|---|
| Consent cancelled | ✓ | ✓ | Neutral toast, still on the page |
| Disposable email | ✓ | ✓ | WF-50 error names the reason and the fix |
| Banned | ✓ | ✓ | Contact link |
| Session expired while reading | ✓ | ✓ | Chip E; ticks kept locally |

### 2.5 F-05 Owner: publish a topic and roll back

| Step | Action | Q1 | Q2 | Q3 | Q4 | Note |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | Node page → *Upload* tab | ✓ | ✓ | ✓ | ✓ | |
| 2 | Drop zip | ✓ | ✓ | ✓ | ✓ | Progress bar, resumable |
| 3 | Read report | ✓ | ✓ | ✓ | ✓ | Grouped by code with fixes |
| 4 | *Publish v5* | ✓ | ✓ | ✓ ("v5 replaces v4") | ✓ | Toast with *Undo* |
| 5 | Roll back from *Versions* | ✓ | ✓ | ✓ | ✓ | One confirmation (reversible) |

### 2.6 F-06 Owner: write and schedule an HTML post

| Step | Action | Q1 | Q2 | Q3 | Q4 | Note |
|---|---|:-:|:-:|:-:|:-:|---|
| 1 | Blog → *New post* → template | ✓ | ✓ | ✓ | ✓ | WF-79 |
| 2 | Write in the HTML editor | ✓ | ✓ | ✓ | ✓ | Autosave status always visible |
| 3 | Check on 360 px | ✓ | ✓ | ✓ | ✓ | Device toggles in the preview |
| 4 | *Save version* | ✓ | ✓ | ✓ | ✓ | Blocked only by errors, with reasons |
| 5 | *Publish ▾* → *Schedule* | ✓ | ✓ | ✓ | ✓ | Zone shown; ◷ badge in the list |

**Result:** all six critical tasks pass the walkthrough. Two steps carry risks that the usability
tests must confirm (UXF-02 and UXF-10), and one route is weaker on desktop (UXF-01).

## 3. Dark-pattern & ethics checklist

| Pattern | Present? | Evidence |
|---|:-:|---|
| Forced sign-in to read | No | Everything is readable signed out (U5, doc 19) |
| Nagging (repeated sign-in prompts, pop-ups) | No | A single quiet chip; no modals, no interstitials |
| Confirmshaming ("No thanks, I don't want to learn") | No | Neutral copy (UX-07 §6) |
| Roach motel (easy to join, hard to leave) | No | Export and delete in Settings, no email required, same number of steps as sign-up |
| Privacy zuckering (over-collecting) | No | "What we store" list on WF-50; only progress and profile basics; aggregate-only analytics |
| Fake urgency / scarcity | No | None |
| Fake social proof / inflated numbers | No | Every number synced or overridden with a visible badge and "as of" date (U4) |
| Disguised ads, sponsored content | No | None |
| Trick questions / pre-ticked boxes | No | No marketing opt-ins exist |
| Hidden tracking | No | Cookieless analytics; reader runtime only calls the reader API |
| Gamification pressure (streak loss warnings) | No | Calm ledger style; streaks shown, never threatened |

## 4. Accessibility audit record

Filled in during build and before launch (test matrix in UX-08 §7).

| WF | Check | Tool / AT | Date | Result | Issues (link) |
|---|---|---|---|---|---|
| WF-10 | Keyboard, axe, VoiceOver iOS | | | ☐ pass ☐ fail | |
| WF-13 | Keyboard, axe, NVDA | | | ☐ pass ☐ fail | |
| WF-15 | Table twins, reduced motion, NVDA | | | ☐ pass ☐ fail | |
| WF-17 | Form errors, NVDA + VoiceOver | | | ☐ pass ☐ fail | |
| WF-38 + WF-55 | Chip focus order, 2.4.11, TalkBack | | | ☐ pass ☐ fail | |
| WF-50 | Sign-in, 3.3.8 | | | ☐ pass ☐ fail | |
| WF-51 | `/me`, zoom 400% | | | ☐ pass ☐ fail | |
| WF-64 | Editor keyboard, skip to preview | | | ☐ pass ☐ fail | |
| WF-67 | Outline reordering without a mouse (2.5.7) | | | ☐ pass ☐ fail | |

## 5. Open UX questions

Each has a recommended default, used if left blank. They are also listed in
[21 §3](../21-audit-checklist.md) as Q-37…Q-42.

| ID | Question | Options | Recommended | Answer |
|---|---|---|---|---|
| UXQ-01 (Q-37) | CV access on desktop deep pages (UXF-01) | "CV" text link in the D header / CV link in project fact sheets / footer only | **Header text link** (quiet, next to *Contact*) | |
| UXQ-02 (Q-38) | Chip position when a bundle has its own bottom-right control (UXF-04) | auto-move to bottom-left / bundle meta tag / both | **Both** | |
| UXQ-03 (Q-39) | Merge Education, Skills and Certifications into one "CV data" admin screen (UXF-05) | merge with tabs / keep separate | **Merge with tabs** | |
| UXQ-04 (Q-40) | Nav label for the CP page (UXF-16) | "CP" / "CP Journey" / "Competitive Programming" | **"CP" on D, "CP Journey" in the mobile sheet**, confirmed by the card sort | |
| UXQ-05 (Q-41) | Collapse "Activity" on the CP page on phones (UXF-17) | collapsed / expanded | **Collapsed** | |
| UXQ-06 (Q-42) | Fidelity before build: which screens get hi-fi mock-ups in P1 | the 6 in UX-00 §7 / all public screens | **The 6 in UX-00 §7**; the rest are built from wireframes + design system | |

## 6. Coverage check

| Item | Count | Where |
|---|--:|---|
| Screens with a wireframe | 58 / 58 | UX-02…UX-06 ([index](README.md) §3) |
| Screens with mobile behaviour specified | 58 / 58 | M variants drawn for key screens; reflow rules in UX-02 §2 and per-screen notes for the rest |
| Critical flows with diagrams | 11 (6 critical) | UX-01 |
| Critical flows walked through | 6 / 6 | §2 |
| Components with full state lists | All in 04 §6 | UX-07 §2 |
| Screen groups with screen-reader annotations | All | UX-08 §5 |
| Findings | 18: 7 resolved, 3 designed but to verify in tests (UXF-02, 10, 14), 2 accepted, 5 open (→ UXQ), 1 → backlog | §1.2 |

## 7. Sign-off sheet

| # | Document | Decision | Comments |
|--:|---|---|---|
| UX-00 | Strategy, research & UX methods | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-01 | User flows & journeys | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-02 | Layout, grid & global shell | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-03 | Wireframes: public portfolio | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-04 | Wireframes: blog, docs & reading room | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-05 | Wireframes: reader accounts | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-06 | Wireframes: admin panel | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-07 | Components & states | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-08 | Interaction, motion & accessibility | ☐ ✅ ☐ ✎ ☐ ❌ | |
| UX-09 | This audit (findings accepted, UXQ answered) | ☐ ✅ ☐ ✎ ☐ ❌ | |

**UX approval:** ☐ Wireframes approved as the basis for Phase 1 hi-fi and build · Name:
____________ · Date: ____________

**Change control after sign-off:** a screen that deviates from its wireframe during build is noted in
the PR description with its `WF-nn` ID; if the deviation is structural (section order, primary
action, states), this folder is updated in the same PR.
