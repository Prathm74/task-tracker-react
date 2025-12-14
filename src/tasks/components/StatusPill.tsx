import { Chip } from '@mui/material'
import { TaskStatus } from '../taskTypes'

type Props = {
  status: TaskStatus
}

const statusColorMap: Record<TaskStatus, 'default' | 'info' | 'success'> = {
  todo: 'default',
  in_progress: 'info',
  done: 'success',
}

const statusLabelMap: Record<TaskStatus, string> = {
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
}

export default function StatusPill({ status }: Props) {
  return (
    <Chip
      label={statusLabelMap[status]}
      color={statusColorMap[status]}
      size="small"
    />
  )
}
