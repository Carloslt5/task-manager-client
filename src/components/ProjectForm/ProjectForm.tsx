import { MdPostAdd, MdClose } from 'react-icons/md'
import { useContext, useState } from 'react'
import projectservices from '../../services/project.services'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import { useParams } from 'react-router-dom'

const ProjectForm = ({ kanbanID }: { kanbanID: string }) => {
  const { kanbanBoardId } = useParams()
  const { loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [newProjectData, setNewProjectData] = useState({
    title: '',
    description: '',
  })

  const [showInput, setShowInput] = useState(false)

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewProjectData((prevBoard) => ({ ...prevBoard, [name]: value, }))
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await projectservices.createProject(newProjectData, kanbanID)
      setNewProjectData({ title: '', description: '' })
      loadKanbanBoard(kanbanBoardId!)
      setShowInput(false)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleInput = () => {
    setShowInput(!showInput)
  }

  const { title, description } = newProjectData

  return (
    <>
      {!showInput
        ? <form className='text-white bg-gray-800 border rounded h-fit hover:bg-gradient-to-b from-emerald-500 to-emerald-900 w-fit'>
          <button
            className='flex items-center gap-2 px-4 py-2 h-fit'
            onClick={toggleInput}>
            <MdPostAdd />
            <span>Add Proyect</span>
          </button>
        </form>
        : <form className='flex flex-col gap-4 p-4 text-white bg-gray-800 border rounded h-fit w-fit'
          onSubmit={todoSubmithandler}
        >
          <input
            className='px-2 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type='text'
            name='title'
            value={title}
            placeholder='Insert title...'
            onChange={handlerInputChange}
          />
          <input
            className='px-2 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
            type='text'
            name='description'
            value={description}
            placeholder='Insert description...'
            onChange={handlerInputChange}
          />
          <div className='flex justify-between gap-2 mt-2 items-strech listAdd-Controls'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded flex-2 hover:border-transparent hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
            >
              <MdPostAdd />
              <span>Add Project</span>
            </button>
            <button
              className='flex items-center justify-center flex-1 rounded hover:border hover:border-red-500 hover:bg-gray-900'
              onClick={toggleInput}>
              <MdClose />
            </button>
          </div>
        </form>
      }
    </>
  )
}

export default ProjectForm