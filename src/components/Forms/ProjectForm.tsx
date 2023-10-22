import React, { useContext, useState } from 'react'
import projectservices from '@/services/project.services'
import { KanbanContext, KanbanContextType } from '@/contexts/kanban.context'
import { useParams } from 'react-router-dom'

interface ProjecFormProprs {
  kanbanID: string
  modalTitle: string
  onCancel: () => void
}

const ProjectForm: React.FC<ProjecFormProprs> = ({ modalTitle, kanbanID, onCancel }) => {
  const { kanbanBoardId } = useParams()
  const { loadKanbanBoard } = useContext(KanbanContext) as KanbanContextType

  const [newProjectData, setNewProjectData] = useState({
    title: '',
    description: '',
  })

  const handleCancel = () => {
    onCancel()
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewProjectData((prevBoard) => ({ ...prevBoard, [name]: value, }))
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (kanbanBoardId) {
        await projectservices.createProject(newProjectData, kanbanID)
        setNewProjectData({ title: '', description: '' })
        handleCancel()
        loadKanbanBoard(kanbanBoardId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const { title, description } = newProjectData

  return (
    <div
      className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white '>{modalTitle}</h1>
      </div>
      <hr className='mb-4' />
      <form
        className='flex flex-col gap-2'
        onSubmit={todoSubmithandler}
      >
        <input
          autoFocus
          className='input-standard text-slate-700'
          type='text'
          name='title'
          value={title}
          placeholder='Insert title...'
          onChange={handlerInputChange}
        />
        <input
          className='input-standard text-zinc-700'
          type='text'
          name='description'
          value={description}
          placeholder='Insert description...'
          onChange={handlerInputChange}
        />
        <div className='flex flex-row-reverse items-center gap-2 mt-4 items-strech'>

          <button
            className='flex items-center btn-add'
          >
            <span>Add Project</span>
          </button>
          <button
            className='btn-cancel'
            onClick={handleCancel}
          >
            <span>Cancel</span>
          </button>

        </div>
      </form >
    </div>

  )
}

export default ProjectForm