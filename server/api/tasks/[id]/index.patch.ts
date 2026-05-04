import {
  createError,
  defineEventHandler,
  getRouterParam,
  readBody,
} from 'h3'
import { db } from '~/server/db/db'
import { requireUser } from '~/server/utils/auth'

const allowedStatuses = ['todo', 'in_progress', 'done'] as const
type TaskStatus = typeof allowedStatuses[number]

type TaskRow = {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  due_date_time: string
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid task id',
    })
  }

  const body = await readBody<{ status?: TaskStatus }>(event)

  if (!body.status || !allowedStatuses.includes(body.status)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'status must be todo, in_progress, or done',
    })
  }

  try {
    const result = await db.query<TaskRow>(
      `
        update tasks
        set
          status = $1,
          updated_at = now()
        where id = $2
          and user_id = $3
        returning
          id,
          title,
          description,
          status,
          due_date_time,
          created_at,
          updated_at
      `,
      [body.status, id, user.id],
    )

    const data = result.rows[0]

    if (!data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Task not found',
      })
    }

    return {
      task: {
        id: data.id,
        title: data.title,
        description: data.description ?? '',
        status: data.status,
        dueDateTime: data.due_date_time,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Failed to update task status', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update task status',
    })
  }
})