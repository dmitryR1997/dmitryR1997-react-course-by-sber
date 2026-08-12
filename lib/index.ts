import { useMemo } from 'react'

import { average, round } from './math'
import { capitalize } from './string'

export * from './math'
export * from './string'

export const useAverageLabel = (label: string, values: number[]) =>
  useMemo(() => `${capitalize(label)}: ${round(average(values))}`, [label, values])
