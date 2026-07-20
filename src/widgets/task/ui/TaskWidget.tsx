import { TaskList, useTasks, type Filter } from 'features/task-list'
import { FilterButton } from 'shared/ui/filter-button'

import styles from './TaskWidget.module.css'

const filters: Filter[] = ['all', 'completed', 'incomplete']

const filterLabels: Record<Filter, string> = {
  all: 'Все',
  completed: 'Выполненные',
  incomplete: 'Невыполненные',
}

export const TaskWidget = () => {
  const { tasks, filter, setFilter, removeTask, isLoading, isError } = useTasks()

  if (isLoading) {
    return <p className={styles.state}>Загрузка задач…</p>
  }

  if (isError) {
    return <p className={styles.state}>Не удалось загрузить задачи</p>
  }

  return (
    <div className={styles.taskWidget}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {filters.map((f) => (
            <FilterButton
              key={f}
              label={filterLabels[f]}
              value={f}
              active={filter === f}
              onClick={(value) => setFilter(value as Filter)}
            />
          ))}
        </div>
        <span className={styles.counter}>Всего: {tasks.length}</span>
      </div>

      <TaskList tasks={tasks} onRemove={removeTask} />
    </div>
  )
}
