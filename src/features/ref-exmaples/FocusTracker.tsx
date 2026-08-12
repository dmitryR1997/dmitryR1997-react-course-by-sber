import { useRef, type FocusEvent } from 'react'

export const FocusTracker = () => {
  const firstInputRef = useRef<HTMLInputElement>(null)
  const secondInputRef = useRef<HTMLInputElement>(null)
  const focusSwitchCountRef = useRef(0)

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    const { relatedTarget } = event
    
    const isSwitchBetweenInputs =
      relatedTarget === firstInputRef.current || relatedTarget === secondInputRef.current

    if (!isSwitchBetweenInputs) {
      return
    }

    focusSwitchCountRef.current += 1
    console.log(`Переходов фокуса между полями: ${focusSwitchCountRef.current}`)
  }

  const handleFocusFirst = () => {
    firstInputRef.current?.focus()
  }

  return (
    <div>
      <input ref={firstInputRef} onFocus={handleFocus} />
      <input ref={secondInputRef} onFocus={handleFocus} />
      <button type="button" onClick={handleFocusFirst}>
        Сфокусировать на первом
      </button>
    </div>
  )
}
