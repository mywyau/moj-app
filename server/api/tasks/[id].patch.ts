import { updateTaskStatusSchema } from '~/server/utils/validation'
import { getTaskRepository, getRedis } from '~/server/utils/container'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = updateTaskStatusSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.message })
  }

  const updated = await getTaskRepository().updateStatus(getRouterParam(event, 'id') || '', parsed.data.status)
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  await getRedis().del('tasks:all')
  return updated
})
