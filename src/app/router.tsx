import { createBrowserRouter } from 'react-router-dom'

import { RefExamplesPage } from 'pages/ref-examples'
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
  {
    path: ROUTES.REF_EXAMPLES,
    element: <RefExamplesPage />,
  },
])
