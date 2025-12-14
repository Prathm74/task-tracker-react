import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'

import { getTheme } from '@/app/theme'
import { createAppRouter } from '@/app/router'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const router = createAppRouter(
    darkMode,
    () => setDarkMode((v) => !v)
  )

  return (
    <ThemeProvider
      theme={getTheme(darkMode ? 'dark' : 'light')}
    >
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
