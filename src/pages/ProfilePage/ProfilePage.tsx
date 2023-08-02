import { useState } from "react"
import NewTodo from "../../components/NewTodo/NewTodo"
import TodoList from "../../components/TodoList/TodoList"
import { TodoData } from '../../types/Todo.type'


const todos: TodoData[] = [
  { id: 1, title: 'Finish the course', completed: false, },
  { id: 2, title: 'Typescript', completed: false },
  { id: 3, title: 'React', completed: false }
]

const ProfilePage = () => {

  const [todoData, setTodoData] = useState<TodoData[]>(todos)

  const addTodoHandler = (newTodo: TodoData) => {
    setTodoData([...todoData, newTodo])
  }

  const deleteTodoHandler = (todoID: number) => {
    return setTodoData(todoData.filter(todo => todo.id !== todoID))
  }

  return (
    <>
      <div className="container px-2 mx-auto">
        <div>ProfilePage</div>
        <NewTodo AddTodo={addTodoHandler} />
        <TodoList todolist={todoData} DeleteTodo={deleteTodoHandler} />
      </div>
    </>
  )
}

export default ProfilePage