import { MdPostAdd, MdClose } from 'react-icons/md'
import { useState } from 'react'
import projectservices from '../../services/project.services'

const ProjectForm = ({ kanbanID }: { kanbanID: string }) => {

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
        ? <button className='border px-4 py-2 flex gap-2 items-center h-fit rounded' onClick={toggleInput}>
          <MdPostAdd />
          <span>Add Proyect</span>
        </button>
        : <form className='border p-4'
          onSubmit={todoSubmithandler}
        >
          <input
            className='shadow appearance-none border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='title'
            value={title}
            placeholder='Insert title...'
            onChange={handlerInputChange}
          />
          <input
            className='shadow appearance-none border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            name='description'
            value={description}
            placeholder='Insert description...'
            onChange={handlerInputChange}
          />
          <div className='listAdd-Controls flex gap-2 items-center mt-2'>
            <button className='border px-4 py-2 flex gap-2'>
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