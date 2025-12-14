import {
  Button,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useEffect } from 'react'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Task, TaskInput } from '../taskTypes'
import { useTaskStore } from '../useTaskStore'

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done']),
  priority: z.enum(['Low', 'Medium', 'High']),
})

type TaskFormValues = z.infer<typeof taskSchema>

type Props = {
  initialData?: Task
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TaskForm({
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const { addTask, updateTask, loading } = useTaskStore()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'Medium',
    },
  })

  // ✅ Reset form when editing task changes
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        status: initialData.status,
        priority: initialData.priority,
      })
    } else {
      reset({
        title: '',
        description: '',
        status: 'todo',
        priority: 'Medium',
      })
    }
  }, [initialData, reset])

  const onSubmit = async (values: TaskFormValues) => {
    const payload: TaskInput = values

    if (initialData) {
      await updateTask(initialData.id, payload)
    } else {
      await addTask(payload)
    }

    reset()
    onSuccess?.()
  }

  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          {...register('description')}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Status"
              {...field}
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in_progress">
                In Progress
              </MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Priority"
              {...field}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">
                Medium
              </MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          )}
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {initialData ? 'Update Task' : 'Create Task'}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}
