import type { H3Event } from 'h3'
import { createError, getHeader } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/db/db'

export type AuthUser = {
  id: string
  email: string | null
  role?: string | null
}

type SupabaseJwtPayload = {
  sub: string
  email?: string
  role?: string
  aud?: string
  exp?: number
}

const getBearerToken = (event: H3Event) => {
  const authorization = getHeader(event, 'authorization')

  if (!authorization?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing or invalid Authorization header',
    })
  }

  return authorization.slice('Bearer '.length).trim()
}

const verifySupabaseToken = (token: string): SupabaseJwtPayload => {
  const jwtSecret = process.env.SUPABASE_JWT_SECRET

  if (!jwtSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing SUPABASE_JWT_SECRET',
    })
  }

  try {
    return jwt.verify(token, jwtSecret, {
      algorithms: ['HS256'],
      audience: 'authenticated',
    }) as SupabaseJwtPayload
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid or expired token',
    })
  }
}

export const requireUser = async (event: H3Event): Promise<AuthUser> => {
  const token = getBearerToken(event)
  const payload = verifySupabaseToken(token)

  if (!payload.sub) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token payload',
    })
  }

  const result = await db.query<AuthUser>(
    `
      select
        id,
        email,
        role
      from users
      where id = $1
      limit 1
    `,
    [payload.sub],
  )

  const user = result.rows[0]

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not found',
    })
  }

  return user
}