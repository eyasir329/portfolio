# UX-05 — Wireframes: Reader Accounts

> Status: **Draft v0.4** · Related: [19 Guest accounts & progress](../19-guest-accounts-and-progress.md), [08 §3, §5.2](../08-auth-and-security.md), [UX-01 F-03/F-04/F-09](ux-01-user-flows.md)

Readers sign in only to **save roadmap progress**. These screens live on the main origin and use
Marble & Ink with no 3D.

---

## WF-50 — Sign in `/login` (also `/admin/login`)

**FRs:** FR-AUTH-01, FR-GUEST-01, FR-PROG-03.

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                  │
│                               SIGN IN                                                            │
│                               Keep your place in the roadmaps                                    │
│                               Save your reading progress and pick up where you                   │
│                               left off on any device. (1)                                        │
│                                                                                                  │
│                               [[  G  Continue with Google  ]]  (2)                               │
│                               [   ◉  Continue with GitHub   ]                                    │
│                                                                                                  │
│                               WHAT WE STORE (3)                                                  │
│                               · Your name, email and avatar from the provider                    │
│                               · Which sections and practice problems you tick                    │
│                               · Nothing else. Export or delete any time.                         │
│                               ‹Privacy›  ·  ‹Terms›                                              │
│                                                                                                  │
│                               You can read everything without an account. (4)                    │
│                                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M**

```text
┌────────────────────────────────────┐
│ SIGN IN                            │
│ Keep your place in                 │
│ the roadmaps                       │
│                                    │
│ [[ G  Continue with Google ]]      │
│ [  ◉  Continue with GitHub ]       │
│                                    │
│ WHAT WE STORE                      │
│ · Name, email, avatar              │
│ · Your ticks, nothing else         │
│ ‹Privacy› · ‹Terms›                │
│                                    │
│ Reading never needs an account.    │
└────────────────────────────────────┘
```

**Error state**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  ┌ ! ──────────────────────────────────────────────────────────────┐                             │
│  │ That email provider isn't supported. Try another account.        │                            │
│  └─────────────────────────────────────────────────────────────────┘                             │
│  (errors appear above the buttons; focus moves to the message)                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | Benefit-first copy; states the one reason to sign in |
| (2) | Provider buttons at equal weight except Google as the primary (most common); each ≥ 44 px tall with the provider mark in monochrome |
| (3) | Plain-language data summary (trust before consent) |
| (4) | Explicit reassurance that reading is free (avoids a paywall feeling, UX-00 U5) |

**States:** redirecting ("Connecting to Google…" with a spinner after 300 ms) · cancelled (toast
on the return page) · disposable email / banned (error panel above the buttons with a contact
link) · already signed in (the page redirects to `return` or `/me` immediately).
**Admin variant (`/admin/login`):** same page, heading "Admin sign-in", no "what we store" block;
non-admins who sign in here land on `/me` with a notice "This account doesn't have admin access."

## WF-51 — Reader dashboard `/me`

**FRs:** FR-GUEST-02, FR-PROG-05, FR-PROG-06.

**D**

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Good evening, Nabila                                                                             │
│ Your reading, across devices.                                                                    │
│                                                                                                  │
│ ┌──────────────────────────────────────────────────────────┐  ┌────────────────────────────────┐ │
│ │ CONTINUE READING (1)                                     │  │ THIS MONTH (3)                 │ │
│ │ std::vector  ·  §4 Why push_back is O(1) amortised       │  │ ▪▪▫▪▪▪▫ ▪▫▫▪▪▪▪                │ │
│ │ CP Knowledge Base · Phase 1 · Basics   ▮▮▮▮▯▯▯▯▯▯ 8/13   │  │ ▪▪▪▫▪▪▪ ▫▪▪▪▫▫▪                │ │
│ │ [[ Continue → ]]                                         │  │ 9 active days · 4-day streak   │ │
│ └──────────────────────────────────────────────────────────┘  └────────────────────────────────┘ │
│                                                                                                  │
│ ┌──────────────────────────────────────────────────────────┐  ┌────────────────────────────────┐ │
│ │ CP Knowledge Base (2)                                    │  │ NEXT UP (4)                    │ │
│ │ ▮▮▯▯▯▯▯▯▯▯ 12% · 37/280 sections                         │  │ 01.02.01 Sorting               │ │
│ │ 4 topics completed · 18 practice ticked                  │  │ 25 min · Phase 1 · Module 2    │ │
│ │ Last read 2 h ago     ‹Open progress →›                  │  │ [ Start → ]                    │ │
│ └──────────────────────────────────────────────────────────┘  │ (skips topics still to come)   │ │
│                                                               └────────────────────────────────┘ │
│                                                                                                  │
│ Other roadmaps appear here as more are published.                                                │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**M**

