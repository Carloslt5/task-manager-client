import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import Loading from '../../components/Loading/Loading'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import ModalForm from '../../components/ModalForm/ModalForm'
import ColumnState from '../../components/ColumnState/ColumnState'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NewStateForm from '../../components/Forms/NewStateForm'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import ChangeTitle, { EditedContent } from '../../components/ChangeTitle/ChangeTitle'
import projectservices from '../../services/project.services'

const ProjectPage = () => {
  const { projectId } = useParams()
  const { projectData, loadProject } = useContext(ProjectContext) as ProjectContextType
  const { loadTicket } = useContext(TicketContext) as TicketContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
      loadTicket(projectId)
    }
  }, [projectId, loadProject, loadTicket])

  const updateProjectTitle = async (projectId: string, editedContent: EditedContent) => {
    try {
      await projectservices.updateProject(projectId, editedContent)
    } catch (error) {
      console.log(error)
    }
  }

  if (!projectData || !projectId || !projectData.state) {
    return <Loading />
  }

  return (
    <div className='container h-full max-w-6xl mx-auto'>

      <header className='flex justify-between gap-2 pb-3 '>
        <ChangeTitle
          data={projectData}
          entityId={projectId}
          updateEntityTitle={updateProjectTitle}
          updateEntity={loadProject}
          variant='title-page'
        />
      </header>

      <button
        className='flex items-center gap-2 btn-add '
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