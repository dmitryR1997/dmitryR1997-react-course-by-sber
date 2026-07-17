import { TaskCard, type Task } from 'entities/task'

import styles from './TaskList.module.css'

interface TaskListProps {
  tasks: Task[]
  onRemove?: (id: string) => void
}

export const TaskList = ({ tasks, onRemove }: TaskListProps) => {
  return (
    <div className={styles.tasks}>
      {tasks.length === 0 ? (
        <p className={styles.empty}>Нет задач</p>
      ) : (
        tasks.map((task) => <TaskCard key={task.id} task={task} onRemove={onRemove} />)
      )}
    </div>
  )
}
