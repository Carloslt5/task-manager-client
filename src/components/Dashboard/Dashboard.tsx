import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
// import Board from '../Board/Board'
import boardservices from '../../services/board.services'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useContext(AuthContext) as AuthContextType

  const [boardData, setBoardData] = useState()

  const loadBoard = () => {
    boardservices
      .getAllBoards()
      .then(({ data }) => {
        setBoardData(data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    loadBoard()
  }, [])
  return (
    <>
      <h1 className='text-3xl'>Welcome {user?.firstName} {user?.lastName} 🫂</h1>
      {/* <Board /> */}
      <ul>
        {!boardData
          ? <h1>Loading...</h1>
          : boardData.map((board, idx) =>
            <li key={idx} className=''>
              <Link to={`/${user?._id}/${board._id}`}>
                <h1>{board.title}</h1>
              </Link>
            </li>
          )}
      </ul>
    </>
  )
}

export default Dashboard