import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch, type SubmitHandler } from 'react-hook-form'

import { TextField } from 'shared/ui/text-field'

import styles from './RegisterForm.module.css'
import { registerSchema, type RegisterFormValues } from '../model/schema'

const defaultValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  socialLinks: [{ url: '' }],
}

export const RegisterForm = () => {
  const [registeredUser, setRegisteredUser] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, touchedFields },
  } = useForm<RegisterFormValues>({
    defaultValues,
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'socialLinks' })

  const password = useWatch({ control, name: 'password' })
  const isConfirmTouched = Boolean(touchedFields.confirmPassword)

  useEffect(() => {
    if (isConfirmTouched) {
      void trigger('confirmPassword')
    }
  }, [password, isConfirmTouched, trigger])

  const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
    setRegisteredUser(values.username)
    reset(defaultValues)
  }

  return (
    <form className={styles.registerBox} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.registerForm}>
        <TextField control={control} name="username" label="Имя пользователя" />

        <TextField control={control} name="email" label="Email" type="email" />

        <TextField control={control} name="password" label="Пароль" type="password" />

        <TextField
          control={control}
          name="confirmPassword"
          label="Подтверждение пароля"
          type="password"
        />
      </div>

      <div className={styles.socialLinks}>
        <h3>Социальные ссылки</h3>

        {fields.map((field, index) => (
          <div className={styles.socialLink} key={field.id}>
            <TextField
              control={control}
              name={`socialLinks.${index}.url`}
              label={`Ссылка ${index + 1}`}
              type="url"
            />
            <button className={styles.remove} type="button" onClick={() => remove(index)}>
              Удалить
            </button>
          </div>
        ))}

        <button className={styles.add} type="button" onClick={() => append({ url: '' })}>
          Добавить ссылку
        </button>
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        Зарегистрироваться
      </button>

      {registeredUser && (
        <p className={styles.success} role="status">
          Пользователь {registeredUser} зарегистрирован
        </p>
      )}
    </form>
  )
}
