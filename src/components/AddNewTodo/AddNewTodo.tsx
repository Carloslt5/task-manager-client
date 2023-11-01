import { useContext, useState } from 'react'
import todoservices from '@/services/ToDo.services'
import { useParams } from 'react-router-dom'
import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/contexts/Types/ToDoContext.types'
import { ITicketData } from '@/types/Ticket.type'
import { useForm } from 'react-hook-form'
import { ValidationError } from '../SignupForm/SignupForm'
import { AxiosError } from 'axios'
import { TodoData } from '@/types/Todo.type'
import { toast } from 'react-toastify'

const AddNewTodo: React.FC<ITicketData> = ({ _id: ticketID }) => {
  const { id: userID } = useParams()
  const { addTodo } = useContext(ToDoContext) as ToDoContextType

  const todoForm = useForm<TodoData>({
    defaultValues: {
      title: ''
    }
  })

  const { register, handleSubmit } = todoForm
  const [newTicketErrors, setNewTicketrrors] = useState<ValidationError[]>([])

  const todoSubmithandler = async (newTodo: TodoData) => {
    try {
      const { data } = await todoservices.createToDo(userID!, newTodo, ticketID!)
      addTodo(userID!, data, ticketID!)
      setNewTicketrrors([])
      todoForm.setValue('title', '')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404 || error.response?.status === 422) {
          toast.error(error.response?.data.message)
        }
        setNewTicketrrors(error.response?.data)
      }
    }
  }

  return (
    <>
      <form
        className='flex flex-col gap-3 md:flex-row'
        onSubmit={handleSubmit(todoSubmithandler)}
      >
        <input
          className='input-standard text-slate-700'
          type='text'
          placeholder='Insert Task...'
          {...register('title')}
        />
        <button
          className='btn-form'
          type='submit'>
          Add
        </button>
      </form>
      {
        newTicketErrors.length > 0 && newTicketErrors
          .map((error, index) => (
            <p key={index} className='form-error'>{error.message}</p>
          ))
      }
    </>
  )

}

export default AddNewTodo