import { useState } from "react"
import { Todo } from '../../types/Todo.type'

interface NewTodoProps {
  AddTodo: (todo: Todo) => void
}

const NewTodo = (props: NewTodoProps) => {
  const [newTodo, setNewTodo] = useState({
    id: Math.random(),
    title: '',
    completed: false
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTodo({ ...newTodo, [name]: value })
  }

  const todoSubmithandler = (event: React.FormEvent) => {
    event.preventDefault()
    props.AddTodo(newTodo)
  }

  const { title } = newTodo

  return (

    <form onSubmit={todoSubmithandler} className="my-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name='title'
        value={title}
        placeholder="Insert Task..."
        onChange={handlerInputChange}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded" type="submit">
        Add todo
      </button>
    </form>
  )
}

export default NewTodo