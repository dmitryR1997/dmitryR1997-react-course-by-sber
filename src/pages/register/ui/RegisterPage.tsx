import { RegisterForm } from 'features/register-form'
import { SubscribeWizard } from 'features/subscribe-wizard'

import styles from './RegisterPage.module.css'

export const RegisterPage = () => {
  return (
    <div className={styles.registerPage}>
      <h1 className={styles.title}>Регистрация</h1>
      <RegisterForm />
      <SubscribeWizard />
    </div>
  )
}
