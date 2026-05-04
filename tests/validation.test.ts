import { describe, expect, it } from 'vitest'
import { createTaskSchema, updateTaskStatusSchema } from '../server/utils/validation'

describe('createTaskSchema', () => {
  it('accepts valid payload', () => {
    const parsed = createTaskSchema.parse({
      title: 'Review evidence',
      description: 'Check uploaded docs',
      status: 'todo',
      dueAt: '2026-12-30T10:30:00.000Z'
    })

    expect(parsed.title).toBe('Review evidence')
  })

  it('rejects invalid dueAt', () => {
    expect(() => createTaskSchema.parse({
      title: 'Bad task',
      status: 'todo',
      dueAt: 'tomorrow'
    })).toThrow()
  })
})

describe('updateTaskStatusSchema', () => {
  it('rejects unknown statuses', () => {
    expect(() => updateTaskStatusSchema.parse({ status: 'paused' })).toThrow()
  })
})
