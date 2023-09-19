import { useContext, useState } from 'react'
import { IState } from '../../types/State.type'
import stateservices from '../../services/state.services'
import { useParams } from 'react-router-dom'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'

const EachState: React.FC<IState> = ({ _id, stateName }) => {

  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    stateName: '',
  })

  const handlerEditClick = () => {
    setEditing(!isEditing)
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      stateName: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (projectId) {
        await stateservices.editState({ _id, ...editedContent })
        setEditedContent({ stateName: '' })
        setEditing(false)
        loadProject(projectId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mb-4' >
      {
        !isEditing
          ? <h2 onClick={handlerEditClick} className='px-1 font-bold uppercase 2xl'>{stateName}</h2>
          : <form
            onSubmit={todoSubmithandler}
            className='flex w-full'>
            <input
              type='text'
              name='title'
              value={editedContent.stateName}
              onChange={handlerInputChange}
              className='w-full px-1 font-extrabold text-gray-900 uppercase rounded bg-gray-50 focus:ring-blue-500'
              placeholder={stateName}
              required />
          </form>
      }
      <hr className='my-2' />
    </div>
  )
}

export default EachState