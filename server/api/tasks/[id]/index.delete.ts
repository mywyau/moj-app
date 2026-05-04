import { getTasks } from '../_mock-store'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const tasks = getTasks()
  const taskIndex = tasks.findIndex(item => item.id === id)

  if (taskIndex < 0) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  tasks.splice(taskIndex, 1)

  return { ok: true }
})
