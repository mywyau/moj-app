import { z } from 'zod'

export const taskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

export const createTaskSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().max(2000).optional().or(z.literal('')),
  status: taskStatusSchema.default('todo'),
  dueAt: z.string().datetime()
})

export const updateTaskStatusSchema = z.object({
  status: taskStatusSchema
})
