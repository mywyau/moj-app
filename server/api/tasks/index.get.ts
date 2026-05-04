import {
  createError,
  defineEventHandler,
} from 'h3'
import { db } from '~/server/db/db'
import { requireUser } from '~/server/utils/auth'

type DbTask = {
  id: string
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  due_date_time: string
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  try {
    const result = await db.query<DbTask>(
      `
        select
          id,
          title,
          description,
          status,
          due_date_time,
          created_at,
          updated_at
        from tasks
        where user_id = $1
        order by due_date_time asc
      `,
      [user.id],
    )

    const tasks = result.rows.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description ?? '',
      status: task.status,
      dueDateTime: task.due_date_time,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    }))

    return { tasks }
  } catch (error) {
    console.error('Failed to fetch tasks', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch tasks',
    })
  }
})