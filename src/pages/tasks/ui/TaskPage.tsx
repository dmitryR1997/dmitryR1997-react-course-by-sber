import { Link } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes'
import { TaskWidget } from 'widgets/task'

import styles from './TaskPage.module.css'

export const TaskPage = () => {
  return (
    <div className={styles.taskPage}>
      <h1 className={styles.title}>📋 Мои задачи</h1>
      <TaskWidget />
      <Link className={styles.link} to={ROUTES.REGISTER}>
        Регистрация
      </Link>
      <Link className={styles.link} to={ROUTES.REF_EXAMPLES}>
        Примеры useRef
      </Link>
    </div>
  )
}
