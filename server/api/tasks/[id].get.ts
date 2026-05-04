import { getTaskRepository } from '~/server/utils/container'

export default defineEventHandler(async (event) => {
  const task = await getTaskRepository().getById(getRouterParam(event, 'id') || '')
  if (!task) throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  return task
})
