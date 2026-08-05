import { createBrowserRouter } from 'react-router-dom'

import { RegisterPage } from 'pages/register'
import { TaskPage } from 'pages/tasks'
import { ROUTES } from 'shared/config/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <TaskPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
])
