import { useContext, useEffect, useRef } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import todoservices from '../../services/ToDo.services'

const TodoList = () => {
  const { id } = useParams()
  const { loadToDos, todoDataBackup, setTodoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    if (id) {
      loadToDos(id)
    }
  }, [loadToDos, id])

  const changeFilterHandler = (filter: string) => () => changeFilter(filter)
  const clearCompletedHandler = () => clearCompleted(id!)

  const dragTodo = useRef<number>(0)
  const dragOverTodo = useRef<number>(0)

  const handlerSort = () => {
    const todoDataBackupClone = [...todoDataBackup]
    const temp = todoDataBackupClone[dragTodo.current]
    todoDataBackupClone[dragTodo.current] = todoDataBackupClone[dragOverTodo.current]
    todoDataBackupClone[dragOverTodo.current] = temp
    setTodoDataBackup(todoDataBackupClone)

    const updatedTodoData = todoDataBackupClone.map((todo, index) => ({
      ...todo,
      order: index,
    }))

    todoservices.updateTodoOrder(id!, updatedTodoData)
  }

  return (
    <div className='flex flex-col w-full p-2 overflow-hidden text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
      <ul
        className='mb-4 overflow-y-auto'>

        {
          !todoDataBackup
            ? <Loading />
            : todoDataBackup.length === 0
              ? <p>No pending tasks 👍</p>
              : todoDataBackup.map((todo, index) =>
                <li key={todo._id}
                  draggable
                  onDragStart={() => dragTodo.current = index}
                  onDragEnter={() => dragOverTodo.current = index}
                  onDragEnd={handlerSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <EachTodo {...todo} index={index} />
                </li>
              )
        }

      </ul>
      <div className='flex flex-col items-center gap-2 text-white sm:flex-row sm:justify-between '>
        <ul>
          <li className='py-1'>
            {todoDataBackup?.length} Total Task
          </li>
        </ul>
        <ul className='flex gap-4'>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('All')}>All</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('Active')}>Active</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('Completed')}>Completed</button>
          </li>
        </ul>
        <ul>
          <li className='py-1 hover:text-red-500'>
            <button onClick={clearCompletedHandler} >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList