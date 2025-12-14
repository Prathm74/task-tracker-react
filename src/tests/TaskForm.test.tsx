import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TaskForm from '@/tasks/components/TaskForm'
import { useTaskStore } from '@/tasks/useTaskStore'

describe('TaskForm', () => {
  beforeEach(() => {
    // Mock Zustand store methods
    useTaskStore.setState({
      addTask: vi.fn().mockResolvedValue(undefined),
      updateTask: vi.fn().mockResolvedValue(undefined),
      loading: false,
    })
  })

  it('submits form with title and calls onSuccess', async () => {
    const onSuccess = vi.fn()

    render(<TaskForm onSuccess={onSuccess} />)

    const user = userEvent.setup()

    await user.type(
      screen.getByLabelText(/title/i),
      'New Task'
    )

    await user.click(
      screen.getByRole('button', { name: /create task/i })
    )

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
