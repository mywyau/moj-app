import type { H3Event } from 'h3'
import type { User } from '@supabase/supabase-js'
import { getServerSupabase } from './supabase'

const getBearerToken = (event: H3Event) => {
  const authorization = getHeader(event, 'authorization')

  if (!authorization?.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Missing or invalid Authorization header'
    })
  }

  return authorization.slice('Bearer '.length).trim()
}

export const requireUser = async (event: H3Event): Promise<User> => {
  const token = getBearerToken(event)
  const supabase = getServerSupabase()

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
  }

  return data.user
}
