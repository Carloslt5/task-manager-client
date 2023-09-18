import React, { useState } from 'react'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'
import kanbanservices from '../../services/kanban.services'
import { MdPostAdd, MdClose } from 'react-icons/md'

interface BoardFormaProps {
  loadBoard: () => void
  toggleModal: () => void
}

const BoardForm: React.FC<BoardFormaProps> = ({ loadBoard, toggleModal }) => {

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
      toggleModal()
      loadBoard()
    } catch (error) {
      console.log(error)
    }
  }

  const { title } = newKanbanBoard

  return (
    <div
      id='containerForm'
      className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white'>Insert new board</h1>
        <button
          className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
          onClick={toggleModal}
        >
          <MdClose />
        </button>
      </div>
      <hr className='mb-4' />

      <form className='flex flex-col gap-4 text-white'
        onSubmit={todoSubmithandler}>
        <input
          className='input-primary'
          type='text'
          name='title'
          value={title}
          placeholder='Insert Task...'
          onChange={handlerInputChange}
        />
        <div className='flex items-center gap-2 listAdd-Controls'>
          <button
            className='flex items-center gap-2 btn-add'
            type='submit'>
            <MdPostAdd />
            <span>Add Board</span>
          </button>
        </div>
      </form >
    </div>
  )
}

export default BoardForm