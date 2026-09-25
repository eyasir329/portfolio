# Engineering Playbook — Index

> **Version:** 0.5 (draft for owner audit) · **Date:** 2026-09-25 · Part of the planning set
> ([../README.md](../README.md)). **No application code yet.** This folder is the senior full-stack
> developer's plan for **how** each phase is built, tested, deployed and operated.

The product plan (docs 00–21) says *what* and *why*; the UX set ([`../ux/`](../ux/README.md)) says
*how it looks and behaves*. This playbook turns both into **day-to-day engineering practice**: the
toolchain (including the Supabase MCP server and agent skills now configured in this repository),
repository conventions, the Supabase workflow, a step-by-step development and deployment plan for
every phase, the CI/CD and release pipeline, operations, and the quality gates between phases.

---

## 1. Documents

| # | Document | What you audit there |
|--:|---|---|
| DEV-01 | [Toolchain, workspace & AI tooling](dev-01-toolchain-and-ai-tooling.md) | Pinned tools, local setup, the Supabase MCP server in `.mcp.json`, installed agent skills, safety rules for AI agents, the future `CLAUDE.md` |
| DEV-02 | [Repository, conventions & workflow](dev-02-repo-conventions-and-workflow.md) | Folder boundaries, coding standards, branching, commits, PRs, reviews, dependencies, docs-as-code |
| DEV-03 | [Supabase workflow (CLI + MCP)](dev-03-supabase-workflow.md) | Project map (local / staging / production), migrations, RLS tests, types, auth providers and hooks, storage, cron, secrets, which MCP tools may touch which environment |
| DEV-04 | [Phase-by-phase development & deployment plan](dev-04-phase-plans.md) | For P1…P8: entry criteria, build order, schema, routes, tests, flags, deploy steps, demo, exit gate, rollback |
| DEV-05 | [Environments, CI/CD & release engineering](dev-05-cicd-and-release.md) | Local → PR preview → staging → production pipeline, GitHub Actions workflows, migration choreography, Vercel and DNS set-up, feature flags, rollback |
| DEV-06 | [Operations handbook](dev-06-operations.md) | Observability per phase, incident process, runbooks RB-01…RB-16, backups and restore drills, secret rotation, cost watch, maintenance calendar |
| DEV-07 | [Quality gates & checklists](dev-07-quality-gates.md) | PR checklist, pre/post-deploy checklists, phase gates PG-1…PG-8, production-readiness review, handover |

**Reading order:** DEV-01 → DEV-03 (the two things to set up first) → DEV-04 for the phase you are
about to start → DEV-05 before the first deploy → DEV-06/07 before production traffic.

## 2. What is already configured in this repository

| Item | File | State | Next step |
|---|---|---|---|
| Supabase MCP server (project-scoped, HTTP) | [`/.mcp.json`](../../.mcp.json) | Added with `claude mcp add --scope project …` for project ref `kahrpgvddpukjbwdxhlq` | **Owner:** approve and authenticate it locally (DEV-01 §4.2); decide the project's role (`Q-43`) |
| Supabase agent skills (`supabase`, `supabase-postgres-best-practices`) | [`/.claude/skills/`](../../.claude/skills/), [`/skills-lock.json`](../../skills-lock.json) | Installed with `npx skills add supabase/agent-skills` (copied, project level, Claude Code) | Loaded automatically by Claude Code when a task touches Supabase or Postgres (DEV-01 §5) |
| Application code | — | **None** (planning phase) | Scaffold in P1 (US-100) after sign-off |

## 3. ID conventions used here

| Prefix | Meaning | Defined in | Example |
|---|---|---|---|
| `DEV-nn` | Engineering playbook document | this folder | `DEV-04` Phase plans |
| `PG-n` | Phase gate (exit checklist of phase Pn) | DEV-07 | `PG-3` Bundle engine live |
| `RB-nn` | Operations runbook | DEV-06 | `RB-04` Migration failed in production |
| `WF-nn`, `US-nnn`, `SP-nn`, `T-*`, `UAT-nn` | Wireframe, story, spike, test, acceptance script | ux/, 16, 15 | `US-203` Reader runtime v1 |
| `Q-nn` | Owner decision (new here: `Q-43…Q-46`) | [21 §3](../21-audit-checklist.md) | `Q-43` Role of the connected Supabase project |

## 4. Engineering principles (the senior-developer stance)

| # | Principle | In practice |
|---|---|---|
| E1 | **Walking skeleton first** | Production exists from the end of P1 (behind a "coming soon" flag and `noindex`), so every phase ships to a real environment, not a big-bang launch |
| E2 | **Schema is code** | Every database change is a migration file in git, reviewed in a PR and applied by CI. No hand edits in dashboards, and no agent writes to shared databases |
| E3 | **RLS before rows** | A table never exists without RLS and a pgTAP test for its policies, in the same migration/PR |
| E4 | **Expand → migrate → contract** | Additive schema first, code second, destructive clean-up one release later; every deploy is reversible by an app rollback |
| E5 | **Flags over branches** | Unfinished features merge to `main` behind `site_settings.flags` or per-platform switches; long-lived branches are avoided |
| E6 | **Budgets are tests** | Bundle size, runtime size (≤ 8 KB gzip), Lighthouse, axe and Postgres advisors run in CI and fail the build |
| E7 | **Observable from day one** | Sentry, uptime and health endpoints are part of P1, not P8 |
| E8 | **AI-assisted, human-owned** | Claude Code, the Supabase MCP server and skills speed up work, but every change goes through a PR the owner approves; agents get the least access that works (DEV-01 §6) |
