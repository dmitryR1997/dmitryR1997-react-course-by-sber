import { useState } from 'react'

import { useTheme } from 'shared/lib/theme'
import { ConfirmDialog, useConfirmDialog } from 'shared/ui/ConfirmDialog'
import { Tooltip, TooltipPosition } from 'shared/ui/Tooltip'

import styles from './PortalShowcase.module.css'

const POSITION_LABELS: Record<TooltipPosition, string> = {
  [TooltipPosition.Top]: 'сверху',
  [TooltipPosition.Bottom]: 'снизу',
  [TooltipPosition.Left]: 'слева',
  [TooltipPosition.Right]: 'справа',
}

export const PortalShowcase = () => {
  const { showConfirmDialog, confirmDialogProps } = useConfirmDialog()
  const { theme, toggleTheme } = useTheme()

  const [parentClicks, setParentClicks] = useState(0)
  const [parentHovers, setParentHovers] = useState(0)
  const [position, setPosition] = useState<TooltipPosition>(TooltipPosition.Top)
  const [items, setItems] = useState(['Элемент списка #1', 'Элемент списка #2'])

  const handleParentClick = () => {
    setParentClicks((count) => count + 1)
  }

  const handleParentMouseEnter = () => {
    setParentHovers((count) => count + 1)
  }

  const handleDelete = async (item: string) => {
    const confirmed = await showConfirmDialog({
      title: 'Удалить элемент?',
      description: `Элемент «${item}» будет удален без возможности восстановления.`,
    })

    if (confirmed) {
      setItems((current) => current.filter((existing) => existing !== item))
    }
  }

  return (
    <div className={styles.portalShowcase}>
      <h1 className={styles.title}>Порталы</h1>

      <button className={styles.theme} type="button" onClick={toggleTheme}>
        Тема: {theme === 'light' ? 'светлая' : 'темная'}
      </button>

      <section
        className={styles.card}
        onClick={handleParentClick}
        onMouseEnter={handleParentMouseEnter}
      >
        <h2 className={styles.subtitle}>Всплытие событий</h2>
        <p className={styles.text}>Клики внутри карточки: {parentClicks}</p>
        <p className={styles.text}>Наведения на карточку: {parentHovers}</p>

        <div className={styles.positions}>
          {Object.values(TooltipPosition).map((value) => (
            <label className={styles.position} key={value}>
              <input
                type="radio"
                name="tooltip-position"
                value={value}
                checked={position === value}
                onChange={() => setPosition(value)}
              />
              {POSITION_LABELS[value]}
            </label>
          ))}
        </div>

        <div className={styles.triggerRow}>
          <Tooltip
            content={
              <>
                Подсказка {POSITION_LABELS[position]}
                <button className={styles.tooltipButton} type="button">
                  Клик здесь счетчик не меняет
                </button>
              </>
            }
            position={position}
          >
            <button className={styles.chip} type="button">
              Наведи на меня
            </button>
          </Tooltip>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.subtitle}>Диалог подтверждения</h2>

        <ul className={styles.list}>
          {items.map((item) => (
            <li className={styles.item} key={item}>
              {item}
              <button className={styles.remove} type="button" onClick={() => handleDelete(item)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </section>

      {confirmDialogProps && <ConfirmDialog {...confirmDialogProps} />}
    </div>
  )
}
