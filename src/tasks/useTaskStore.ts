import { create } from 'zustand'
import { Task, TaskInput } from './taskTypes'
import { taskApi } from './taskApi'

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))


type TaskState = {
  tasks: Task[]
  loading: boolean
  error: string | null

  fetchTasks: () => Promise<void>
  addTask: (data: TaskInput) => Promise<void>
  updateTask: (id: string, data: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  clearError: () => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTasks: async () => {
    set({ loading: true, error: null })

    try {
      const [tasks] = await Promise.all([
        taskApi.getAll(),
        sleep(500),
      ])

      set({ tasks })
    } catch {
      set({ error: 'Failed to load tasks' })
    } finally {
      set({ loading: false })
    }
  },


  addTask: async (data) => {
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...data,
    }

    const previousTasks = get().tasks

    set({
      tasks: [tempTask, ...previousTasks],
      error: null,
    })

    try {
      const savedTask = await taskApi.create(data)

      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === tempTask.id ? savedTask : t
        ),
      }))
    } catch {
      set({
        tasks: previousTasks,
        error: 'Failed to create task',
      })
    }
  },

  updateTask: async (id, data) => {
    const previousTasks = get().tasks

    set({
      tasks: previousTasks.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
      error: null,
    })

    try {
      await taskApi.update(id, data)
    } catch {
      set({
        tasks: previousTasks,
        error: 'Failed to update task',
      })
    }
  },

  deleteTask: async (id) => {
    const previousTasks = get().tasks

    // Optimistic remove
    set({
      tasks: previousTasks.filter((t) => t.id !== id),
      error: null,
    })

    try {
      await taskApi.remove(id)
    } catch {
      // Rollback
      set({
        tasks: previousTasks,
        error: 'Failed to delete task',
      })
    }
  },

}))
