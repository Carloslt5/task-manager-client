/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import ProjectForm from '../../components/Forms/ProjectForm'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import EachKanbanBoard from '../../components/EachKanbanBoard/EachKanbanBoard'
import Loading from '../../components/Loading/Loading'
import ModalForm from '../../components/ModalForm/ModalForm'
import ChangeKanbanTitle from '../../components/ChangeKanbanTitle/ChangeKanbanTitle'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'

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
  }, [])

  if (!kanbanBoardId) {
    return <Loading />
  }

  return (
    <div className='container max-w-6xl mx-auto'>

      <ChangeKanbanTitle />

      <button
        className='flex items-center gap-2 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add Project</span>
      </button>

      <section className='grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto'>
        {!kanbanBoardData
          ? <Loading />
          : kanbanBoardData.project.map((project, idx) => (
            <Link to={`/${user?._id}/${kanbanBoardId}/${project._id}`} key={idx}>
              <EachKanbanBoard {...project} />
            </Link>
          ))}
      </section>

      {
        showModal &&
        <ModalForm>
          <ProjectForm kanbanID={kanbanBoardId} toggleModal={toggleModal} />
        </ModalForm>
      }

    </div >
  )
}

export default KanbanBoardPage

