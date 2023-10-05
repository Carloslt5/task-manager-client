import { useContext, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import stateservices from '../../services/state.services'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'

interface NewStateFormProps {
  modalTitle: string
  onCancel: () => void
}

const NewStateForm: React.FC<NewStateFormProps> = ({ modalTitle, onCancel }) => {
  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })

  const handleCancel = () => {
    onCancel()
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewStateData({ ...newStateData, [name]: value })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (projectId) {
        await stateservices.createState(projectId, newStateData)
        loadProject(projectId)
        handleCancel()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <>
      <div
        id='containerForm'
        className='modal-form'>
        <div className='flex justify-between' >
          <h1 className='text-2xl text-white '>{modalTitle}</h1>
          <button
            className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
            onClick={handleCancel}
          >
            <MdClose />
          </button>
        </div>
        <hr className='mb-4' />
        <form
          className='flex flex-col'
          onSubmit={todoSubmithandler}
        >
          <input
            autoFocus
            className='input-primary'
            type='text'
            name='stateName'
            placeholder='New State...'
            onChange={handlerInputChange}
          />
          <div className='flex justify-between gap-2 mt-4 items-strech'>
            <button
              className='flex items-center gap-2 btn-add'
            >
              <span>Add State</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewStateForm