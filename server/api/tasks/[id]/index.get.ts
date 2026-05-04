import {
  createError,
  defineEventHandler,
  getRouterParam,
} from 'h3'

import { db } from '~/server/db/db'

type TaskRow = {
  id: string
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  due_date_time: string | null
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid task id',
    })
  }

  try {
    const result = await db.query<TaskRow>(
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
        where id = $1
        limit 1
      `,
      [id],
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
        dueDateTime: data.due_date_time ?? '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Failed to fetch task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch task',
    })
  }
})