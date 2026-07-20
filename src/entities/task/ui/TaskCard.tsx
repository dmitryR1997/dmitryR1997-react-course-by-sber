import { memo } from 'react'

import styles from './TaskCard.module.css'
import type { Task } from '../model/types'

interface TaskCardProps {
  task: Task
  onRemove?: (id: string) => void
}

export const TaskCard = memo(({ task, onRemove }: TaskCardProps) => {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(task.id)
    }
  }

  return (
    <div className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.taskContent}>
        <span className={styles.status}>{task.completed ? '+' : '-'}</span>
        <span className={styles.title}>{task.title}</span>
      </div>
      <button className={styles.removeButton} onClick={handleRemove}>
        ✕
      </button>
    </div>
  )
})

TaskCard.displayName = 'TaskCard'
