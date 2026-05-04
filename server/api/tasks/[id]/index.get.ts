import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const supabase = getServerSupabase()
  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, status, due_date_time, created_at, updated_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!data) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
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
