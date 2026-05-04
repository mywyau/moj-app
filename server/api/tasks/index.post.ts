import {
  createError,
  defineEventHandler,
  readBody,
} from 'h3'

import { db } from '~/server/db/db'

const allowedStatuses = ['todo', 'in_progress', 'done'] as const
type TaskStatus = typeof allowedStatuses[number]

type CreateTaskBody = {
  title?: string
  description?: string
  dueDateTime?: string
  status?: string
}

type DbTask = {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  due_date_time: string | null
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateTaskBody>(event)

  const title = body.title?.trim()

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title is required',
    })
  }

  const description = body.description?.trim() ?? ''
  const rawStatus = body.status ?? 'todo'

  if (!allowedStatuses.includes(rawStatus as TaskStatus)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'status must be todo, in_progress, or done',
    })
  }

  const status = rawStatus as TaskStatus

  const dueDateTime = body.dueDateTime?.trim() || null

  if (dueDateTime && Number.isNaN(Date.parse(dueDateTime))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'dueDateTime must be a valid date string',
    })
  }

  try {
    const result = await db.query<DbTask>(
      `
        insert into tasks (
          title,
          description,
          status,
          due_date_time
        )
        values ($1, $2, $3, $4)
        returning
          id,
          title,
          description,
          status,
          due_date_time,
          created_at,
          updated_at
      `,
      [
        title,
        description,
        status,
        dueDateTime,
      ],
    )

    const task = result.rows[0]

    return {
      task: {
        id: task.id,
        title: task.title,
        description: task.description ?? '',
        status: task.status,
        dueDateTime: task.due_date_time ?? '',
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      },
    }
  } catch (error) {
    console.error('Failed to create task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create task',
    })
  }
})