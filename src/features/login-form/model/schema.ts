import { z } from 'zod'

import { VALIDATION_MESSAGES } from 'shared/config/validation'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.REQUIRED)
    .pipe(z.email(VALIDATION_MESSAGES.EMAIL)),
  password: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
})

export type LoginFormValues = z.infer<typeof loginSchema>
