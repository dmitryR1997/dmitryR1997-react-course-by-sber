import { plural } from 'shared/lib/plural'

const symbols = (count: number) => plural(count, ['символ', 'символа', 'символов'])

export const VALIDATION_MESSAGES = {
  REQUIRED: 'Поле обязательно для заполнения',
  EMAIL: 'Введите корректный email',
  URL: 'Некорректный URL',
  MIN_LENGTH: (min: number) => `Минимум ${min} ${symbols(min)}`,
  MAX_LENGTH: (max: number) => `Максимум ${max} ${symbols(max)}`,
} as const
