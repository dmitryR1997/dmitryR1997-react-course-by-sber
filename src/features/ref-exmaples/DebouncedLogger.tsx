import { useEffect, useRef, type ChangeEvent } from 'react'

const DEBOUNCE_DELAY = 1000

export const DebouncedLogger = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      console.log(`Ввод после паузы: ${value}`)
    }, DEBOUNCE_DELAY)
  }

  return <input onChange={handleChange} />
}
