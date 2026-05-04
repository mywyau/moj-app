import { createClient } from '@supabase/supabase-js'

export const getSupabaseAdmin = () => {

  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.public.supabaseKey

  if (!supabaseUrl) {
    throw new Error('Missing runtimeConfig.public.supabaseUrl')
  }

  if (!supabaseKey) {
    throw new Error('Missing runtimeConfig.supabaseKey')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}