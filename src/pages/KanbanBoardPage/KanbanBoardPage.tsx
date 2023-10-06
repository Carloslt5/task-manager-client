import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import ProjectForm from '../../components/Forms/ProjectForm'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import EachKanbanBoard from '../../components/EachKanbanBoard/EachKanbanBoard'
import Loading from '../../components/Loading/Loading'
import ModalForm from '../../components/ModalForm/ModalForm'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import ChangeTitle, { EditedContent } from '../../components/ChangeTitle/ChangeTitle'
import kanbanservices from '../../services/kanban.services'

const KanbanBoardPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const { kanbanBoardId } = useParams()
  const { kanbanBoardData, loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  useEffect(() => {
    if (kanbanBoardId) {
      loadKanbanBoard(kanbanBoardId)
    }
  }, [kanbanBoardId, loadKanbanBoard])

  const updateKanbantTitle = async (kanbanBoardId: string, editedContent: EditedContent) => {
    try {
      await kanbanservices.updateKanbanBoard(kanbanBoardId, editedContent)
    } catch (error) {
      console.log(error)
    }
  }

  if (!kanbanBoardId || !kanbanBoardData) {
    return <Loading />
  }

  return (
    <div className='container max-w-6xl mx-auto'>

      <header className='flex justify-between gap-2 pb-3 '>
        <ChangeTitle
          data={kanbanBoardData}
          entityId={kanbanBoardId}
          updateEntityTitle={updateKanbantTitle}
          updateEntity={loadKanbanBoard}
          variant='title-page'
        />
      </header>

      <button
        className='flex items-center gap-2 mb-4 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add Project</span>
      </button>

      <section className='grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto'>
        {
          kanbanBoardData.project.map((project, idx) => (
            <Link to={`/${user?._id}/${kanbanBoardId}/${project._id}`} key={idx}>
              <EachKanbanBoard {...project} />
            </Link>
          ))
        }
      </section>

      {
        showModal &&
        <ModalForm>
          <ProjectForm
            modalTitle='Insert New Project'
            kanbanID={kanbanBoardId}
            onCancel={toggleModal} />
        </ModalForm>
      }

    </div >
  )
}

export default KanbanBoardPage

