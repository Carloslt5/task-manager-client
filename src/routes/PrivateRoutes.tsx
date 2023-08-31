import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './../contexts/auth.context'
import { AuthContextType } from '../contexts/Types/AuthContext.types'
import Loading from '../components/Loading/Loading'

const PrivateRoutes = () => {

  const { user, isLoading } = useContext(AuthContext) as AuthContextType

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}

export default PrivateRoutes