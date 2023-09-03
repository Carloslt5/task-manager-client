import { MdPostAdd, MdClose } from 'react-icons/md'
import React, { useContext, useState } from 'react'
import projectservices from '../../services/project.services'
import { KanbanContext, KanbanContextType } from '../../contexts/kanban.context'
import { useParams } from 'react-router-dom'

interface ProjecFormProprs {
  kanbanID: string
  toggleModal: () => void
}

const ProjectForm: React.FC<ProjecFormProprs> = ({ kanbanID, toggleModal }) => {
  const { kanbanBoardId } = useParams()
  const { loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [newProjectData, setNewProjectData] = useState({
    title: '',
    description: '',
  })

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
      toggleModal()
    } catch (error) {
      console.log(error)
    }
  }

  const { title, description } = newProjectData

  return (

    <>
      <div
        id='containerForm'
        className=' flex flex-col  min-w-[90%] md:min-w-[50%] gap-2 p-4 text-white bg-gray-800 border rounded h-3/4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl text-white '>Insert new project</h1>
          <button
            className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
            onClick={toggleModal}
          >
            <MdClose />
          </button>
        </div>
        <hr className='mb-4' />
        <form
          className='flex flex-col gap-2 text-white'
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
          <div className='flex justify-between gap-2 mt-4 items-strech'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded flex-2 hover:border-transparent hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
            >
              <MdPostAdd />
              <span>Add Project</span>
            </button>
          </div>
        </form >
      </div>
    </>

  )
}

export default ProjectForm