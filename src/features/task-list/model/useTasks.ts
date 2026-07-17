import { useState, useMemo, useCallback } from 'react'

import type { Task } from 'entities/task'

export type Filter = 'all' | 'completed' | 'incomplete'

function generateTasks(count: number): Task[] {
  return Array.from({ length: count }, (_, index) => ({
    id: String(index + 1),
    title: `Задача №${index + 1}`,
    completed: index % 2 === 0,
  }))
}

const initialTasks: Task[] = generateTasks(20)

export function useTasks(initial: Task[] = initialTasks) {
  const [tasks, setTasks] = useState<Task[]>(initial)
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed)
      case 'incomplete':
        return tasks.filter((task) => !task.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  }
}
