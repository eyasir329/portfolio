# UX-01 — User Flows & Journeys

> Status: **Draft v0.4** · Related: [01 PRD §1.1, §4](../01-product-requirements.md), [19 Guest accounts](../19-guest-accounts-and-progress.md), [UX-00](ux-00-strategy-and-methods.md)

---

## 1. Flow inventory

| ID | Flow | Actor | Screens | Critical? |
|---|---|---|---|:-:|
| F-01 | Recruiter skim → CV | `P-01` | WF-10 → WF-18 | ✅ |
| F-02 | Engineer deep dive | `P-02` | WF-10 → WF-12 → WF-13 → WF-32 | ✅ |
| F-03 | Learner: read → sign in → track → continue elsewhere | `P-03` | WF-34 → WF-38 → WF-50 → WF-38 → WF-51 | ✅ |
| F-04 | Sign-in edge cases | Any | WF-50, WF-55 | ✅ |
| F-05 | Owner publishes a topic (and rolls back) | `P-04` | WF-68 → WF-69 → WF-66 | ✅ |
| F-06 | Owner writes and schedules an HTML post | `P-04` | WF-79 → WF-64 → WF-65 | ✅ |
| F-07 | Owner bulk-imports a phase | `P-04` | WF-70 | |
| F-08 | Visitor sends a message | `P-05` | WF-17 | |
| F-09 | Reader exports / deletes their data | `P-03` | WF-53 → WF-54 | |
| F-10 | Owner handles a failing judge sync | `P-04` | WF-60 → WF-73 | |
| F-11 | Visitor searches | Any | WF-02 → WF-19 | |

## 2. Journey maps

### 2.1 Recruiter (`P-01`) — "Should I shortlist this candidate?"

| Stage | Arrive | Orient | Verify | Act |
|---|---|---|---|---|
| **Doing** | Opens link from LinkedIn/CV on a phone | Reads name, role line, proof strip | Taps a featured project or the ICPC line | Taps *Download CV* |
| **Thinking** | "Is this the right person/role?" | "Full-stack, Next.js, CP… good" | "Is this real work?" | "I'll forward this" |
| **Feeling** | Hurried | Reassured if it's clear in 5 s | Confident if there are numbers | Satisfied |
| **Risks** | Slow load, splash animation | Vague headline | Case study too long | CV hidden |
| **Design response** | Text-first LCP; 3D lazy | Hero line + availability badge | Wall-label summary + "Results" first on mobile | CV button in hero, header menu and footer |

### 2.2 Learner (`P-03`) — "Keep going with the CP roadmap"

| Stage | Discover | Read | Decide to track | Continue |
|---|---|---|---|---|
| **Doing** | Opens `/docs/cp`, picks a topic | Reads sections, tries quizzes | Taps a disabled "mark read" box, then the chip | Next day opens `/me` on a laptop |
| **Thinking** | "Where do I start?" | "This is good" | "Why can't I tick this?" → "Oh, sign in" | "Where was I?" |
| **Feeling** | Curious | Absorbed | Mild friction | Relieved when it remembers |
| **Risks** | Too many topics | Interruptions | Feels like a paywall | Progress lost |
| **Design response** | Map with serials, "Start here", statuses | No pop-ups, chip is small | Inline tooltip on the disabled box + one-tap sign-in that returns to the same section | *Continue reading* card at the top of `/me` with a deep link |

### 2.3 Owner (`P-04`) — "Publish without fear"

| Stage | Prepare | Upload / write | Check | Publish | Recover |
|---|---|---|---|---|---|
| **Doing** | Generates bundles or opens the editor | Drops zip / writes HTML | Reads the report, previews on phone width | Publishes or schedules | Rolls back if needed |
| **Feeling** | Focused | Flow | Anxious → reassured | Confident | Calm (one click) |
| **Design response** | Templates, CLI | Autosave, drag-drop assets | Grouped warnings with fixes; device-width preview | Clear summary dialog ("v4 replaces v3") | Version list with *Roll back* |

## 3. Flows

### F-01 Recruiter skim → CV

```mermaid
flowchart LR
  A["Link from LinkedIn or email"] --> H["WF-10 Home"]
  H -->|"Download CV (hero)"| CV["WF-18 CV PDF opens in a new tab"]
  H -->|"View work"| P["WF-12 Projects"]
  P --> PD["WF-13 Project"]
  PD -->|"CV in header menu or footer"| CV
  H -->|"ICPC line in proof strip"| CP["WF-15 CP Journey"]
  CP --> CV
```

Success: ≤ 2 clicks from any entry page to the CV. No gate, no form.

### F-02 Engineer deep dive

```mermaid
flowchart LR
  H["WF-10 Home"] --> P["WF-12 Projects"] --> PD["WF-13 Case study"]
  PD -->|"Architecture section"| PD
  PD -->|"Visit repository"| GH["GitHub (new tab)"]
  PD -->|"Related essay"| POST["WF-32 Post on the reading room"]
  POST -->|"Back to all writing"| B["WF-30 Blog index"]
```

