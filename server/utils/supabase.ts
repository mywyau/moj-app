// import { createClient } from '@supabase/supabase-js'

// export const getServerSupabase = () => {
//   const config = useRuntimeConfig()

//   if (!config.public.supabaseUrl || !config.supabaseServiceRoleKey) {
//     throw createError({
//       statusCode: 500,
//       statusMessage: 'Missing Supabase server runtime configuration'
//     })
//   }

//   return createClient(config.public.supabaseUrl, config.supabaseServiceRoleKey)
// }
