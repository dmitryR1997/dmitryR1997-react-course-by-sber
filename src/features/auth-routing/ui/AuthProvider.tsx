import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { AuthContext } from '../model/AuthContext'
import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
  type AuthSession,
} from '../model/authStorage'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState(readAuthSession)

  const login = useCallback((nextSession: AuthSession) => {
    writeAuthSession(nextSession)
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    clearAuthSession()
    setSession(null)
  }, [])

  const value = useMemo(() => ({ session, login, logout }), [session, login, logout])

  return <AuthContext value={value}>{children}</AuthContext>
}