### F-03 Learner: read → sign in → track → continue

```mermaid
flowchart TD
  M["WF-34 Docs map"] --> T["WF-38 Topic (anonymous)"]
  T --> R{"Wants to track progress?"}
  R -- "No" --> READ["Keeps reading. Controls stay disabled"]
  R -- "Taps disabled box or chip" --> TIP["Tooltip: Sign in to track your progress"]
  TIP --> L["WF-50 Sign in (main origin)"]
  L --> G["Google or GitHub consent"]
  G --> BR["Bridge (invisible, under 1 s)"]
  BR --> T2["WF-38 Same topic, same section, signed in"]
  T2 --> TICK["Ticks sections. Chip shows Progress saved"]
  TICK --> NEXT["Next day on a laptop: WF-51 /me"]
  NEXT --> CONT["Continue reading card"] --> T3["WF-38 Deep link to the last section"]
```

**Error paths:** consent cancelled → back on the topic with a toast "Sign-in cancelled. You can keep
reading." · network error while saving → chip shows "Saving…" then "Saved" when the queue flushes ·
session expired → chip shows "Sign in again to keep saving" (ticks queued locally meanwhile).

### F-04 Sign-in edge cases

```mermaid
flowchart TD
  S["Sign in requested (chip, header, /me)"] --> Q1{"Already signed in on the main origin?"}
  Q1 -- "Yes" --> BR["Bridge only: one redirect, no consent screen"]
  Q1 -- "No" --> OA["Provider consent"]
  OA --> Q2{"Result"}
  Q2 -- "Approved" --> BR
  Q2 -- "Cancelled" --> C["Return with a neutral toast"]
  Q2 -- "Disposable email" --> D["WF-50 error: use another account"]
  Q2 -- "Banned" --> X["WF-50 error: account suspended, contact link"]
  BR --> RET["Return to the exact page and anchor"]
```

### F-05 Owner publishes a topic and rolls back

```mermaid
flowchart LR
  N["WF-68 Node page"] -->|"Upload new version"| U["WF-69 Upload + report"]
  U --> Q{"Errors?"}
  Q -- "Yes" --> FIX["Fix in the generator or open in the editor"] --> U
  Q -- "Warnings only" --> PV["Preview (360 / 768 / 1280)"]
  PV --> PUB["Publish dialog: v4 replaces v3"]
  PUB --> LIVE["Live in 60 s. Toast with Undo (roll back)"]
  LIVE -->|"Something is wrong"| RB["WF-66 Versions: Roll back to v3"]
```

### F-06 Owner writes and schedules an HTML post

```mermaid
flowchart LR
  B["WF-61 Blog list"] -->|"New post"| TP["Template picker"]
  TP --> ED["WF-64 HTML editor (autosave)"]
  ED -->|"Drop images"| ED
  ED -->|"Save version"| RP["Report: 0 errors"]
  RP --> PUB["WF-65 Publish menu: Schedule"]
  PUB --> SCH["Scheduled badge in list"] --> LIVE["Published at the time. Listing and feed update"]
```

### F-07 Bulk import

```mermaid
flowchart LR
  I["WF-70 Upload tree zip or CLI push"] --> DR["Dry-run plan: new, changed, unchanged, missing"]
  DR --> SEL["Select topics to apply"] --> AP["Apply (progress bar)"] --> RD["Ready versions"] --> PB["Publish selected"]
```

### F-08 Contact

```mermaid
flowchart LR
  C["WF-17 Contact form"] --> V{"Valid and human?"}
  V -- "No" --> E["Inline errors, focus first error"]
  E --> C
  V -- "Yes" --> OK["Confirmation panel replaces the form, with a copy of the message"]
```

### F-09 Export / delete

```mermaid
flowchart LR
  S["WF-53 Settings"] -->|"Export my data"| J["JSON download"]
  S -->|"Delete my account"| D["WF-54 Dialog: type DELETE"]
  D --> OUT["Signed out everywhere. Goodbye page with the 30-day note"]
```

### F-10 Failing judge sync

```mermaid
flowchart LR
  E["Email: SPOJ failed 3 times"] --> DB["WF-60 Dashboard health tile (red)"]
  DB --> SJ["WF-73 Sync and judges"]
  SJ --> ERR["Last error: Cloudflare challenge"]
  ERR --> ACT{"Action"}
  ACT -- "Temporary" --> RN["Run now later"]
  ACT -- "Persistent" --> OFF["Turn scraping off; the card shows the last snapshot"]
```

### F-11 Search

```mermaid
flowchart LR
  K["Press Cmd K or / or tap the search icon"] --> DLG["WF-02 Search dialog"]
  DLG --> TYPE["Type 2+ characters"]
  TYPE --> RES["Grouped results: Work, Blog, Docs, Pages"]
  RES -->|"Enter"| DEST["Destination (docs and posts open on the reading room at the section)"]
  RES -->|"See all results"| FULL["WF-19 Search page"]
```
