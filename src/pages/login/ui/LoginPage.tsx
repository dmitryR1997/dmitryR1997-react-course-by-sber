import { LoginForm } from 'features/login-form'

import styles from './LoginPage.module.css'

export const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Вход</h1>
      <LoginForm />
    </div>
  )
}
