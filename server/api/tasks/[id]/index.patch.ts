import { getTasks, type TaskStatus } from '../_mock-store'

const allowedStatuses: TaskStatus[] = ['todo', 'in_progress', 'done']

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const body = await readBody<{ status?: TaskStatus }>(event)
  if (!body.status || !allowedStatuses.includes(body.status)) {
    throw createError({ statusCode: 400, statusMessage: 'status must be todo, in_progress, or done' })
  }

  const task = getTasks().find(item => item.id === id)
  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  task.status = body.status
  task.updatedAt = new Date().toISOString()

  return { task }
})
