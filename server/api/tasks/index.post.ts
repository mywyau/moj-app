import { nanoid } from 'nanoid'
import { createTaskSchema } from '~/server/utils/validation'
import { getTaskRepository, getRedis } from '~/server/utils/container'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = createTaskSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: parsed.error.message })
  }

  const now = new Date().toISOString()
  const task = {
    id: nanoid(),
    title: parsed.data.title,
    description: parsed.data.description || null,
    status: parsed.data.status,
    dueAt: parsed.data.dueAt,
    createdAt: now,
    updatedAt: now
  }

  const repo = getTaskRepository()
  const created = await repo.create(task)
  await getRedis().del('tasks:all')
  setResponseStatus(event, 201)
  return created
})
