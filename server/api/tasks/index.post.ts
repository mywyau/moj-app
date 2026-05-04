import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

const allowedStatuses = ['todo', 'in_progress', 'done'] as const
type TaskStatus = typeof allowedStatuses[number]

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readBody<{ title?: string; description?: string; dueDateTime?: string; status?: TaskStatus }>(event)

  const title = body.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'title is required' })
  }

  if (!body.dueDateTime || Number.isNaN(Date.parse(body.dueDateTime))) {
    throw createError({ statusCode: 400, statusMessage: 'dueDateTime must be a valid ISO date string' })
  }

  const status = body.status ?? 'todo'
  if (!allowedStatuses.includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'status must be todo, in_progress, or done' })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title,
      description: body.description?.trim() ?? '',
      status,
      due_date_time: body.dueDateTime,
    })
    .select('id, title, description, status, due_date_time, created_at, updated_at')
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return {
    task: {
      id: data.id,
      title: data.title,
      description: data.description,
      status: data.status,
      dueDateTime: data.due_date_time,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  }
})
