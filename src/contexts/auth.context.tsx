/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, createContext, useEffect, useState } from 'react'
import authService from '../services/auth.services'
import { UserData, AuthContextType } from './Types/AuthContext.types'

export const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProviderWrapper({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authenticateUser()
  }, [])

  const storeToken = async (token: string) => {
    await localStorage.setItem('authToken', token)
  }

  const removeToken = async () => {
    localStorage.removeItem('authToken')
  }

  const logout = () => {
    setUser(null)
    setIsLoading(false)
    removeToken()
  }

  const authenticateUser = async () => {
    const token = localStorage.getItem('authToken')

    try {
      if (token) {
        const { data } = await authService.verify(token)
        setUser(data)
        setIsLoading(false)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, authenticateUser, storeToken, logout }}>
      {children}
    </AuthContext.Provider >
  )
}
