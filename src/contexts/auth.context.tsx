import { createContext, useCallback, useEffect, useState } from 'react'
import authService from '../services/auth.services'
import { UserData, AuthContextType, UserProviderProps } from './Types/AuthContext.types'

export const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProviderWrapper({ children }: UserProviderProps) {

  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = async (token: string) => {
    await localStorage.setItem('authToken', token)
  }

  const removeToken = useCallback(async () => {
    localStorage.removeItem('authToken')
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsLoading(false)
    removeToken()
  }, [removeToken])

  const authenticateUser = useCallback(async () => {
    const token = localStorage.getItem('authToken')

    try {
      if (token) {
        const { data } = await authService.verify(token)
        setUser(data)
      }
    } catch {
      logout()
    }
  }, [logout])

  useEffect(() => {
    authenticateUser()
  }, [authenticateUser])

  return (
    <AuthContext.Provider value={{ user, isLoading, authenticateUser, storeToken, logout }}>
      {children}
    </AuthContext.Provider >
  )
}