import { createClient } from '@supabase/supabase-js'
import { Redis } from '@upstash/redis'
import { SupabaseTaskRepository } from '~/server/repositories/supabaseTaskRepository'

export const getTaskRepository = () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey)
  return new SupabaseTaskRepository(supabase)
}

export const getRedis = () => {
  const config = useRuntimeConfig()
  return new Redis({
    url: config.upstashRedisRestUrl,
    token: config.upstashRedisRestToken
  })
}
