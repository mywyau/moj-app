export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return {
    ok: true,
    timestamp: new Date().toISOString(),
    redisConfigured: Boolean(config.upstashRedisRestUrl && config.upstashRedisRestToken),
    supabaseConfigured: Boolean(config.public.supabaseUrl && config.public.supabaseKey)
  }
})
