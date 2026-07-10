import { TaskCard, type Task } from 'entities/task'
import { FilterButton } from 'shared/ui/filter-button'

import { useTasks, type Filter } from '../model/useTasks'

import styles from './TaskList.module.css'

const filters: Filter[] = ['all', 'completed', 'incomplete']

const filterLabels: Record<Filter, string> = {
  all: 'Все',
  completed: 'Выполненные',
  incomplete: 'Невыполненные',
}

interface TaskListProps {
  initialTasks?: Task[]
}

export const TaskList = ({ initialTasks }: TaskListProps) => {
  const { tasks, filter, setFilter, removeTask } = useTasks(initialTasks)

  return (
    <div className={styles.taskList}>
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

      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <p className={styles.empty}>Нет задач</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onRemove={removeTask} />)
        )}
      </div>
    </div>
  )
}
