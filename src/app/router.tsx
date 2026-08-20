import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from 'features/auth-routing'
import { LoginPage } from 'pages/login'
import { PortalShowcase } from 'pages/portal-showcase'
import { ProfilePage } from 'pages/profile'
import { PublicPage } from 'pages/public'
import { React19Showcase } from 'pages/react19-showcase'
import { RegisterPage } from 'pages/register'
import { TaskPage } from 'pages/tasks'
import { ROUTES } from 'shared/config/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.PUBLIC,
    element: <PublicPage />,
  },
  {
    path: ROUTES.PORTALS,
    element: <PortalShowcase />,
  },
  {
    path: ROUTES.REACT19,
    element: <React19Showcase />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.HOME,
        element: <TaskPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
])
