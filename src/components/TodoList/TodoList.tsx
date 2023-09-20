import { useContext } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'

const TodoList = () => {
  const { id } = useParams()
  const { todoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType

  const changeFilterHandler = (filter: string) => () => {
    changeFilter(filter)
  }

  const clearCompletedHandler = () => {
    clearCompleted(id!)
  }

  return (
    <div className='flex flex-col w-full p-2 overflow-hidden text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>

      <ul className='mb-4 overflow-y-auto'>
        {
          !todoDataBackup
            ? <Loading />
            : todoDataBackup.length === 0
              ? <p>No pending tasks 👍</p>
              : todoDataBackup.map((todo, idx) =>
                <li key={idx}>
                  <EachTodo {...todo} />
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