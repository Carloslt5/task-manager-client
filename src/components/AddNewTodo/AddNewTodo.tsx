import { useContext, useState } from 'react'
import todoservices from '../../services/ToDo.services'
import { useParams } from 'react-router-dom'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ITicketData } from '../../types/Ticket.type'

const AddNewTodo: React.FC<ITicketData> = ({ _id: ticketID }) => {
  const { id: userID } = useParams()
  const { addTodo } = useContext(ToDoContext) as ToDoContextType

  const [newTodo, setNewTodo] = useState({
    title: '',
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTodo({ ...newTodo, [name]: value })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const { data } = await todoservices.createToDo(userID!, newTodo, ticketID!)
      addTodo(userID!, data, ticketID!)
      setNewTodo({ title: '' })
    } catch (error) {
      console.log(error)
    }
  }

  const { title } = newTodo
  return (
    <form
      onSubmit={todoSubmithandler}
      className='flex flex-col gap-3 md:flex-row'
    >
      <input
        className='input-standard'
        type='text'
        name='title'
        value={title}
        placeholder='Insert Task...'
        onChange={handlerInputChange}
      />
      <button
        className='btn-form'
        type='submit'>
        Add
      </button>
    </form>
  )

}

export default AddNewTodo