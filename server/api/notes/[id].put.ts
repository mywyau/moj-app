import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const noteId = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(noteId) || noteId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid note id' })
  }

  const body = await readBody<{ title?: string; body?: string }>(event)
  const updatePayload: { title?: string; body?: string } = {}

  if (typeof body?.title === 'string') {
    const title = body.title.trim()
    if (!title) {
      throw createError({ statusCode: 400, statusMessage: 'title cannot be empty' })
    }
    updatePayload.title = title
  }

  if (typeof body?.body === 'string') {
    updatePayload.body = body.body
  }

  if (!Object.keys(updatePayload).length) {
    throw createError({ statusCode: 400, statusMessage: 'No fields provided for update' })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('notes')
    .update(updatePayload)
    .eq('id', noteId)
    .eq('user_id', user.id)
    .select('id, user_id, title, body, created_at, updated_at')
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  }

  return { note: data }
})
