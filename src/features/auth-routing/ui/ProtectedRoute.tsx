import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from 'shared/config/routes'

import { useAuth } from '../model/useAuth'

export const ProtectedRoute = () => {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