```text
┌────────────────────────────────────┐
│ Good evening, Nabila               │
│                                    │
│ ┌──────────────────────────────┐   │
│ │ CONTINUE READING             │   │
│ │ std::vector · §4             │   │
│ │ ▮▮▮▮▯▯▯▯▯▯ 8/13              │   │
│ │ [[ Continue → ]]             │   │
│ └──────────────────────────────┘   │
│ CP Knowledge Base  12%             │
│ 37/280 sections  ‹Open →›          │
│ ══════════════════════════════════ │
│ THIS MONTH  9 days · 4-day streak  │
│ NEXT UP  01.02.01 Sorting          │
└────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | The single most important action: deep link to the last section read; primary button |
| (2) | One card per roadmap the reader has started; progress with counts, never a bare % |
| (3) | Activity calendar (5 ink tints) with a text summary as its accessible name |
| (4) | Next topic = first incomplete published topic in outline order |

**Empty state (new account):** "You haven't started a roadmap yet." + the catalog card (WF-33)
with *Start reading*. **Loading:** skeletons matching card sizes. **Error:** "Couldn't load your
progress. ‹Try again›" (the rest of the page still renders).

## WF-52 — Roadmap progress `/me/roadmaps/[roadmap]`

**FRs:** FR-GUEST-03, FR-PROG-08.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ‹My progress› / CP Knowledge Base                                                                │
│ CP Knowledge Base — your progress                                                                │
│ 12% · 37 of 280 sections · 4 of 24 published topics completed    [ Reset roadmap… ] (3)          │
│ ════════════════════════════════════════════════════════════════════════════════════════════════ │
│ PHASE 1 — CORE CP TOOLKIT                                                                        │
│   Basics                                                                                         │
│     ✓ 01.01.13 Lambdas & Comparators     13/13 ▮▮▮▮▮▮▮▮▮▮   5/6 practice   ‹Open›  ⋯ (1)         │
│     › 01.01.14 std::vector                8/13 ▮▮▮▮▮▮▯▯▯▯   3/11 practice  ‹Continue §9›         │
│       01.01.15 std::string                coming soon                                            │
│     ⋯ menu (1): Reset this topic…  (2)                                                           │
│ PHASE 2 — …                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

| # | Spec |
|---|---|
| (1) | Row overflow menu (`⋯`), keyboard reachable |
| (2) | Reset topic: confirmation dialog listing what will be cleared (sections and practice ticks for that topic) |
| (3) | Reset roadmap: typed confirmation with the roadmap name |

## WF-53 — Settings `/me/settings`

**FRs:** FR-GUEST-04, FR-GUEST-05, FR-AUTH-04.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Settings                                                                                         │
│ ════════════════════════════════════════════════════════════════════════════════════════════════ │
│ PROFILE                                                                                          │
│ Display name  [ Nabila Rahman_________________ ]   Timezone [ Asia/Dhaka ▾ ]   [ Save ]          │
│                                                                                                  │
│ SIGN-IN                                                                                          │
│ Google  nabila@example.com   Connected                                                           │
│ GitHub  —                      ‹Connect›                                                         │
│                                                                                                  │
│ SESSIONS                                                                                         │
│ Signed in on this browser and 2 others.   [ Sign out everywhere ]                                │
│                                                                                                  │
│ YOUR DATA                                                                                        │
│ [ Export my data (JSON) ]   Includes your profile and reading progress.                          │
│                                                                                                  │
│ DANGER ZONE                                                                                      │
│ [ Delete my account… ]  Removes your account and progress. Can't be undone.                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Sections are separated by hairlines (no cards); the danger zone uses the accent colour only on its
heading and button border.

## WF-54 — Delete account (dialog + goodbye page)

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                     ┌────────────────────────────────────────────────────────┐                   │
│                     │ Delete your account?                                   │                   │
│                     │ Your reading progress on all roadmaps will be removed. │                   │
│                     │ You'll be signed out on every device. Everything is    │                   │
│                     │ erased within 30 days.                                 │                   │
│                     │                                                        │                   │
│                     │ Type DELETE to confirm  [__________]                   │                   │
│                     │                                                        │                   │
│                     │            [ Cancel ]   [[ Delete account ]] (disabled │                   │
│                     │                          until DELETE is typed)        │                   │
│                     └────────────────────────────────────────────────────────┘                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

**After deletion:** a plain page "Your account has been deleted. Your data will be fully erased
within 30 days. Thanks for reading." + ‹Back to the library›. Export offers a JSON file named
`eyasir329-reading-progress-YYYY-MM-DD.json`.

## WF-55 — Runtime chip states (reading room)

```text
A. signed out            (collapsed on M: ◯)   B. signed in
┌────────────────────────────────────┐    ┌────────────────────────────────────┐
│ ◯  Sign in to track progress       │    │ (NR) Progress saved ✓      ▾       │
└────────────────────────────────────┘    └────────────────────────────────────┘

C. saving                                      D. offline / API error
┌────────────────────────────────────┐    ┌──────────────────────────────────────┐
│ (NR) Saving…                       │    │ (NR) Saved on this device, will sync │
└────────────────────────────────────┘    └──────────────────────────────────────┘

E. session expired                              F. menu open (from B)
┌────────────────────────────────────┐    ┌────────────────────────────────────┐
│ !  Sign in again to keep saving    │    │ Nabila Rahman                      │
└────────────────────────────────────┘    │ My progress                        │
                                          │ Sign out                           │
                                          └────────────────────────────────────┘
```

| State | When | Action |
|---|---|---|
| A | No reader session | Opens sign-in with `return` = this page and section |
| B | Signed in, all writes flushed | Opens menu (F) |
| C | Writes in flight (≥ 300 ms) | None |
| D | Queue pending because offline or API error | Retries automatically; tooltip explains |
| E | Session expired or revoked | Opens sign-in; queued ticks are kept and flushed after sign-in |
| F | Menu | *My progress* → `/me`; *Sign out* signs out on both origins |

(NR) = the reader's initials in a 28 px circle (avatar image when available).
