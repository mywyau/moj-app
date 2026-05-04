# moj-app

A Nuxt 3 web app deployed with Nitro on Vercel, backed by Supabase auth/data and PostgreSQL-powered APIs.

## Tech stack

- **Framework:** Nuxt 3 + Vue 3 + TypeScript
- **Styling:** Tailwind CSS
- **Auth/Data:** Supabase (`@nuxtjs/supabase` + `@supabase/supabase-js`)
- **Server APIs:** Nuxt server routes (`server/api/*`)
- **Database:** PostgreSQL (`pg`) and Supabase
- **Deployment target:** Vercel serverless (`nitro.preset = "vercel"`)

## Features currently in this repo

- Public site pages (home, contact, legal pages, patch notes)
- App pages for tasks and dashboard.
- Server API routes for:
  - profile CRUD endpoints
  - task CRUD endpoints
- Shared utilities for Supabase auth/admin access and DB access.

## Project structure

```txt
.
├── app.vue
├── components/                 # navigation, footer, shared UI pieces
├── pages/                      # route pages
├── middleware/                 # route guards / gating
├── server/
│   ├── api/                    # server API endpoints
│   ├── db/                     # DB client setup
│   └── utils/                  # auth + supabase server helpers
├── lib/redis.ts                # Upstash Redis helper
├── supabase/initial_schema.sql # base schema snapshot
├── nuxt.config.ts
└── package.json
```

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a local env file (for example `.env`) and set the values used in `nuxt.config.ts`:

```bash
# Supabase (client + server)
NUXT_PUBLIC_SUPABASE_URL=
NUXT_PUBLIC_SUPABASE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=

# Database
DATABASE_URL=

# Optional Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

> Note: `NUXT_PUBLIC_*` variables are exposed to the browser. Keep service-role keys and secrets server-only.

### 3) Run locally

```bash
npm run dev
```

App runs by default at `http://localhost:3000`.

## Available scripts

```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build locally
```

## Database schema

A starter schema is included at:

- `supabase/initial_schema.sql`

Use this file in the Supabase SQL editor (or your migration workflow) to initialize baseline tables/policies.

## Deployment notes (Vercel)

- This project is configured with `nitro.preset = "vercel"`.
- Nuxt server routes under `server/api` are deployed as serverless functions.
- Add all required environment variables in your Vercel project settings before deploy.

## License

MIT — see [`LICENSE`](./LICENSE).
