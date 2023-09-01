import { useContext, useState } from 'react'
import { MdPostAdd, MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import stateservices from '../../services/state.services'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'

interface AddNewStateProps {
  toggleModal: () => void
}

const AddNewState: React.FC<AddNewStateProps> = ({ toggleModal }) => {
  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })

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
        toggleModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className='flex flex-col'
      onSubmit={todoSubmithandler}
    >
      <input
        className='px-2 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
        type='text'
        name='stateName'
        placeholder='New State...'
        onChange={handlerInputChange}
      />
      <div className='flex justify-between gap-2 mt-2 items-strech'>
        <button
          className='flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded flex-2 hover:border-transparent hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
        >
          <MdPostAdd />
          <span>Add State</span>
        </button>
        <button
          className='absolute flex items-center justify-center p-4 rounded hover:border hover:border-red-500 hover:bg-gray-900'
          onClick={toggleModal}>
          <MdClose />
        </button>
      </div>
    </form>
  )
}

export default AddNewState