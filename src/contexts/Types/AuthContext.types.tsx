export interface UserData {
  _id: string
  firstName: string
  lastName: string
}

export interface AuthContextType {
  userContext: UserData | null
  isLoading: boolean
  storeToken: (token: string) => void
  authenticateUser: () => Promise<void>
  logout: () => void
}

export interface UserProviderProps {
  children: React.ReactNode
}