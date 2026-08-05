import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from 'features/auth-routing'

import { router } from './router'
import { store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  )
}
