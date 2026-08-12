import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { useTheme } from 'shared/lib/theme'

import styles from './ConfirmDialog.module.css'

export interface ConfirmDialogProps {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  title,
  description,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const { theme } = useTheme()
  const dialogRoot = document.getElementById('dialog-root')

  if (!dialogRoot) {
    return null
  }

  const handleDialogClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return createPortal(
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        className={`${styles.dialog} ${styles[theme]}`}
        role="dialog"
        aria-modal="true"
        onClick={handleDialogClick}
      >
        <h2 className={styles.title}>{title}</h2>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.actions}>
          <button className={styles.cancel} type="button" onClick={onCancel}>
            {cancelText}
          </button>

          <button className={styles.confirm} type="button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    dialogRoot
  )
}
