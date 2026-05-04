import type { H3Event } from 'h3'
import {
  createError,
  defineEventHandler,
  getHeader,
  readBody,
} from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/db/db'

const allowedStatuses = ['todo', 'in_progress', 'done'] as const
type TaskStatus = typeof allowedStatuses[number]

type SupabaseJwtPayload = {
  sub: string
  email?: string
  role?: string
  aud?: string
  exp?: number
}

const getOptionalUserId = async (event: H3Event): Promise<string | null> => {
  const authorization = getHeader(event, 'authorization')

  if (!authorization?.startsWith('Bearer ')) {
    return null
  }

  const token = authorization.slice('Bearer '.length).trim()

  if (!token) {
    return null
  }

  const jwtSecret = process.env.SUPABASE_JWT_SECRET

  if (!jwtSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing SUPABASE_JWT_SECRET',
    })
  }

  try {
    const payload = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
      audience: 'authenticated',
    }) as SupabaseJwtPayload

    return payload.sub ?? null
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title?: string
    description?: string
    dueDateTime?: string
    status?: TaskStatus
  }>(event)

  const title = body.title?.trim()

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'title is required',
    })
  }

  if (!body.dueDateTime || Number.isNaN(Date.parse(body.dueDateTime))) {
    throw createError({
      statusCode: 400,
      statusMessage: 'dueDateTime must be a valid ISO date string',
    })
  }

  const status = body.status ?? 'todo'

  if (!allowedStatuses.includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'status must be todo, in_progress, or done',
    })
  }

  const userId = await getOptionalUserId(event)

  try {
    const result = await db.query(
      `
        insert into tasks (
          title,
          description,
          status,
          due_date_time,
          user_id
        )
        values ($1, $2, $3, $4, $5)
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
        body.description?.trim() ?? '',
        status,
        body.dueDateTime,
        userId,
      ],
    )

    const data = result.rows[0]

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
  } catch (error) {
    console.error('Failed to create task', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create task',
    })
  }
})