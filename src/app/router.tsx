import { createBrowserRouter, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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

/* =======================
   THEME CONTEXT TYPE
======================= */
type ThemeContext = {
  darkMode: boolean
  toggleTheme: () => void
}

/* =======================
   DASHBOARD
======================= */
const Dashboard = () => {
  const { darkMode, toggleTheme } =
    useOutletContext<ThemeContext>()

  const { tasks, fetchTasks, error, clearError } =
    useTaskStore()

  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] =
    useState<Task | null>(null)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const handleAdd = () => {
    setEditingTask(null)
    setOpen(true)
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingTask(null)
  }

  return (
    <>
      <AppHeader
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <Box p={3} maxWidth="900px" mx="auto">
        {error && (
          <Alert
            severity="error"
            onClose={clearError}
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>

        <Divider sx={{ mb: 2 }} />

        {/* TASK TABLE */}
        {tasks.length > 0 ? (
          <TaskList onEdit={handleEdit} />
        ) : (
          <Typography color="text.secondary">
            No tasks available. Click "Add Task" to create your first task.
          </Typography>
        )}

        {/* ADD / EDIT POPUP */}
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>
            {editingTask ? 'Edit Task' : 'Add Task'}
          </DialogTitle>
          <DialogContent>
            <TaskForm
              initialData={editingTask ?? undefined}
              onSuccess={handleClose}
              onCancel={handleClose}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  )
}

/* =======================
   ROUTER CONFIG
======================= */
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
      children: [{ path: '/', element: <Dashboard /> }],
    },

    { path: '*', element: <NotFoundPage /> },
  ])
