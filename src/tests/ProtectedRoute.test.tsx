import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@/auth/ProtectedRoute'
import { useAuthStore } from '@/auth/useAuthStore'
import { describe, it, expect } from 'vitest'

describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false })

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<div>Dashboard</div>} />
          </Route>
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
