import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMemo, useState } from 'react'
import { useTaskStore } from '../useTaskStore'
import { Task } from '../taskTypes'
import StatusPill from './StatusPill'

type Props = {
  onEdit: (task: Task) => void
}

export default function TaskList({ onEdit }: Props) {
  const { tasks, deleteTask, loading } = useTaskStore()
  const [search, setSearch] = useState('')

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  }, [tasks, search])

  if (loading) {
    return <Typography>Loading tasks...</Typography>
  }

  return (
    <Stack spacing={2}>
      <TextField
        label="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                <StatusPill status={task.status} />
              </TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : '—'}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => onEdit(task)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => deleteTask(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {!filteredTasks.length && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align="center">
                  No tasks found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  )
}
