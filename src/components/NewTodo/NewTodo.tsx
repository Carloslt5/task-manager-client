import { useContext, useState } from 'react'
import todoservices from './../../services/ToDo.services'
import { ToDoContext, ToDoContextType } from '../../contexts/todo.context'

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
      className='my-4 flex flex-col gap-3 md:flex-row'
    >
      <input
        className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type='text'
        name='title'
        value={title}
        placeholder='Insert Task...'
        onChange={handlerInputChange}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        type='submit'>
        Add
      </button>
    </form>
  )
}

export default NewTodo