import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useMemo, useState } from 'react'
import { useTaskStore } from '../useTaskStore'
import StatusPill from './StatusPill'
import { Task, TaskStatus } from '../taskTypes'
import { Skeleton } from '@mui/material'


type Props = {
  onEdit: (task: Task) => void
}

const PAGE_SIZES = [5, 10, 20]

export default function TaskList({ onEdit }: Props) {
  const { tasks, deleteTask, loading } = useTaskStore()

  const [statusFilter, setStatusFilter] =
    useState<TaskStatus | 'all'>('all')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const filteredTasks = useMemo(() => {
    let list = [...tasks]

    if (statusFilter !== 'all') {
      list = list.filter((t) => t.status === statusFilter)
    }

    const priorityOrder = { High: 3, Medium: 2, Low: 1 }
    list.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

    return list
  }, [tasks, statusFilter])

  const totalPages = Math.ceil(filteredTasks.length / pageSize)

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredTasks.slice(start, start + pageSize)
  }, [filteredTasks, page, pageSize])

  const handleFilterChange = (value: TaskStatus | 'all') => {
    setStatusFilter(value)
    setPage(1)
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setPage(1)
  }

  if (loading) {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          sx={{
            filter: 'blur(1px)',
            opacity: 0.6,
          }}
        >
          <CardContent>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}


  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Select
          size="small"
          value={statusFilter}
          onChange={(e) =>
            handleFilterChange(
              e.target.value as TaskStatus | 'all'
            )
          }
          sx={{ width: 160 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="todo">Todo</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>

        <Select
          size="small"
          value={pageSize}
          onChange={(e) =>
            handlePageSizeChange(Number(e.target.value))
          }
          sx={{ width: 120 }}
        >
          {PAGE_SIZES.map((size) => (
            <MenuItem key={size} value={size}>
              {size} / page
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {paginatedTasks.map((task) => (
        <Card
          key={task.id}
          sx={{
            transition: '0.2s',
            '&:hover': {
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            },
          }}
        >
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="h6">
                  {task.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {task.description || '—'}
                </Typography>

                <Stack direction="row" spacing={1} mt={1}>
                  <StatusPill status={task.status} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color:
                        task.priority === 'High'
                          ? 'error.main'
                          : task.priority === 'Medium'
                            ? 'warning.main'
                            : 'success.main',
                    }}
                  >
                    Priority: {task.priority}
                  </Typography>
                </Stack>
              </Box>

              <Stack direction="row">
                <IconButton
                  onClick={() => onEdit(task)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => deleteTask(task.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}

      {totalPages > 1 && (
        <Stack alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </Stack>
  )
}
