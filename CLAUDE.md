@AGENTS.md

# Eyasir Ahamed — portfolio

Personal site of a junior software engineer: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4,
React Three Fiber, Supabase. The full plan lives in `docs/` (product, UX in `docs/ux/`, engineering playbook
in `docs/dev/`). Current phase and what's built: `docs/dev/dev-04-phase-plans.md`, `docs/CHANGELOG.md`.

## Commands

- `pnpm dev` · `pnpm build` · `pnpm start`
- `pnpm check` = lint + typecheck + unit tests (run before every commit)
- `pnpm e2e` = Playwright + axe on desktop and mobile (builds and starts on port 3200, Codeforces from fixtures)
- `pnpm exec supabase start` / `db reset` / `test db` — local database, migrations, pgTAP

## Rules

- Content is typed data in `content/` validated by Zod; never invent facts about the owner. Unknown values are
  omitted, not guessed (UX principle U4, honest states).
- Design tokens only (`app/globals.css`, docs/04). `--faint` is for ornaments, never text (contrast).
- Server-only code imports `server-only`; the secret-key Supabase client (`lib/supabase/admin.ts`) is never
  imported by client components.
- Every table ships with RLS enabled and a pgTAP test in the same PR. Create migrations with
  `pnpm exec supabase migration new <name> < /dev/null` (it reads stdin otherwise). Never change a shared
  database by hand or through the Supabase MCP server; migrations are applied by CI (docs/dev/dev-03).
- Accessibility: one `h1` per page, labelled controls, visible focus, reduced-motion fallbacks for all 3D.
