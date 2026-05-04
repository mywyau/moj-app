import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const supabase = getServerSupabase()

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, created_at, updated_at')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return {
    profile: data,
    authUser: {
      id: user.id,
      email: user.email
    }
  }
})
