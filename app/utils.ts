export const formatPrice = (value: number, currency = 'RUB') =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(value)

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(date)

export const truncate = (value: string, limit: number) =>
  value.length > limit ? `${value.slice(0, limit).trimEnd()}…` : value
