import React, { useState } from 'react'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'
import kanbanservices from '../../services/kanban.services'

interface BoardFormaProps {
  modalTitle: string
  loadBoard: () => void
  onCancel: () => void
}

const BoardForm: React.FC<BoardFormaProps> = ({ modalTitle, loadBoard, onCancel }) => {

  const handleCancel = () => {
    onCancel()
  }

  const [newKanbanBoard, setNewKanbanBoard] = useState<Partial<IKanbanBoardData>>({
    title: '',
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewKanbanBoard((prevBoard) => ({ ...prevBoard, [name]: value, }))
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await kanbanservices.createKanbanBoard(newKanbanBoard)
      setNewKanbanBoard({ title: '' })
      handleCancel()
      loadBoard()
    } catch (error) {
      console.log(error)
    }
  }

  const { title } = newKanbanBoard

  return (
    <div
      className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white'>{modalTitle}</h1>
      </div>
      <hr className='mb-4' />

      <form
        className='flex flex-col gap-4 text-slate-500'
        onSubmit={todoSubmithandler}
      >
        <input
          autoFocus
          className='input-standard'
          type='text'
          name='title'
          value={title}
          placeholder='Insert Board...'
          onChange={handlerInputChange}
        />
        <div className='flex flex-row-reverse items-center gap-2 mt-4 items-strech'>

          <button
            type='submit'
            className='flex items-center btn-add'
          >
            <span>Add Board</span>
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

export default BoardForm