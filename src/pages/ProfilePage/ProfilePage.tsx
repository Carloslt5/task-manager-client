import { useState } from "react"
import NewTodo from "../../components/NewTodo/NewTodo"
import TodoList from "../../components/TodoList/TodoList"
import { TodoData } from '../../types/Todo.type'


const todos: TodoData[] = [
  { id: 1, title: 'Finish the course', completed: true, },
  { id: 2, title: 'Typescript', completed: false },
  { id: 3, title: 'React', completed: false }
]

const ProfilePage = () => {

  const [todoData, setTodoData] = useState<TodoData[]>(todos)

  const addTodoHandler = (newTodo: TodoData) => {
    setTodoData([...todoData, newTodo])
  }

  const updateTodoHandler = (todoID: number) => {
    setTodoData(todoData.map(todo => todo.id === todoID
      ? { ...todo, completed: !todo.completed }
      : todo
    ))
  }

  const deleteTodoHandler = (todoID: number) => {
    setTodoData(todoData.filter(todo => todo.id !== todoID))
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter(todo => !todo.completed))
  }

  return (
    <>
      <div className="container px-2 mx-auto max-w-screen-lg ">
        <div>ProfilePage</div>
        <NewTodo AddTodo={addTodoHandler} />
        <TodoList todolist={todoData} UpdateTodo={updateTodoHandler} DeleteTodo={deleteTodoHandler} ClearCompleted={clearCompleted} />
      </div>
    </>
  )
}

export default ProfilePage