import { Task, TaskInput } from './taskTypes'

const STORAGE_KEY = 'task-tracker-tasks'

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const shouldFail = () => Math.random() < 0.2 // 20% failure rate

const getStoredTasks = (): Task[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const taskApi = {
  async getAll(): Promise<Task[]> {
    await sleep(300)
    return getStoredTasks()
  },

  async create(input: TaskInput): Promise<Task> {
    await sleep(500)

    if (shouldFail()) {
      throw new Error('Failed to create task')
    }

    const tasks = getStoredTasks()
    const newTask: Task = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
    }

    saveTasks([newTask, ...tasks])
    return newTask
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await sleep(500)

    if (shouldFail()) {
      throw new Error('Failed to update task')
    }

    const tasks = getStoredTasks()
    const index = tasks.findIndex((t) => t.id === id)

    if (index === -1) {
      throw new Error('Task not found')
    }

    tasks[index] = { ...tasks[index], ...data }
    saveTasks(tasks)

    return tasks[index]
  },

  async remove(id: string): Promise<void> {
    await sleep(500)

    if (shouldFail()) {
      throw new Error('Failed to delete task')
    }

    const tasks = getStoredTasks()
    saveTasks(tasks.filter((t) => t.id !== id))
  },
}
