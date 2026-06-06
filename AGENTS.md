# AGENTS.md

Compact guidance for OpenCode in this repo. README is stale (mentions Prisma + NextAuth — repo actually uses Drizzle + Better Auth).

## Tooling

- **Always use `bun` / `bunx`**. Never `npm`/`pnpm`/`yarn`.
- Node toolchain: Next.js 15 (App Router, Turbopack), React 19, TS 5.8, ESM-only (`"type": "module"`, `verbatimModuleSyntax`).
- Path alias: `@/*` → `src/*`.

## Commands (verified in `package.json`)

- `bun run dev` — runs `./scripts/dev.sh`. It loads `.env`, auto-starts the Docker Postgres if `DATABASE_URL` is localhost, then `next dev --turbo`. Use this, not `dev:next`, unless the DB is already up.
- `bun run check` — `next lint && tsc --noEmit`. Run before declaring work done. Individual: `bun run lint`, `bun run typecheck`.
- `bun run lint:fix`, `bun run format:write` — autofix.
- **No test runner configured.** Don't invent one.

## Database (Drizzle + Postgres)

- Schema entry: `src/server/db/schema.ts` is a **barrel** — it defines shared helpers (`createTable`) plus the Better Auth tables that cross-reference each other (`session`, `account`, `verification`, relations) and `export *` from per-table modules under `src/server/db/schemas/`.
- **New tables go in their own file under `src/server/db/schemas/`** (e.g. `src/server/db/schemas/phone.ts`) and must be re-exported from `schema.ts` via `export * from "./schemas/<name>"` so the drizzle client (`import * as schema`) and `drizzle-kit` pick them up.
- Existing per-table modules: `schemas/user.ts` (includes `userRole` pgEnum: `customer | employee | manager`).
- Client: `src/server/db/index.ts` (`postgres-js`, HMR-cached).
- Dev workflow: `bun run db:push` (no migrations checked in). `db:generate` + `db:migrate` exist for prod-style flow. `db:reset` wipes the Docker volume.
- `bun run db:studio` for Drizzle Studio.
- `drizzle.config.ts` sets `tablesFilter: ["rf-phones_*"]` but `schema.ts` uses `pgTableCreator((name) => \`pg-drizzle_${name}\`)` and the Better Auth tables (`user`, `session`, `account`, `verification`) are unprefixed `pgTable(...)`. Drizzle Kit may not see all tables — confirm before changing prefixes or adding tables.
- ESLint enforces `.where()` on `db`/`ctx.db` `update`/`delete` via `eslint-plugin-drizzle`.

## Auth (Better Auth, not NextAuth)

- Config: `src/server/better-auth/config.ts` (email+password, GitHub OAuth).
- Route handler: `src/app/api/auth/[...all]/route.ts`.
- GitHub `redirectURI` is hardcoded to `http://localhost:3000/api/auth/callback/github` — update before non-local use.
- Env vars validated in `src/env.js` (T3 env). Add new vars there *and* in `.env.example`.

## Docker

- `docker-compose.yml` pulls `dhi.io/postgres:18-alpine3.22-dev` (Docker Hardened Images registry — auth may be required). If the image fails to pull, swap to `postgres:18-alpine` or similar.
- Helpers: `bun run docker:up|down|reset|logs|psql`.

## Code style

- Prettier with `prettier-plugin-tailwindcss`. ESLint extends `next/core-web-vitals` + `typescript-eslint` recommended-type-checked + stylistic-type-checked.
- Type imports must be inline (`import { type Foo }`) — enforced by `@typescript-eslint/consistent-type-imports`.
- `noUncheckedIndexedAccess` is on; treat array/object index access as possibly `undefined`.
- Existing source files mix tabs and spaces; Prettier will normalize on `format:write`.

## App layout

- `src/app/` — App Router pages: `/` (landing), `/intake`, `/rep/[id]`, `/api/auth/[...all]`.
- `src/components/` — shared UI (no `ui/` subdir, no shadcn).
- `src/server/` — `db/`, `better-auth/` (server-only).
- `src/data/phones.ts` — current product data is a static mock, not from the DB.
- Tailwind v4 via `@tailwindcss/postcss`; styles in `src/styles/globals.css`.

## Project-local OpenCode

- `.opencode/skills/ui-ux-pro-max/` is a local skill (already advertised in the system prompt). No `opencode.json` is checked in.

## Gotchas

- `dev.log`, `temp.html`, and `tsconfig.tsbuildinfo` in the repo root are local artifacts — don't edit or commit them.
- `.env` is gitignored but currently present locally; never echo its contents.
- README's "Prisma / NextAuth" references are wrong; don't use them as a source of truth.
