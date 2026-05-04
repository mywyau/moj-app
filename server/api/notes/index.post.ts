import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readBody<{ title?: string; body?: string }>(event)

  const title = body?.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'title is required' })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('notes')
    .insert({ user_id: user.id, title, body: body?.body ?? '' })
    .select('id, user_id, title, body, created_at, updated_at')
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { note: data }
})
