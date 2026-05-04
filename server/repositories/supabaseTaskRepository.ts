import type { SupabaseClient } from '@supabase/supabase-js'
import type { Task } from '~/types/task'
import type { TaskRepository } from './taskRepository'

interface TaskRow {
  id: string
  title: string
  description: string | null
  status: Task['status']
  due_at: string
  created_at: string
  updated_at: string
}

const mapRow = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  description: row.description,
  status: row.status,
  dueAt: row.due_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at
})

export class SupabaseTaskRepository implements TaskRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async create(task: Task): Promise<Task> {
    const { data, error } = await this.supabase.from('tasks').insert({
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      due_at: task.dueAt,
      created_at: task.createdAt,
      updated_at: task.updatedAt
    }).select('*').single()
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return mapRow(data as TaskRow)
  }

  async getById(id: string): Promise<Task | null> {
    const { data, error } = await this.supabase.from('tasks').select('*').eq('id', id).maybeSingle()
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return data ? mapRow(data as TaskRow) : null
  }

  async getAll(): Promise<Task[]> {
    const { data, error } = await this.supabase.from('tasks').select('*').order('created_at', { ascending: false })
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return (data as TaskRow[]).map(mapRow)
  }

  async updateStatus(id: string, status: Task['status']): Promise<Task | null> {
    const { data, error } = await this.supabase.from('tasks').update({ status, updated_at: new Date().toISOString() }).eq('id', id).select('*').maybeSingle()
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return data ? mapRow(data as TaskRow) : null
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.supabase.from('tasks').delete({ count: 'exact' }).eq('id', id)
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    return (count ?? 0) > 0
  }
}
