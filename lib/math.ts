import lodash from 'lodash'

export const total = (values: number[]) => lodash.sum(values)

export const average = (values: number[]) => (values.length ? total(values) / values.length : 0)

export const round = (value: number, digits = 2) => Number(value.toFixed(digits))
