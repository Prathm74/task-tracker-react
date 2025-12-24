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
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import AppHeader from '@/shared/ui/AppHeader'
import TaskForm from '@/tasks/components/TaskForm'
import TaskList from '@/tasks/components/TaskList'
import { useTaskStore } from '@/tasks/useTaskStore'
import { Task } from '@/tasks/taskTypes'

type ThemeContext = {
  darkMode: boolean
  toggleTheme: () => void
}

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

      <Box p={3} maxWidth="1000px" mx="auto">
        {error && (
          <Alert severity="error" onClose={clearError}>
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

        <TaskList onEdit={handleEdit} />

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
