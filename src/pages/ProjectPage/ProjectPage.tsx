import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import Loading from '../../components/Loading/Loading'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import ModalForm from '../../components/ModalForm/ModalForm'
import AddNewState from '../../components/AddNewState/AddNewState'
import ChangeProjectTitle from '../../components/ChangeProjectTitle/ChangeProjectTitle'
import ColumnState from '../../components/ColumnState/ColumnState'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ProjectPage = () => {
  const { projectId } = useParams()
  const { projectData, loadProject } = useContext(ProjectContext) as ProjectContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
    }
  }, [projectId, loadProject])

  if (!projectData || !projectId || !projectData.state) {
    return <Loading />
  }

  return (
    <div className='container h-full max-w-6xl mx-auto'>
      <ChangeProjectTitle />
      <button
        className='flex items-center gap-2 btn-add '
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add State</span>
      </button>
      <DndProvider backend={HTML5Backend}>
        <section className='h-[80%] mt-2'>
          <ul className='flex flex-row items-stretch h-full gap-4 pb-4 mb-2 overflow-y-auto text-white'>
            {projectData.state.map((state, idx) => (
              <ColumnState {...state} key={idx} />
            ))}
          </ul>
        </section >
      </DndProvider>
      {
        showModal &&
        <ModalForm >
          <AddNewState toggleModal={toggleModal} />
        </ModalForm>
      }

    </div >
  )
}

export default ProjectPage