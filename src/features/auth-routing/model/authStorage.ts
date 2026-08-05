const AUTH_STORAGE_KEY = 'auth'

export interface AuthSession {
  token: string
  userId: string
  email: string
}

export const readAuthSession = (): AuthSession | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as AuthSession
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export const writeAuthSession = (session: AuthSession) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
