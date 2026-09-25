# UX-00 — Strategy, Research & UX Methods

> Status: **Draft v0.4** · Related: [00 Charter](../00-project-charter.md), [01 PRD §1](../01-product-requirements.md), [04 Design system](../04-design-system.md)

---

## 1. UX vision

> **A calm, bookish gallery that proves competence in seconds and rewards anyone who stays longer.**

| For… | The experience must feel… | Measured by |
|---|---|---|
| Recruiters (`P-01`) | **Instant and unambiguous**: who, what role, proof, CV | Time to CV/first project ≤ 30 s; 5-second test recall ≥ 80% |
| Engineers (`P-02`) | **Substantial**: decisions, trade-offs, real numbers | Case-study scroll depth; outbound GitHub clicks |
| Learners (`P-03`) | **Focused and continuous**: read, tick, continue anywhere | Return rate; topics completed; sign-in conversion from the chip |
| Organisers (`P-05`) | **Reachable** | Contact submissions; email clicks |
| Owner (`P-04`) | **Fast and safe to maintain** | Time to publish a post/topic; zero broken publishes |

## 2. Jobs to be done

| When I… | I want to… | So I can… | Primary screens |
|---|---|---|---|
| …screen a candidate | see role, stack and proof at a glance | decide to shortlist in a minute | WF-10 Home, WF-18 Resume |
| …prepare an interview | understand how they build and decide | ask sharper questions | WF-13 Project, WF-32 Post |
| …study CP at night on my phone | read one topic and mark my place | continue tomorrow on my laptop | WF-38 Topic, WF-51 `/me` |
| …evaluate a contest record | see ratings and results with evidence | trust the numbers | WF-15 CP Journey |
| …(owner) finish an essay | write HTML, preview it on a phone, schedule it | publish without touching code | WF-64 Editor, WF-65 Publish |
| …(owner) regenerate 20 topics | push them in one go and check nothing broke | keep the roadmap current | WF-70 Import dry run |

## 3. UX principles (with how each is applied)

| # | Principle | Applied as |
|---|---|---|
| U1 | **Proof above the fold** | Hero shows role + one-line positioning + proof strip with numbers, all before any 3D motion |
| U2 | **One primary action per view** | Home: *View work*; Project: *Visit repo*; Topic: *Sign in to track progress* (signed out) / nothing (signed in); Admin editors: *Save version* |
| U3 | **Reading first** | 38 rem measure, 17 px body, no motion in text, 3D never behind text, no pop-ups |
| U4 | **Honest states** | "as of" dates on synced data, "needs extension" labels, explicit empty states, no fake numbers |
| U5 | **Quiet sign-in** | Signing in is invited where it helps (progress), never forced for reading, never a modal wall |
| U6 | **Reversible by default** | Drafts, previews, versions, rollback, undo toasts; destructive actions need typed confirmation |
| U7 | **Consistency across two origins** | Same header vocabulary and chip; generated roadmap pages share the topics' look |
| U8 | **Accessible without asking** | Keyboard, screen reader, reduced motion and contrast are specified per screen (UX-08) |

## 4. UX skills & methods applied in this documentation

