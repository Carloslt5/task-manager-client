/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
import { ToDoContext, } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'

const ProfilePage = () => {

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

  const { todoData, loadToDos } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    loadToDos()
  }, [])

  return (
    <>
      <div className='container px-2 mx-auto mt-8 max-w-screen-sm'>
        <h1 className='text-3xl'>Your Task List...</h1>
        <NewTodo />
        {!todoData
          ? <h1>Loading...</h1>
          : <TodoList todoslist={todoData} />
        }

      </div>
    </>
  )
}

export default ProfilePage