import { startTransition, useActionState } from 'react'

const request = () => new Promise((resolve) => setTimeout(resolve, 1000))

type FormValues = {
  name: string
  email: string
  message: string
}

type FormStatus = 'idle' | 'dirty' | 'submitting' | 'success'

type FormState = {
  status: FormStatus
  values: FormValues
}

type FormEvent =
  | { type: 'change' }
  | { type: 'submit'; values: FormValues }
  | { type: 'success' }

type FormPayload = FormData | 'change'

const STATUS_LABELS: Record<FormStatus, string> = {
  idle: 'форма пустая',
  dirty: 'форма изменена',
  submitting: 'отправляем',
  success: 'отправлено',
}

const initialFormState: FormState = {
  status: 'idle',
  values: { name: '', email: '', message: '' },
}

const formReducer = (state: FormState, event: FormEvent): FormState => {
  switch (event.type) {
    case 'change':
      return { ...state, status: 'dirty' }
    case 'submit':
      return { status: 'submitting', values: event.values }
    case 'success':
      return { ...state, status: 'success' }
  }
}

const saveFormAction = async (state: FormState, payload: FormPayload): Promise<FormState> => {
  if (payload === 'change') {
    return formReducer(state, { type: 'change' })
  }

  const values: FormValues = {
    name: String(payload.get('name') ?? ''),
    email: String(payload.get('email') ?? ''),
    message: String(payload.get('message') ?? ''),
  }

  const submitting = formReducer(state, { type: 'submit', values })
  await request()

  return formReducer(submitting, { type: 'success' })
}

export const ActionStateWithReducer = () => {
  const [state, formAction, isPending] = useActionState(saveFormAction, initialFormState)

  const handleChange = () => {
    if (isPending || state.status === 'dirty') {
      return
    }

    startTransition(() => {
      formAction('change')
    })
  }

  const status = isPending ? 'submitting' : state.status

  return (
    <form action={formAction} onChange={handleChange}>
      <input name="name" type="text" placeholder="Имя" disabled={isPending} />

      <input name="email" type="email" placeholder="Почта" disabled={isPending} />

      <textarea name="message" placeholder="Сообщение" disabled={isPending} />

      <button type="submit" disabled={isPending}>
        Отправить
      </button>

      <p>Статус: {STATUS_LABELS[status]}</p>

      {status === 'success' && (
        <p>
          Отправлено: {state.values.name}, {state.values.email}, {state.values.message}
        </p>
      )}
    </form>
  )
}
