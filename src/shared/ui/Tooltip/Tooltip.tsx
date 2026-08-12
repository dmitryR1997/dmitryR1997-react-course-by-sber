import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useTheme } from 'shared/lib/theme'

import styles from './Tooltip.module.css'
import { TooltipPosition } from './TooltipPosition'

interface TooltipProps {
  content: ReactNode
  position?: TooltipPosition
  children: ReactNode
}

interface Coords {
  top: number
  left: number
}

const OFFSET = 8
const HIDE_DELAY = 150

const getCoords = (rect: DOMRect, position: TooltipPosition): Coords => {
  switch (position) {
    case TooltipPosition.Bottom:
      return { top: rect.bottom + OFFSET, left: rect.left + rect.width / 2 }
    case TooltipPosition.Left:
      return { top: rect.top + rect.height / 2, left: rect.left - OFFSET }
    case TooltipPosition.Right:
      return { top: rect.top + rect.height / 2, left: rect.right + OFFSET }
    default:
      return { top: rect.top - OFFSET, left: rect.left + rect.width / 2 }
  }
}

export const Tooltip = ({ content, position = TooltipPosition.Top, children }: TooltipProps) => {
  const triggerRef = useRef<HTMLSpanElement>(null)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [coords, setCoords] = useState<Coords | null>(null)
  const { theme } = useTheme()

  const tooltipRoot = document.getElementById('tooltip-root')

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current !== null) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])

  const cancelHide = () => {
    if (hideTimeoutRef.current !== null) {
      clearTimeout(hideTimeoutRef.current)
      hideTimeoutRef.current = null
    }
  }

  const handleMouseEnter = () => {
    cancelHide()

    const rect = triggerRef.current?.getBoundingClientRect()

    if (rect) {
      setCoords(getCoords(rect, position))
    }
  }

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setCoords(null), HIDE_DELAY)
  }

  const handleTooltipClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <span
      className={styles.trigger}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {coords &&
        tooltipRoot &&
        createPortal(
          <div
            className={`${styles.tooltip} ${styles[position]} ${styles[theme]}`}
            style={coords}
            role="tooltip"
            onMouseEnter={cancelHide}
            onMouseLeave={handleMouseLeave}
            onClick={handleTooltipClick}
          >
            {content}
          </div>,
          tooltipRoot
        )}
    </span>
  )
}
