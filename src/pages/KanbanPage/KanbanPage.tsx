import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import { Link } from 'react-router-dom'
import { MdPostAdd, MdClose } from 'react-icons/md'
import kanbanservices from '../../services/kanban.services'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'

const KanbanPage = () => {
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
    <>
      <h1 className='text-3xl mb-4'>Welcome {user?.firstName} {user?.lastName} 🫂</h1>
      <div className='flex flex-wrap gap-2 mb-2 w-100'>
        {!kanbanBoardData
          ? <h1>Loading...</h1>
          : kanbanBoardData.map((kanbanBoard, idx) => (
            <Link to={`/${user?._id}/${kanbanBoard._id}`} key={idx}>
              <article className=' w-60 h-32 p-4 rounded border'>
                <h2>{kanbanBoard.title}</h2>
              </article>
            </Link>)
          )}

        {!showInput
          ? <button className='border px-4 py-2 flex gap-2 items-center h-fit rounded' onClick={toggleInput}>
            <MdPostAdd />
            <span>Add Board</span>
          </button>
          : <form className='border p-4'
            onSubmit={todoSubmithandler}>
            <input
              className='shadow appearance-none border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              name='title'
              value={title}
              placeholder='Insert Task...'
              onChange={handlerInputChange}
            />
            <div className='listAdd-Controls flex gap-2 items-center mt-2'>
              <button
                className='border px-4 py-2 flex gap-2'
                type='submit'>
                <MdPostAdd />
                <span>Add Board</span>
              </button>
              <button onClick={toggleInput}>
                <MdClose />
              </button>
            </div>
          </form>
        }
      </div >
    </>
  )
}

export default KanbanPage