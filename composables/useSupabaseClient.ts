import { createClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    throw new Error('Missing Supabase public runtime config values')
  }

  return createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
}
