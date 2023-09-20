import { useContext, useEffect } from 'react'
import NewTodo from '../../components/NewTodo/NewTodo'
import TodoList from '../../components/TodoList/TodoList'
import { ToDoContext, } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'

const TaskPage = () => {
  const { id } = useParams()
  const { loadToDos } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    if (id) {
      loadToDos(id)
    }
  }, [loadToDos, id])

  return (

    <div className='container flex flex-col h-full px-4' >
      <h1 className='text-3xl dark:text-white'>Your Task List...</h1>
      <NewTodo />
      <TodoList />
    </div>

  )
}

export default TaskPage