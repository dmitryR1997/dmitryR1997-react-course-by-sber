import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'features/auth-routing'
import { useLoginMutation } from 'shared/api'
import { ROUTES } from 'shared/config/routes'
import { TextField } from 'shared/ui/text-field'

import styles from './LoginForm.module.css'
import { loginSchema, type LoginFormValues } from '../model/schema'

export const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [sendLogin, { isLoading }] = useLoginMutation()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const { user, accessToken } = await sendLogin(values).unwrap()

      login({ token: accessToken, userId: user.id, email: user.email })
      navigate(ROUTES.PROFILE, { replace: true })
    } catch {
      setError('root', { message: 'Не удалось войти, проверьте email и пароль' })
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <TextField control={control} name="email" label="Email" type="email" />

      <TextField control={control} name="password" label="Пароль" type="password" />

      <button className={styles.submit} type="submit" disabled={isLoading}>
        {isLoading ? 'Входим…' : 'Войти'}
      </button>

      {errors.root && (
        <p className={styles.error} role="alert">
          {errors.root.message}
        </p>
      )}
    </form>
  )
}
