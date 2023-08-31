import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import { Link } from 'react-router-dom'
import { MdPostAdd, MdClose } from 'react-icons/md'
import kanbanservices from '../../services/kanban.services'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'
import EachBoard from '../../components/EachBoard/EachBoard'
import Loading from '../../components/Loading/Loading'

const BoardPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData[] | null>(null)

  const [newKanbanBoard, setNewKanbanBoard] = useState<Partial<IKanbanBoardData>>({
    title: '',
  })
  const [showInput, setShowInput] = useState(false)

  const loadBoard = async () => {
    try {
      const { data } = await kanbanservices.getKanbanBoard()
      setKanbanBoardData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadBoard()
  }, [])

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewKanbanBoard((prevBoard) => ({ ...prevBoard, [name]: value, }))
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await kanbanservices.createKanbanBoard(newKanbanBoard)
      setNewKanbanBoard({ title: '' })
      loadBoard()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleInput = () => {
    setShowInput(!showInput)
  }

  const { title } = newKanbanBoard

  return (
    <div className='container max-w-6xl mx-auto'>

      <h1 className='py-2 mb-4 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200'>Boards</h1>
      <div className='grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {!kanbanBoardData
          ? <Loading />
          : kanbanBoardData.map((kanbanBoard, idx) => (
            <Link to={`/${user?._id}/${kanbanBoard._id}`} key={idx}>
              <EachBoard {...kanbanBoard} />
            </Link>)
          )}
      </div >

      {!showInput
        ? <form className='text-white bg-gray-800 border rounded h-fit hover:bg-gradient-to-b from-emerald-500 to-emerald-900 w-fit'>
          <button
            className='flex items-center gap-2 px-4 py-2'
            onClick={toggleInput}>
            <MdPostAdd />
            <span>Add Board</span>
          </button>
        </form>
        : <form className='flex flex-col gap-4 p-4 text-white bg-gray-800 border rounded h-fit w-fit'
          onSubmit={todoSubmithandler}>
          <input
            className='px-2 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type='text'
            name='title'
            value={title}
            placeholder='Insert Task...'
            onChange={handlerInputChange}
          />
          <div className='flex items-center gap-2 listAdd-Controls'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded hover:border-transparent hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
              type='submit'>
              <MdPostAdd />
              <span>Add Board</span>
            </button>
            <button
              className='flex justify-center flex-1 h-full py-3 rounded hover:border hover:border-red-500 hover:bg-gray-900'
              onClick={toggleInput}>
              <MdClose />
            </button>
          </div>
        </form >
      }
    </div>
  )
}

export default BoardPage