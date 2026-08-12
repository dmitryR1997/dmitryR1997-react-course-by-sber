import { useEffect, useRef, useState, type ChangeEvent } from 'react'

export const PreviousInput = () => {
  const [value, setValue] = useState('')
  const previousValueRef = useRef('')

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input value={value} onChange={handleChange} />
      {/* eslint-disable-next-line react-hooks/refs */}
      <p>Предыдущее значение: {previousValueRef.current}</p>
    </div>
  )
}
