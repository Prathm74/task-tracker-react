import { createBrowserRouter, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Divider,
  Typography,
} from '@mui/material'

import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProtectedRoute from '@/auth/ProtectedRoute'

import TaskForm from '@/tasks/components/TaskForm'
import TaskList from '@/tasks/components/TaskList'
import { useTaskStore } from '@/tasks/useTaskStore'
import { Task } from '@/tasks/taskTypes'

import AppHeader from '@/shared/ui/AppHeader'
import { Fade } from '@mui/material'


type ThemeContext = {
  darkMode: boolean
  toggleTheme: () => void
}

const Dashboard = () => {
  const { darkMode, toggleTheme } =
    useOutletContext<ThemeContext>()

  const {
    tasks,
    fetchTasks,
    error,
    clearError,
  } = useTaskStore()

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] =
    useState<Task | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAddTask = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  return (
  <>
    <AppHeader
      darkMode={darkMode}
      onToggleTheme={toggleTheme}
    />

    <Box
      p={3}
      maxWidth="900px"
      mx="auto"
      bgcolor="background.default"
    >
      {error && (
        <Alert
          severity="error"
          onClose={clearError}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      {!showForm && (
        <Button
          variant="contained"
          onClick={handleAddTask}
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>
      )}

      <Fade in={showForm} timeout={300} unmountOnExit>
        <Box>
          {showForm && (
            <>
              <Typography variant="h6" mb={1}>
                {editingTask
                  ? 'Edit Task'
                  : 'Create Task'}
              </Typography>

              <TaskForm
                initialData={editingTask ?? undefined}
                onSuccess={() => {
                  setShowForm(false)
                  setEditingTask(null)
                }}
                onCancel={() => {
                  setShowForm(false)
                  setEditingTask(null)
                }}
              />
            </>
          )}
        </Box>
      </Fade>

      <Fade
        in={!showForm && tasks.length > 0}
        timeout={300}
        unmountOnExit
      >
        <Box>
          {!showForm && tasks.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <TaskList onEdit={handleEditTask} />
            </>
          )}
        </Box>
      </Fade>

      <Fade
        in={!showForm && tasks.length === 0}
        timeout={300}
        unmountOnExit
      >
        <Box>
          {!showForm && tasks.length === 0 && (
            <Typography mt={3} color="text.secondary">
              No tasks available. Click "Add Task" to create your first task.
            </Typography>
          )}
        </Box>
      </Fade>
    </Box>
  </>
)

}

export const createAppRouter = (
  darkMode: boolean,
  toggleTheme: () => void
) =>
  createBrowserRouter([
    { path: '/login', element: <LoginPage /> },

    {
      element: (
        <ProtectedRoute
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      ),
      children: [
        { path: '/', element: <Dashboard /> },
      ],
    },

    { path: '*', element: <NotFoundPage /> },
  ])
