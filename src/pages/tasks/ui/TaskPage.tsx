import { TaskWidget } from 'widgets/task'

import styles from './TaskPage.module.css'

export const TaskPage = () => {
  return (
    <div className={styles.taskPage}>
      <h1 className={styles.title}>📋 Мои задачи</h1>
      <TaskWidget />
    </div>
  )
}
