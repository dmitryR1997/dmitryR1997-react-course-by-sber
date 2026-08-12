import { useRef } from 'react'

interface ClickData {
  startTime: number | null
  clickCount: number
}

export const ClickTimer = () => {
  const clickDataRef = useRef<ClickData>({
    startTime: null,
    clickCount: 0,
  })

  const handleClick = () => {
    const now = Date.now()
    const clickData = clickDataRef.current

    clickData.clickCount += 1

    if (clickData.startTime === null) {
      clickData.startTime = now
      console.log('Первый клик зафиксирован')
      return
    }

    console.log(
      `Прошло с первого клика: ${now - clickData.startTime} мс, всего кликов: ${clickData.clickCount}`
    )
  }

  return (
    <button type="button" onClick={handleClick}>
      Кликни меня
    </button>
  )
}
