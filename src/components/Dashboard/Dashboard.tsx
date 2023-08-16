import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'

const Dashboard = () => {
  const { user } = useContext(AuthContext) as AuthContextType

  return (
    <>
      <h1 className='text-3xl'>Welcome {user?.firstName} {user?.lastName} 🫂</h1>
      <div className='shadow appearance-none border rounded w-100 my-4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
      </div>
    </>
  )
}

export default Dashboard