| Method / skill | Where it's used | Output |
|---|---|---|
| **Persona & JTBD framing** | §2, UX-01 | Jobs table, journey maps |
| **Journey mapping** | UX-01 §2 | Stage → action → thought → emotion → opportunity maps |
| **Task / user-flow design** | UX-01 §3 | Flow diagrams with happy and error paths |
| **Information architecture & navigation design** | UX-02, [03](../03-information-architecture.md) | Nav labels, breadcrumbs, cross-links |
| **Visual hierarchy & Gestalt** (proximity, similarity, figure/ground) | UX-03…06 | Section order, hairline grouping, wall-label cards |
| **Reading patterns** (F-pattern for lists, Z-pattern for the hero) | WF-10, WF-12, WF-30 | Placement of CTAs and scannable left edges |
| **Fitts's law** | UX-02, UX-07 | 44 px touch targets, CTAs near the thumb zone on mobile, chip bottom-right |
| **Hick's law / progressive disclosure** | WF-12 filters, WF-64 editor drawers | Filters collapsed on mobile; advanced options in drawers |
| **Responsive & mobile-first layout** | UX-02 §2, every wireframe | D/T/M variants and reflow rules |
| **Content design & microcopy** | UX-07 §6 | Button verbs, error messages, empty states |
| **Interaction design** | UX-07, UX-08 | States, feedback timings, optimistic UI |
| **Motion design** | UX-08 §3 | Durations, easing, reduced-motion fallbacks |
| **Accessibility design (WCAG 2.2 AA)** | UX-08 §4–5 | Focus order, landmarks, ARIA notes per page |
| **Data visualisation** | WF-15, WF-75 | Rating chart, heatmap, colonnade twin table, analytics tiles |
| **Form design** | UX-07 §3 | Label placement, validation timing, error summary |
| **Dashboard design** | WF-51, WF-60, WF-75 | Priority tiles, one question per tile |
| **Heuristic evaluation** (Nielsen's 10) | UX-09 §1 | Per-page heuristic matrix |
| **Cognitive walkthrough** | UX-09 §2 | Step-by-step checks for the 6 critical tasks |
| **Usability testing plan** | §6 | Scripts, participants, success metrics |
| **Dark-pattern avoidance** | UX-09 §3 | Checklist (no forced sign-in, no confirmshaming, easy deletion) |

## 5. Content priority (what matters most, per audience)

```text
Recruiter:  role → stack → 3 projects → CP credential → CV → contact
Engineer:   project case study → architecture → decisions → code → writing
Learner:    roadmap map → topic → progress → next topic
Owner:      drafts & failures first → publish → health
```

Every page's section order in UX-03…06 follows these ladders.

## 6. Research & usability-testing plan

| Study | When | Participants | Task / measure | Pass bar |
|---|---|---|---|---|
| **Card sort** (open) for nav labels | Before P1 build | 8 (4 CS students, 2 engineers, 2 non-technical) | Group 20 content cards; name groups | ≥ 70% agree on Work / Blog / Docs / CP groupings |
| **Tree test** of the IA | Before P1 build | 10 | "Where would you find the ICPC result?", "…the CV?", "…the std::vector topic?" | ≥ 80% direct success |
| **5-second test** of the Home hero wireframe | After WF-10 hi-fi | 10 | Recall name, role, one proof | ≥ 80% recall role; ≥ 60% recall a number |
| **First-click test** | After hi-fi | 10 | "Download the CV", "See the contest record" | ≥ 90% correct first click |
| **Moderated usability test** — recruiter | Beta | 3 | Shortlist decision + CV in 2 min | 3/3 succeed ≤ 60 s |
| **Moderated usability test** — learner | Beta (NEUPC members) | 5 | Read a topic on a phone, sign in from the chip, continue on a laptop | 5/5 complete; SUS ≥ 80 |
| **Owner diary** — admin | P3–P4 | Owner | Publish a topic, write a post, roll back | Each task ≤ 5 min without docs |
| **Accessibility review** with a screen-reader user | Before launch | 1–2 | Navigate Home, a topic, sign-in | No blockers |

**Metrics after launch** (cookieless analytics): CV downloads, project CTR from Home, chip →
sign-in conversion, 7-day return rate of signed-in readers, topic completion rate, 404 hits.

## 7. Design deliverables & fidelity plan

| Stage | Deliverable | Where |
|---|---|---|
| Now (P0) | Low-fi wireframes for all 58 screens + flows + specs | This folder |
| P1 | Mid-fi (greyscale) for the 10 key screens in Figma/Excalidraw; clickable prototype of Home → Project → CV and Topic → Sign in → `/me` | Linked from the P1 PR |
| P1 | Hi-fi Marble & Ink for Home, Project, CP, Topic chip, `/me`, Admin editor | Linked from the P1 PR |
| P1 | 3D art-direction stills (SP-05) | [05](../05-3d-experience.md) |
| Each phase | Screens implemented against the wireframe IDs; deviations recorded here | PR descriptions |
