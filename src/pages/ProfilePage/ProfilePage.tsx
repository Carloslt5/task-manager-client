import { useState } from "react"
import NewTodo from "../../components/NewTodo/NewTodo"
import TodoList from "../../components/TodoList/TodoList"
import { Todo } from '../../types/Todo.type'


const todos = [
  { id: 1, title: 'Finish the course', completed: false },
  { id: 2, title: 'Typescript', completed: false },
  { id: 3, title: 'React', completed: false }
]

const ProfilePage = () => {

  const [todoData, setTodoData] = useState(todos)

  const addTodoHandler = (newTodo: Todo) => {
    console.log('este es el nuevo todo', newTodo)
    setTodoData([...todoData, newTodo])
  }

  return (
    <>
      <div className="container px-2 mx-auto">
        <div>ProfilePage</div>
        <NewTodo AddTodo={addTodoHandler} />
        <TodoList todolist={todoData} />
      </div>
    </>
  )
}

export default ProfilePage