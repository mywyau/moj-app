import { Redis } from '@upstash/redis'

export const getRedis = () => {
  const config = useRuntimeConfig()

  if (!config.upstashRedisRestUrl || !config.upstashRedisRestToken) {
    throw new Error('Missing Upstash runtime config values')
  }

  return new Redis({
    url: config.upstashRedisRestUrl,
    token: config.upstashRedisRestToken
  })
}
