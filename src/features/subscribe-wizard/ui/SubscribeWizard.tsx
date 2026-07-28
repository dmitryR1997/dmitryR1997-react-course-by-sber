import { useActionState } from 'react'

import styles from './SubscribeWizard.module.css'
import { initialSubscribeState, subscribeAction } from '../model/subscribeAction'

export const SubscribeWizard = () => {
  const [state, formAction, isPending] = useActionState(subscribeAction, initialSubscribeState)

  return (
    <form className={styles.subscribeWizard} action={formAction}>
      <h2 className={styles.title}>Подписка на обновления</h2>

      {state.step === 'email' && (
        <>
          <span className={styles.step}>Шаг 1 из 2</span>
          <label className={styles.label}>
            Email
            <input
              className={`${styles.input} ${state.error ? styles.invalid : ''}`}
              name="email"
              type="email"
              defaultValue={state.email}
              disabled={isPending}
            />
          </label>
          {state.error && (
            <span className={styles.error} role="alert">
              {state.error}
            </span>
          )}
          <button className={styles.submit} type="submit" disabled={isPending}>
            {isPending ? 'Проверяем…' : 'Продолжить'}
          </button>
        </>
      )}

      {state.step === 'confirm' && (
        <>
          <span className={styles.step}>Шаг 2 из 2</span>
          <p className={styles.text}>Подтвердите подписку для {state.email}</p>
          <button className={styles.submit} type="submit" disabled={isPending}>
            {isPending ? 'Отправляем…' : 'Подтвердить подписку'}
          </button>
        </>
      )}

      {state.step === 'done' && (
        <p className={styles.success} role="status">
          Подписка оформлена, письмо отправлено на {state.email}
        </p>
      )}
    </form>
  )
}
