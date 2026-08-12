import { skipToken } from '@reduxjs/toolkit/query'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'features/auth-routing'
import { useGetMeQuery } from 'shared/api'
import { ROUTES } from 'shared/config/routes'

import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  const { data: user, isLoading, isError } = useGetMeQuery(session?.token ?? skipToken)

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <div className={styles.profilePage}>
      <h1 className={styles.title}>Профиль</h1>

      <div className={styles.card}>
        {isLoading && <p>Загружаем данные пользователя…</p>}

        {isError && <p className={styles.error}>Не удалось загрузить профиль</p>}

        {user && (
          <>
            <p className={styles.name}>{user.name}</p>
            <p className={styles.email}>{user.email}</p>
          </>
        )}

        <button className={styles.logout} type="button" onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  )
}
