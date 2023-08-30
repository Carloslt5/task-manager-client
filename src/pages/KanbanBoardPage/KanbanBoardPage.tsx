/* eslint-disable react-hooks/exhaustive-deps */
import kanbanservices from '../../services/kanban.services'
import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'

const KanbanBoardPage = () => {

  const { kanbanBoardId } = useParams()
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData | null>(null)

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    title: '',
  })

  const loadKanbanBoard = useCallback(async () => {
    try {
      if (kanbanBoardId) {
        const { data } = await kanbanservices.getOneKanbanBoard(kanbanBoardId)
        setKanbanBoardData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [kanbanBoardId])

  useEffect(() => {
    loadKanbanBoard()
  }, [loadKanbanBoard])

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
        loadKanbanBoard()
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
    <div className='shadow appearance-none border rounded w-100 m-4 py-2 px-2 text-gray-700 leading-tight'>
      <div className='cardTitle mb-2 flex justify-between items-center gap-4'>

        {!isEditing
          ? <h1 className='text-2xl p-2 border border-transparent rounded w-full'>{title}</h1>
          :
          <form
            onSubmit={todoSubmithandler}
            className='w-full'>
            <input
              type='text'
              name='title'
              value={editedContent.title}
              onChange={handlerInputChange}
              className='text-2xl p-2 bg-gray-50 border text-gray-900 rounded focus:ring-blue-500 block w-full'
              placeholder={title}
              required />
          </form>
        }

        <div className='board-controls flex gap-2 items-center'>
          <button onClick={handlerEditClick}><MdModeEdit /></button>
        </div>
      </div>

      <div>
        <section className='flex flex-wrap flex-col gap-2'>
          {kanbanBoardData.project.map((project, idx) => (
            <Link to={`/project/${kanbanBoardId}/${project._id}`} key={idx}>
              <article className='flex rounded border p-2 justify-between items-center' >
                <h2>{project.title}</h2>
              </article>
            </Link>

          ))}
          <ProjectForm kanbanID={kanbanBoardId} />
        </section>
      </div>

    </div >
  )
}

export default KanbanBoardPage

