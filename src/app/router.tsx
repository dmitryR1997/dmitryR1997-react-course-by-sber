import { createBrowserRouter } from 'react-router-dom'

import { TaskPage } from 'pages/tasks'
import { ROUTES } from 'shared/config/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <TaskPage />,
  },
])
