import type { Task } from '~/types/task'

export interface TaskRepository {
  create(task: Task): Promise<Task>
  getById(id: string): Promise<Task | null>
  getAll(): Promise<Task[]>
  updateStatus(id: string, status: Task['status']): Promise<Task | null>
  delete(id: string): Promise<boolean>
}
