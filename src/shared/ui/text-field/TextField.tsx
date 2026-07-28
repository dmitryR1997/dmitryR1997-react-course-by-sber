import type { HTMLInputTypeAttribute } from 'react'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

import styles from './TextField.module.css'

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  type?: HTMLInputTypeAttribute
}

export const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
}: TextFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={styles.textField}>
          <label className={styles.label}>
            {label}
            <input
              {...field}
              type={type}
              className={`${styles.input} ${error ? styles.invalid : ''}`}
            />
          </label>
          {error && (
            <span className={styles.error} role="alert">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  )
}
