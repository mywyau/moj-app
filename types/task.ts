export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string | null
  status: TaskStatus
  dueAt: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  status: TaskStatus
  dueAt: string
}

export interface UpdateTaskStatusInput {
  status: TaskStatus
}
