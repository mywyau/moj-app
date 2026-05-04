import { getTaskRepository, getRedis } from '~/server/utils/container'

export default defineEventHandler(async () => {
  const redis = getRedis()
  const cacheKey = 'tasks:all'
  const cached = await redis.get(cacheKey)
  if (cached) return cached

  const repo = getTaskRepository()
  const tasks = await repo.getAll()
  await redis.set(cacheKey, tasks, { ex: 30 })
  return tasks
})
