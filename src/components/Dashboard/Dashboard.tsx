import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import Board from '../Board/Board'

const Dashboard = () => {
  const { user } = useContext(AuthContext) as AuthContextType

  return (
    <>
      <h1 className='text-3xl'>Welcome {user?.firstName} {user?.lastName} 🫂</h1>
      <Board />
    </>
  )
}

export default Dashboard