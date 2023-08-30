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
        ? <button className='flex items-center gap-2 px-4 py-2 border rounded h-fit' onClick={toggleInput}>
          <MdPostAdd />
          <span>Add Proyect</span>
        </button>
        : <form className='flex flex-col gap-2 p-4 border rounded'
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
          <div className='flex items-center gap-2 mt-2 listAdd-Controls'>
            <button className='flex gap-2 px-4 py-2 border'>
              <MdPostAdd />
              <span>Add Board</span>
            </button>
            <button onClick={toggleInput}>
              <MdClose />
            </button>
          </div>
        </form>
      }
    </>
  )
}

export default ProjectForm