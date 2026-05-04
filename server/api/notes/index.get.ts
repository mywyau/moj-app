import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const query = getQuery(event)
  const limit = Math.min(Number(query.limit ?? 20), 100)
  const offset = Math.max(Number(query.offset ?? 0), 0)

  const supabase = getServerSupabase()
  const { data, error, count } = await supabase
    .from('notes')
    .select('id, user_id, title, body, created_at, updated_at', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { notes: data ?? [], count: count ?? 0, limit, offset }
})
