import { z } from 'zod'

import { VALIDATION_MESSAGES } from 'shared/config/validation'

const emailSchema = z
  .string()
  .trim()
  .min(1, VALIDATION_MESSAGES.REQUIRED)
  .pipe(z.email(VALIDATION_MESSAGES.EMAIL))

export type SubscribeState = {
  step: 'email' | 'confirm' | 'done'
  email: string
  error?: string
}

export const initialSubscribeState: SubscribeState = {
  step: 'email',
  email: '',
}

const request = () => new Promise((resolve) => setTimeout(resolve, 600))

export const subscribeAction = async (
  state: SubscribeState,
  formData: FormData
): Promise<SubscribeState> => {
  if (state.step === 'email') {
    const email = String(formData.get('email') ?? '')
    const result = emailSchema.safeParse(email)

    if (!result.success) {
      return { ...state, email, error: result.error.issues[0].message }
    }

    await request()

    return { step: 'confirm', email: result.data }
  }

  await request()

  return { step: 'done', email: state.email }
}
