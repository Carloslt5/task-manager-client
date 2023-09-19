import { useParams } from 'react-router-dom'
import kanbanservices from '../../services/kanban.services'
import { useContext, useState } from 'react'
import { MdModeEdit, MdClose } from 'react-icons/md'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import Loading from '../Loading/Loading'

const ChangeKanbanTitle = () => {
  const { kanbanBoardId } = useParams()
  const { kanbanBoardData, loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    title: '',
  })

  const handlerEditClick = () => {
    setEditing(!isEditing)
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      title: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (kanbanBoardId) {
        await kanbanservices.updateKanbanBoard(kanbanBoardId, editedContent)
        setEditedContent({ title: '' })
        loadKanbanBoard(kanbanBoardId)
        setEditing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!kanbanBoardData || !kanbanBoardId) {
    return <Loading />
  }

  const { title } = kanbanBoardData

  return (
    <div className='flex items-stretch justify-between w-full gap-2 mb-4'
    >

      {!isEditing
        ? <h1
          className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200'>
          {title}
        </h1>
        : <form
          onSubmit={todoSubmithandler}
          className='flex w-full text-5xl'>
          <input
            autoFocus
            onBlur={handlerEditClick}
            type='text'
            name='title'
            value={editedContent.title}
            onChange={handlerInputChange}
            className='w-full py-1 font-extrabold text-gray-900 uppercase rounded bg-gray-50 focus:ring-blue-500'
            placeholder={title}
            required />
        </form>
      }

      <div className='edit-title'>
        <button
          className='w-full h-full px-6'
          onClick={handlerEditClick}
        >
          {isEditing ? <MdClose /> : <MdModeEdit />}
        </button>
      </div>

    </div>

  )
}

export default ChangeKanbanTitle