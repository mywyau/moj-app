import { getServerSupabase } from '~/server/utils/supabase'
import { requireUser } from '~/server/utils/auth'

type DbTask = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  due_date_time: string
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const supabase = getServerSupabase()

  const { data, error } = await supabase
    .from('tasks')
    .select('id, title, description, status, due_date_time, created_at, updated_at')
    .eq('user_id', user.id)
    .order('due_date_time', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  const tasks = (data ?? []).map((task: DbTask) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDateTime: task.due_date_time,
    createdAt: task.created_at,
    updatedAt: task.updated_at,
  }))

  return { tasks }
})
