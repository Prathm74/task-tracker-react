import { render, screen } from '@testing-library/react'
import TaskList from '@/tasks/components/TaskList'
import { useTaskStore } from '@/tasks/useTaskStore'
import { describe, it, expect } from 'vitest'

describe('TaskList', () => {
  it('renders task title', () => {
    useTaskStore.setState({
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Testing',
          status: 'todo',
          priority: 'High',
          createdAt: new Date().toISOString(),
        },
      ],
      loading: false,
    })

    render(<TaskList onEdit={() => {}} />)

    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })
})
