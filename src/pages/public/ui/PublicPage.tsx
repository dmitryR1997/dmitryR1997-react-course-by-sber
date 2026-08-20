import { Link } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes'

import styles from './PublicPage.module.css'

export const PublicPage = () => {
  return (
    <div className={styles.publicPage}>
      <h1 className={styles.title}>Открытая страница</h1>
      <p className={styles.text}>Эта страница доступна без авторизации</p>
      <Link className={styles.link} to={ROUTES.PROFILE}>
        В профиль
      </Link>
      <Link className={styles.link} to={ROUTES.LOGIN}>
        Войти
      </Link>
      <Link className={styles.link} to={ROUTES.PORTALS}>
        Порталы
      </Link>
      <Link className={styles.link} to={ROUTES.REACT19}>
        React 19
      </Link>
    </div>
  )
}
