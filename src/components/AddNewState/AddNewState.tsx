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

    <>
      <div
        id='containerForm'
        className=' flex flex-col  min-w-[90%] md:min-w-[50%] gap-2 p-4 text-white bg-slate-700  dark:bg-zinc-900 border border-slate-400 rounded h-3/4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl text-white '>Insert new state</h1>
          <button
            className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
            onClick={toggleModal}
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
            className='px-2 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type='text'
            name='stateName'
            placeholder='New State...'
            onChange={handlerInputChange}
          />
          <div className='flex justify-between gap-2 mt-2 items-strech'>
            <button
              className='flex items-center gap-2 btn-add'
            >
              <MdPostAdd />
              <span>Add State</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddNewState