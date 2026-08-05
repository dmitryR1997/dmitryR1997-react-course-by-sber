import { z } from 'zod'

import { VALIDATION_MESSAGES } from 'shared/config/validation'

const USERNAME_MIN_LENGTH = 3
const PASSWORD_MIN_LENGTH = 6

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, VALIDATION_MESSAGES.REQUIRED)
      .min(USERNAME_MIN_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH(USERNAME_MIN_LENGTH)),
    email: z
      .string()
      .trim()
      .min(1, VALIDATION_MESSAGES.REQUIRED)
      .pipe(z.email(VALIDATION_MESSAGES.EMAIL)),
    password: z
      .string()
      .min(1, VALIDATION_MESSAGES.REQUIRED)
      .min(PASSWORD_MIN_LENGTH, VALIDATION_MESSAGES.MIN_LENGTH(PASSWORD_MIN_LENGTH)),
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.REQUIRED),
    socialLinks: z.array(
      z.object({
        url: z
          .string()
          .trim()
          .min(1, VALIDATION_MESSAGES.REQUIRED)
          .pipe(z.url({ protocol: /^https?$/, error: VALIDATION_MESSAGES.URL })),
      })
    ),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
