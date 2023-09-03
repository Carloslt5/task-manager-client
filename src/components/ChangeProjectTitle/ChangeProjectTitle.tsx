import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { MdModeEdit, MdClose } from 'react-icons/md'
import Loading from '../Loading/Loading'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import projectservices from '../../services/project.services'

const ChangeProjectTitle = () => {
  const { projectId } = useParams()

  const { projectData, loadProject } = useContext(ProjectContext) as ProjectContextType

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
      if (projectId) {
        await projectservices.updateProject(projectId, editedContent)
        setEditedContent({ title: '' })
        loadProject(projectId)
        setEditing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!projectData || !projectId) {
    return <Loading />
  }

  const { title } = projectData

  return (
    <div className='flex items-stretch justify-between w-full gap-2 mb-4 '
    >

      {!isEditing
        ?
        <h1
          className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200 '>
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
          onClick={handlerEditClick}
        >
          {isEditing ? <MdClose /> : <MdModeEdit />}
        </button>
      </div>

    </div>

  )
}

export default ChangeProjectTitle