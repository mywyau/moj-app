import {
  createError,
  defineEventHandler,
  readBody,
} from 'h3'
import { db } from '~/server/db/db'
import { getSupabaseAdmin } from '~/server/utils/supabase-admin'

type SignupBody = {
  email?: string
  password?: string
  full_name?: string | null
  avatar_url?: string | null
}

type ProfileRow = {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SignupBody>(event)

  const email = body.email?.trim().toLowerCase()
  const password = body.password
  const fullName = body.full_name?.trim() || null
  const avatarUrl = body.avatar_url?.trim() || null

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'email is required',
    })
  }

  if (!password || password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: 'password must be at least 8 characters',
    })
  }

  if (fullName && fullName.length > 200) {
    throw createError({
      statusCode: 400,
      statusMessage: 'full_name must be <= 200 chars',
    })
  }

  const supabaseAdmin = getSupabaseAdmin()

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      avatar_url: avatarUrl,
    },
  })

  if (error || !data.user) {
    throw createError({
      statusCode: 400,
      statusMessage: error?.message ?? 'Failed to create user',
    })
  }

  try {
    const result = await db.query<ProfileRow>(
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
          full_name = excluded.full_name,
          avatar_url = excluded.avatar_url,
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
        data.user.id,
        data.user.email ?? email,
        fullName,
        avatarUrl,
      ],
    )

    return {
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      profile: result.rows[0],
    }
  } catch (error) {
    console.error('User created but profile insert failed', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'User created but failed to create profile',
    })
  }
})