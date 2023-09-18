import { useContext, useState } from 'react'
import todoservices from './../../services/ToDo.services'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'

const NewTodo = () => {

  const { addTodoHandler } = useContext(ToDoContext) as ToDoContextType

  const [newTodo, setNewTodo] = useState({
    title: '',
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTodo({ ...newTodo, [name]: value })
  }

  const todoSubmithandler = (event: React.FormEvent) => {
    event.preventDefault()
    todoservices
      .createToDo(newTodo)
      .then(({ data }) => {
        addTodoHandler(data)
        setNewTodo({ title: '' })
      })
      .catch(err => console.log(err))
  }

  const { title } = newTodo

  return (
    <form
      onSubmit={todoSubmithandler}
      className='flex flex-col gap-3 my-4 md:flex-row'
    >
      <input
        className='input-primary'
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

export default NewTodo