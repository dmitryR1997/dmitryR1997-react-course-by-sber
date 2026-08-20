import { startTransition, useActionState, useEffect } from 'react'

const SUCCESS_VISIBLE_MS = 2000

type SaveState = 'idle' | 'saved'

type SavePayload = FormData | 'reset'

const initialSaveState: SaveState = 'idle'

const request = () => new Promise((resolve) => setTimeout(resolve, 1000))

const saveNoteAction = async (_state: SaveState, payload: SavePayload): Promise<SaveState> => {
  if (payload === 'reset') {
    return initialSaveState
  }

  await request()

  return 'saved'
}

export const FormWithAsyncSave = () => {
  const [state, formAction, isPending] = useActionState(saveNoteAction, initialSaveState)

  useEffect(() => {
    if (state !== 'saved') {
      return
    }

    const timer = setTimeout(() => {
      startTransition(() => {
        formAction('reset')
      })
    }, SUCCESS_VISIBLE_MS)

    return () => clearTimeout(timer)
  }, [state, formAction])

  return (
    <form action={formAction}>
      <input name="note" type="text" disabled={isPending} />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Сохраняем…' : state === 'saved' ? 'Сохранено!' : 'Сохранить'}
      </button>
    </form>
  )
}
