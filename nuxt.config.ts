export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    preset: 'vercel'
  },
  typescript: {
    strict: true
  }
})
