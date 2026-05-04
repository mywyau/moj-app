import {
  createError,
  defineEventHandler,
  getRouterParam,
} from 'h3'

import { db } from '~/server/db/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'task id is required',
    })
  }

  try {
    const result = await db.query(
      `
        delete from tasks
        where id = $1
        returning id
      `,
      [id],
    )

    if (result.rowCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Task not found',
      })
    }

    return {
      deleted: true,
      id,
    }
  } catch (error: any) {
    if (error?.statusCode) {
      throw error
    }

    console.error('Failed to delete task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete task',
    })
  }
})