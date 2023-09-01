/* eslint-disable react-hooks/exhaustive-deps */
import kanbanservices from '../../services/kanban.services'
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdModeEdit, MdPostAdd } from 'react-icons/md'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import EachKanbanBoard from '../../components/EachKanbanBoard/EachKanbanBoard'
import Loading from '../../components/Loading/Loading'
import ModalForm from '../../components/ModalForm/ModalForm'

const KanbanBoardPage = () => {
  const { kanbanBoardId } = useParams()
  const { kanbanBoardData, loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

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
    return <Loading />
  }

  const { title } = kanbanBoardData

  return (
    <div className='container max-w-6xl mx-auto'>
      <div className='flex items-stretch justify-between gap-2 mb-4'>
        {/* change title */}
        {!isEditing
          ? <h1
            className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200'>
            {title}
          </h1>
          : <form
            onSubmit={todoSubmithandler}
            className='flex w-full text-5xl'>
            <input
              type='text'
              name='title'
              value={editedContent.title}
              onChange={handlerInputChange}
              className='w-full py-1 font-extrabold text-gray-900 uppercase rounded bg-gray-50 focus:ring-blue-500'
              placeholder={title}
              required />
          </form>
        }
        <div className='flex items-center rounded board-controls hover:bg-gray-300'>
          <button
            className='w-full h-full px-6'
            onClick={handlerEditClick}><MdModeEdit />
          </button>
        </div>
      </div>

      <section>
        <div className='grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto'>
          {kanbanBoardData.project.map((project, idx) => (
            <Link to={`/project/${kanbanBoardId}/${project._id}`} key={idx}>
              <EachKanbanBoard {...project} />
            </Link>
          ))}
        </div>
        <button
          className='flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
          onClick={toggleModal}>
          <MdPostAdd />
          <span>Add Project</span>
        </button>

        {
          showModal &&
          <ModalForm toggleModal={toggleModal} >
            <ProjectForm kanbanID={kanbanBoardId} toggleModal={toggleModal} />
          </ModalForm>
        }
      </section>
    </div >

  )
}

export default KanbanBoardPage

