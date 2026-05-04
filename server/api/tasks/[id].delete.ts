import { getTaskRepository, getRedis } from '~/server/utils/container'

export default defineEventHandler(async (event) => {
  const deleted = await getTaskRepository().delete(getRouterParam(event, 'id') || '')
  if (!deleted) throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  await getRedis().del('tasks:all')
  setResponseStatus(event, 204)
  return null
})
