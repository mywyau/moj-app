import {
  createError,
  defineEventHandler,
  getRouterParam,
} from 'h3'
import { db } from '~/server/db/db'
import { requireUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid task id',
    })
  }

  try {
    const result = await db.query(
      `
        delete from tasks
        where id = $1
          and user_id = $2
        returning id
      `,
      [id, user.id],
    )

    if (result.rowCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Task not found',
      })
    }

    return { ok: true }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    console.error('Failed to delete task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete task',
    })
  }
})