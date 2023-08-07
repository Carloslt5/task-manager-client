import { useEffect, useState } from 'react'
import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
import { TodoData } from '../../types/Todo.type'
import todoservices from '../../services/ToDo.services'

const ProfilePage = () => {

  const [todoData, setTodoData] = useState<TodoData[]>()

  const loadToDos = async () => {
    try {
      const { data } = await todoservices.getAllToDos()
      setTodoData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadToDos()
  }, [])

  const addTodoHandler = ({ todo }: { todo: TodoData }) => {
    setTodoData([...todoData ?? [], todo])
  }

  const updateTodoHandler = async (todoID: number, completed: boolean) => {

    try {
      await todoservices.updateToDo(todoID, completed)
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodoHandler = async (todoID: number) => {
    try {
      await todoservices.deleteToDo(todoID)
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  // const fileredTodo = (filter: string) => {
  //   switch (filter) {
  //     case ('All'):
  //       return todoData
  //     case ('Active'):
  //       return todoData.filter(todo => !todo.completed)
  //     case ('Completed'):
  //       return todoData.filter(todo => todo.completed)
  //   }

  // }

  // const clearCompleted = () => {
  //   setTodoData(todoData.filter(todo => !todo.completed))
  // }

  return (
    <>
      <div className='container px-2 mx-auto max-w-screen-lg'>
        <div>ProfilePage</div>
        <NewTodo AddTodo={addTodoHandler} />

        {!todoData
          ? <h1>Loading...</h1>
          : <TodoList
            todoslist={todoData}
            UpdateTodo={updateTodoHandler}
            DeleteTodo={deleteTodoHandler}
          />
        }
        {/* {!todoData
          ? <h1>Loading...</h1>
          : <TodoList
            todolist={todoData}
          // UpdateTodo={updateTodoHandler}
          // DeleteTodo={deleteTodoHandler}
          // ClearCompleted={clearCompleted}
          />
        } */}

      </div>
    </>
  )
}

export default ProfilePage