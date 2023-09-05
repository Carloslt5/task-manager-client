import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from './../contexts/auth.context'
import { AuthContextType } from '../contexts/Types/AuthContext.types'
import Loading from '../components/Loading/Loading'

const PrivateRoutes = () => {

  const navigate = useNavigate()
  const { user, isLoading } = useContext(AuthContext) as AuthContextType

  if (isLoading) {
    return <Loading />
  }

  if (!user) {
    navigate('/')
  }

  return <Outlet />
}

export default PrivateRoutes