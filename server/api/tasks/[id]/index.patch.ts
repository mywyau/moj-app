import {
  createError,
  defineEventHandler,
  getRouterParam,
  readBody,
} from 'h3'

import { db } from '~/server/db/db'

const allowedStatuses = ['todo', 'in_progress', 'done'] as const
type TaskStatus = typeof allowedStatuses[number]

type UpdateTaskBody = {
  title?: string
  description?: string
  dueDateTime?: string | null
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
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'task id is required',
    })
  }

  const body = await readBody<UpdateTaskBody>(event)

  const updates: string[] = []
  const values: unknown[] = []
  let paramIndex = 1

  if (body.title !== undefined) {
    const title = body.title.trim()

    if (!title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'title cannot be empty',
      })
    }

    updates.push(`title = $${paramIndex}`)
    values.push(title)
    paramIndex++
  }

  if (body.description !== undefined) {
    updates.push(`description = $${paramIndex}`)
    values.push(body.description.trim())
    paramIndex++
  }

  if (body.status !== undefined) {
    if (!allowedStatuses.includes(body.status as TaskStatus)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'status must be todo, in_progress, or done',
      })
    }

    updates.push(`status = $${paramIndex}`)
    values.push(body.status)
    paramIndex++
  }

  if (body.dueDateTime !== undefined) {
    const dueDateTime = body.dueDateTime?.trim() || null

    if (dueDateTime && Number.isNaN(Date.parse(dueDateTime))) {
      throw createError({
        statusCode: 400,
        statusMessage: 'dueDateTime must be a valid date string',
      })
    }

    updates.push(`due_date_time = $${paramIndex}`)
    values.push(dueDateTime)
    paramIndex++
  }

  if (updates.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No fields provided to update',
    })
  }

  updates.push('updated_at = now()')
  values.push(id)

  try {
    const result = await db.query<DbTask>(
      `
        update tasks
        set ${updates.join(', ')}
        where id = $${paramIndex}
        returning
          id,
          title,
          description,
          status,
          due_date_time,
          created_at,
          updated_at
      `,
      values,
    )

    if (result.rowCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Task not found',
      })
    }

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
  } catch (error: any) {
    if (error?.statusCode) {
      throw error
    }

    console.error('Failed to update task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update task',
    })
  }
})