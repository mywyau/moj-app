import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const serviceRoleKey = config.supabaseServiceRoleKey

  if (!supabaseUrl) {
    throw new Error('Missing runtimeConfig.public.supabaseUrl')
  }

  if (!serviceRoleKey) {
    throw new Error('Missing runtimeConfig.supabaseServiceRoleKey')
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}