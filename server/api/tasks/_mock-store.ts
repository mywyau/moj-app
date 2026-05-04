export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  dueDateTime: string
  createdAt: string
  updatedAt: string
}

const now = new Date().toISOString()

const taskStore: Task[] = [
  {
    id: 1,
    title: 'Review hearing bundle',
    description: 'Check all uploaded evidence before tomorrow morning.',
    status: 'in_progress',
    dueDateTime: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString(),
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: 'Call probation service',
    description: 'Confirm the latest risk assessment details.',
    status: 'todo',
    dueDateTime: new Date(Date.now() + 1000 * 60 * 60 * 50).toISOString(),
    createdAt: now,
    updatedAt: now,
  },
]

let nextTaskId = 3

export const getTasks = () => taskStore
export const getNextTaskId = () => nextTaskId++
