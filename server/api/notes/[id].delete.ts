// import { getServerSupabase } from '~/server/utils/supabase'
// import { requireUser } from '~/server/utils/auth'

// export default defineEventHandler(async (event) => {
//   const user = await requireUser(event)
//   const noteId = Number(getRouterParam(event, 'id'))

//   if (!Number.isInteger(noteId) || noteId <= 0) {
//     throw createError({ statusCode: 400, statusMessage: 'Invalid note id' })
//   }

//   const supabase = getServerSupabase()
//   const { data, error } = await supabase
//     .from('notes')
//     .delete()
//     .eq('id', noteId)
//     .eq('user_id', user.id)
//     .select('id')
//     .maybeSingle()

//   if (error) {
//     throw createError({ statusCode: 500, statusMessage: error.message })
//   }

//   if (!data) {
//     throw createError({ statusCode: 404, statusMessage: 'Note not found' })
//   }

//   return { ok: true, id: noteId }
// })
