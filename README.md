# DTS Developer Technical Test - Nuxt 3 + Vercel + Supabase + Upstash

This project scaffolds a full-stack **task management app** aligned with your requested stack:
- **Nuxt 3** frontend + server API routes (Nitro)
- **Vercel serverless** deployment preset
- **Supabase Postgres** for persistence
- **Upstash Redis** for short-lived API caching
- **Vitest** unit tests

## Features implemented

### Backend API
- `POST /api/tasks` create task (`title`, optional `description`, `status`, `dueAt`)
- `GET /api/tasks/:id` retrieve by id
- `GET /api/tasks` retrieve all
- `PATCH /api/tasks/:id` update status
- `DELETE /api/tasks/:id` delete task
- Zod validation + error handling

### Frontend
- Task create form
- Task list UI
- Inline status updates
- Task deletion

## 1) Local setup

```bash
npm install
cp .env.example .env
```

Populate `.env` with your Supabase/Upstash credentials.

## 2) Supabase setup

1. Create a Supabase project.
2. Open SQL editor and run `db/schema.sql`.
3. Get:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

> For production, keep `SUPABASE_SERVICE_ROLE_KEY` server-only (never expose in client-side code).

## 3) Upstash setup

1. Create an Upstash Redis database.
2. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

Used for caching `GET /api/tasks` for 30 seconds and invalidated on create/update/delete.

## 4) Run and test

```bash
npm run dev
npm run test
```

## 5) Deploy to Vercel

1. Push repo to GitHub.
2. Import project in Vercel.
3. Add env vars from `.env.example`.
4. Deploy.

`nuxt.config.ts` already uses `nitro.preset = 'vercel'`.

## API contract quick reference

### Create task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Prepare hearing notes",
  "description": "Optional",
  "status": "todo",
  "dueAt": "2026-07-01T09:00:00.000Z"
}
```

### Update status
```http
PATCH /api/tasks/:id
Content-Type: application/json

{ "status": "in_progress" }
```

Allowed statuses: `todo`, `in_progress`, `done`.

## Suggested next steps (to score higher in test)

- Add auth (Supabase Auth + row-level security)
- Add pagination/filtering/sorting
- Add E2E tests (Playwright)
- Add OpenAPI schema + Swagger UI
- Add CI checks (lint, typecheck, test)
- Add audit fields (`created_by`, `updated_by`)

