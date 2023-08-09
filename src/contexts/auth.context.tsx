import { createContext, useState } from 'react'

import authService from '../services/auth.services'

interface UserData {
  _id: string
  firstName: string
  lastName: string
}

interface AuthContextType {
  userContext: UserData[] | null
  isLoading: boolean
  storeToken: (token: string) => void
  authenticateUser: () => Promise<void>
  logout: () => void
}

interface UserProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProviderWrapper({ children }: UserProviderProps) {

  const [userContext, setUserContext] = useState<UserData[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const storeToken = async (token: string) => {
    await localStorage.setItem('authToken', token)
  }

  const removeToken = () => {
    localStorage.removeItem('authToken')
  }

  const logout = () => {
    setIsLoading(false)
    setUserContext(null)
    removeToken()
  }

  const authenticateUser = async () => {
    const token = localStorage.getItem('authToken')

    try {
      if (token) {
        const { data } = await authService.verify(token)
        setUserContext(data)
      }
    } catch {
      console.log('error')
    }

  }

  return (
    <AuthContext.Provider value={{ userContext, isLoading, authenticateUser, storeToken, logout }}>
      {children}
    </AuthContext.Provider >
  )

}
