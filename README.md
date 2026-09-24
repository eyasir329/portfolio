# Eyasir Ahamed — Portfolio, Blog & Roadmap Docs

> **Status: Phase 0 — Planning & audit.**
> This repository currently contains **planning documents only**. No application code has been
> scaffolded, installed or run. Implementation starts after the owner signs off
> [`docs/19-audit-checklist.md`](docs/19-audit-checklist.md).

The personal website of **Eyasir Ahamed**: full-stack developer, Computer Science & Engineering
graduate (Netrokona University) and competitive programmer (ICPC 2025 Asia Dhaka Regionalist,
Mymensingh Divisional Champion).

## What will be built

| Area | Summary |
|---|---|
| **Portfolio** | Projects, experience, education, skills and certifications, all editable from the admin panel |
| **CP Journey** | Codeforces and GitHub stats synced daily, ICPC/IUPC contest history, and a 3D "Colonnade" of monthly solves |
| **Blog** | Markdown essays with code, math, diagrams, series, tags and RSS |
| **Roadmap Docs** | Public learning roadmaps; each topic is a complete, self-contained HTML page served byte-for-byte (same format as the `3_std_vector` reference bundle) |
| **Admin panel** | Google sign-in (allowlisted emails only), CRUD for all content, topic-bundle importer, sync controls, audit log |

## Planned stack

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS v4 · Three.js via React Three Fiber ·
Supabase (Postgres, Auth with Google, Storage) · Vercel

## Planning documents

Start with **[`docs/README.md`](docs/README.md)**. It gives the reading order, the ID conventions
and the glossary.

| # | Document | # | Document |
|--:|---|--:|---|
| 00 | [Project charter](docs/00-project-charter.md) | 10 | [Roadmap Docs system](docs/10-roadmap-docs-system.md) |
| 01 | [Product requirements](docs/01-product-requirements.md) | 11 | [Content modules](docs/11-content-modules.md) |
| 02 | [Non-functional requirements](docs/02-non-functional-requirements.md) | 12 | [Integrations & sync](docs/12-integrations-and-sync.md) |
| 03 | [Information architecture](docs/03-information-architecture.md) | 13 | [API & data flow](docs/13-api-and-data-flow.md) |
| 04 | [Design system](docs/04-design-system.md) | 14 | [DevOps & environments](docs/14-devops-and-environments.md) |
| 05 | [3D experience](docs/05-3d-experience.md) | 15 | [Testing & QA](docs/15-testing-and-qa.md) |
| 06 | [System architecture](docs/06-system-architecture.md) | 16 | [Delivery plan](docs/16-delivery-plan.md) |
| 07 | [Database design](docs/07-database-design.md) | 17 | [Risks & decisions (ADRs)](docs/17-risks-and-decisions.md) |
| 08 | [Auth & security](docs/08-auth-and-security.md) | 18 | [Content inventory](docs/18-content-inventory.md) |
| 09 | [Admin panel](docs/09-admin-panel.md) | 19 | [Audit checklist & open questions](docs/19-audit-checklist.md) |
