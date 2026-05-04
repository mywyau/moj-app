import { getTasks } from '../_mock-store'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid task id' })
  }

  const task = getTasks().find(item => item.id === id)

  if (!task) {
    throw createError({ statusCode: 404, statusMessage: 'Task not found' })
  }

  return { task }
})
