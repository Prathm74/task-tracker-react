export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>
