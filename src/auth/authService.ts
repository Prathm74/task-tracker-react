const AUTH_KEY = 'task-tracker-auth'

type LoginPayload = {
  username: string
  password: string
}

export const authService = {
  login({ username, password }: LoginPayload) {
    if (username === 'admin' && password === 'admin') {
      const token = 'mock-jwt-token'
      localStorage.setItem(AUTH_KEY, token)
      return Promise.resolve(token)
    }

    return Promise.reject(new Error('Invalid credentials'))
  },

  logout() {
    localStorage.removeItem(AUTH_KEY)
  },

  getToken() {
    return localStorage.getItem(AUTH_KEY)
  },
}
