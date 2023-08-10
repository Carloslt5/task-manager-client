import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './../contexts/auth.context'
import { AuthContextType } from '../contexts/Types/AuthContext.types'

const PrivateRoutes = () => {

  const { user, isLoading } = useContext(AuthContext) as AuthContextType

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}

export default PrivateRoutes