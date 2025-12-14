import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from './useAuthStore'

type Props = {
  darkMode: boolean
  toggleTheme: () => void
}

export default function ProtectedRoute({
  darkMode,
  toggleTheme,
}: Props) {
  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet
      context={{
        darkMode,
        toggleTheme,
      }}
    />
  )
}
