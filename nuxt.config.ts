export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    public: {
      appName: 'moj-app',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
  },
  nitro: {
    preset: 'vercel'
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
