import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readBody<{ full_name?: string; avatar_url?: string }>(event)

  const fullName = body?.full_name?.trim()
  const avatarUrl = body?.avatar_url?.trim()

  if (fullName !== undefined && fullName.length > 200) {
    throw createError({ statusCode: 400, statusMessage: 'full_name must be <= 200 chars' })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      full_name: fullName ?? null,
      avatar_url: avatarUrl ?? null
    })
    .select('id, email, full_name, avatar_url, created_at, updated_at')
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { profile: data }
})
