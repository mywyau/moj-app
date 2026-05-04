import {
  createError,
  defineEventHandler,
  readBody,
} from 'h3'
import { pool } from '~/server/db/db'
import { requireUser } from '~/server/utils/auth'

type ProfileRow = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  const body = await readBody<{
    full_name?: string | null
    avatar_url?: string | null
  }>(event)

  const fullName = body.full_name?.trim() || null
  const avatarUrl = body.avatar_url?.trim() || null

  if (fullName && fullName.length > 200) {
    throw createError({
      statusCode: 400,
      statusMessage: 'full_name must be <= 200 chars',
    })
  }

  try {
    const result = await pool.query<ProfileRow>(
      `
        insert into profiles (
          id,
          email,
          full_name,
          avatar_url,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, now(), now())
        on conflict (id)
        do update set
          email = excluded.email,
          full_name = coalesce(excluded.full_name, profiles.full_name),
          avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
          updated_at = now()
        returning
          id,
          email,
          full_name,
          avatar_url,
          created_at,
          updated_at
      `,
      [
        user.id,
        user.email ?? null,
        fullName,
        avatarUrl,
      ],
    )

    return {
      profile: result.rows[0],
    }
  } catch (error) {
    console.error('Failed to upsert profile', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upsert profile',
    })
  }
})