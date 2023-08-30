/* eslint-disable react-hooks/exhaustive-deps */
import kanbanservices from '../../services/kanban.services'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import EachKanbanBoard from '../../components/EachKanbanBoard/EachKanbanBoard'

const KanbanBoardPage = () => {
  const { kanbanBoardId } = useParams()
  const { kanbanBoardData, loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    title: '',
  })

  useEffect(() => {
    if (kanbanBoardId) {
      loadKanbanBoard(kanbanBoardId)
    }
  }, [])

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
    return <h1>Loading...</h1>
  }

  const { title } = kanbanBoardData

  return (
    <div className='px-2 py-2 m-4 text-gray-700 border rounded shadow appearance-none w-100'>
      <div className='flex items-center justify-between gap-4 mb-2 cardTitle'>
        {/* change title */}
        {!isEditing
          ? <h1 className='w-full p-2 text-2xl border border-transparent rounded'>{title}</h1>
          :
          <form
            onSubmit={todoSubmithandler}
            className='w-full'>
            <input
              type='text'
              name='title'
              value={editedContent.title}
              onChange={handlerInputChange}
              className='block w-full p-2 text-2xl text-gray-900 border rounded bg-gray-50 focus:ring-blue-500'
              placeholder={title}
              required />
          </form>
        }
        <div className='flex items-center gap-2 board-controls'>
          <button onClick={handlerEditClick}><MdModeEdit /></button>
        </div>
      </div>

      <div>
        <section className='flex flex-col flex-wrap gap-2'>
          {kanbanBoardData.project.map((project, idx) => (
            <Link to={`/project/${kanbanBoardId}/${project._id}`} key={idx}>
              <EachKanbanBoard {...project} />
            </Link>
          ))}
          <ProjectForm kanbanID={kanbanBoardId} />
        </section>
      </div>

    </div >
  )
}

export default KanbanBoardPage

