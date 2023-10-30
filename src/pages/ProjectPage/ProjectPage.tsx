import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import Loading from '@/components/Loading/Loading'
import { ProjectContext, ProjectContextType } from '@/contexts/project.context'
import ModalForm from '@/components/ModalForm/ModalForm'
import ColumnState from '@/components/ColumnState/ColumnState'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NewStateForm from '@/components/Forms/NewStateForm'
import { EditedContent, TicketContext, TicketContextType } from '@/contexts/ticket.context'
import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import projectservices from '@/services/project.services'
import SettingModal from '@/components/SettingModal/SettingModal'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'

const ProjectPage = () => {
  const { kanbanBoardId, projectId } = useParams()
  const { user } = useContext(AuthContext) as AuthContextType
  const { projectData, loadProject, deleteProject } = useContext(ProjectContext) as ProjectContextType
  const { ticketData, loadTicket, deleteStateAndTicket } = useContext(TicketContext) as TicketContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)
  const navigate = useNavigate()

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
      loadTicket(projectId)
    }
  }, [projectId, loadProject, loadTicket])

  const updateProjectTitle = async (projectId: string, editedContent: EditedContent) => {
    await projectservices.updateProject(projectId, editedContent)
  }

  const handleDelete = async () => {
    try {
      const stateIDs = projectData?.state.map(state => state._id)
      const ticketIDs = ticketData?.map(ticket => ticket._id)
      if (stateIDs && ticketIDs) {
        const statePromises = stateIDs?.map(stateID => {
          ticketIDs.map(ticketID => {
            deleteStateAndTicket(stateID, ticketID)
          })
        })
        await Promise.all(statePromises)
      }
      deleteProject()
      navigate(`/${user?._id}/${kanbanBoardId}`)
    } catch (error) {
      console.log('--->', error)
    }
  }

  if (!projectData || !projectId || !projectData.state) {
    return <Loading />
  }

  return (
    <div className='container h-full max-w-6xl mx-auto'>

      <header className='flex items-stretch justify-between gap-2 pb-3'>
        <ChangeTitle
          data={projectData}
          entityId={projectId}
          updateEntityTitle={updateProjectTitle}
          updateEntity={loadProject}
          variant='title-page'
        />
        <SettingModal
          textData='Delete Project'
          deleteEntity={handleDelete}
        />

      </header>

      <button
        className='flex items-center gap-2 mb-6 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add State</span>
      </button>

      <DndProvider backend={HTML5Backend}>
        <section className='h-[75%] mt-2'>
          <ul className='flex flex-row items-stretch max-h-full gap-4 pb-2 mb-3 overflow-y-auto text-white'>
            {
              projectData.state.map((state, idx) => (
                <ColumnState {...state} key={idx} />
              ))
            }
          </ul>
          <p className='mt-2 text-sm text-center text-slate-500 dark:text-zinc-500'>
            Drag and Drop ticket to change status
          </p>
        </section >
      </DndProvider>

      {
        showModal &&
        <ModalForm >
          <NewStateForm
            modalTitle='Insert New State'
            onCancel={toggleModal}
          />
        </ModalForm>
      }

    </div >

  )

}

export default ProjectPage