import { useState, useMemo, useCallback } from 'react'

import type { Task } from 'entities/task'

export type Filter = 'all' | 'completed' | 'incomplete'

const initialTasks: Task[] = [
  { id: '1', title: 'Изучить React', completed: true },
  { id: '2', title: 'Настроить FSD', completed: false },
  { id: '3', title: 'Создать компоненты', completed: false },
  { id: '4', title: 'Написать тесты', completed: false },
]

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
