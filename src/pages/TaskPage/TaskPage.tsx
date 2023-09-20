/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
import { ToDoContext, } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'

const TaskPage = () => {
  const { loadToDos } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    loadToDos()
  }, [])

  return (

    <div className='container flex flex-col h-full px-4' >
      <h1 className='text-3xl dark:text-white'>Your Task List...</h1>
      <NewTodo />
      <TodoList />
    </div>

  )
}

export default TaskPage