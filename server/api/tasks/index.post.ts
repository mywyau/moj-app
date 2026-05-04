import { getNextTaskId, getTasks, type Task, type TaskStatus } from './_mock-store'

const allowedStatuses: TaskStatus[] = ['todo', 'in_progress', 'done']

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<Task>>(event)

  const title = body.title?.trim()
  if (!title) {
    throw createError({ statusCode: 400, statusMessage: 'title is required' })
  }

  if (!body.dueDateTime || Number.isNaN(Date.parse(body.dueDateTime))) {
    throw createError({ statusCode: 400, statusMessage: 'dueDateTime must be a valid ISO date string' })
  }

  const status = body.status ?? 'todo'
  if (!allowedStatuses.includes(status)) {
    throw createError({ statusCode: 400, statusMessage: 'status must be todo, in_progress, or done' })
  }

  const now = new Date().toISOString()
  const task: Task = {
    id: getNextTaskId(),
    title,
    description: body.description?.trim() ?? '',
    status,
    dueDateTime: body.dueDateTime,
    createdAt: now,
    updatedAt: now,
  }

  getTasks().unshift(task)
  return { task }
})
