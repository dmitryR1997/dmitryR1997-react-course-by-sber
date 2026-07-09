import { TaskList } from 'features/task-list'

import styles from './TaskWidget.module.css'

export const TaskWidget = () => {
  return (
    <div className={styles.taskWidget}>
      <TaskList />
    </div>
  )
}
