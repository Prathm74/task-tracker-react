import { create } from 'zustand'
import { authService } from './authService'

type AuthState = {
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!authService.getToken(),
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null })

    try {
      await authService.login({ username, password })
      set({ isAuthenticated: true })
    } catch (err) {
      set({ error: 'Invalid username or password' })
      throw err
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    authService.logout()
    set({ isAuthenticated: false })
  },
}))
