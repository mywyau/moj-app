# moj-app

Nuxt 3 starter scaffold for a **Vercel + serverless** stack using:
- Nuxt 3 / Nitro (Vercel preset)
- Supabase (`@supabase/supabase-js`)
- Upstash Redis (`@upstash/redis`)
- Tailwind CSS

## 1) Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## 2) Project structure

```txt
.
├── app/app.vue                     # landing page + health check
├── composables/useSupabaseClient.ts
├── lib/redis.ts
├── server/api/health.get.ts        # starter serverless endpoint
├── nuxt.config.ts                  # runtime config + vercel nitro preset
└── .env.example
```

## 3) Environment variables

Copy `.env.example` and fill in:

- `NUXT_PUBLIC_SUPABASE_URL`
- `NUXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Important
- Anything under `NUXT_PUBLIC_*` is exposed to the browser.
- Keep service-role and Upstash tokens server-only.

## 4) Supabase setup (recommended flow)

1. Create a Supabase project.
2. In **Project Settings → API**, copy:
   - Project URL → `NUXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NUXT_PUBLIC_SUPABASE_ANON_KEY`
   - service role key → `SUPABASE_SERVICE_ROLE_KEY`
3. Create your first table (for example `profiles`) and enable RLS.
4. Write policies before production use.

## 5) Upstash setup

1. Create a Redis database in Upstash.
2. Copy `REST URL` and `REST TOKEN` into:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## 6) Vercel deployment

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import into Vercel.
3. In Vercel project settings, add all environment variables from `.env.example`.
4. Build command: `npm run build`.
5. Output is handled by Nuxt/Nitro automatically.

Because `nitro.preset = 'vercel'`, API routes under `server/api` deploy as serverless functions.

## 7) Next steps to build features

- Add auth pages (`/login`, `/signup`) using Supabase auth.
- Add a server route using `SUPABASE_SERVICE_ROLE_KEY` for privileged writes.
- Add caching/rate limiting with Upstash in API handlers.
- Add Zod validation for all request payloads.
- Add observability (Vercel logs + Sentry).

## 8) Helpful commands

```bash
npm run dev
npm run build
npm run preview
```

## 9) Database schema (saved)

The initial Supabase schema is saved at:

- `supabase/initial_schema.sql`

You can run it in the Supabase SQL Editor to recreate tables/policies consistently.

