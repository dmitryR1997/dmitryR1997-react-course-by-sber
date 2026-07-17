import { useState, useMemo, useCallback, useEffect } from 'react'

import { useGetTasksQuery, type Task } from 'entities/task'

export type Filter = 'all' | 'completed' | 'incomplete'

export function useTasks() {
  const { data, isSuccess, isLoading, isError } = useGetTasksQuery()

  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTasks(data)
    }
  }, [isSuccess, data])

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
    isLoading,
    isError,
  }
}
