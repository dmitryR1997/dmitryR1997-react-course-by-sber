import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from 'features/auth-routing'
import { ThemeProvider } from 'shared/lib/theme'

import { router } from './router'
import { store } from './store'

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}
