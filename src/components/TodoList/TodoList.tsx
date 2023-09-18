import { useContext } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'
import Loading from '../Loading/Loading'

const TodoList = () => {

  const { todoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType

  return (
    <div className='w-full px-2 py-2 mb-4 text-white border border-gray-400 rounded shadow appearance-none bg-slate-500 dark:bg-zinc-800'>

      <ul>
        {!todoDataBackup
          ? <Loading />
          : todoDataBackup.map((todo, idx) =>
            <li key={idx}>
              <EachTodo {...todo} />
            </li>
          )}
      </ul>

      <div className='flex flex-col items-center gap-2 mt-10 text-white filtertOptions sm:flex-row sm:justify-between '>
        <ul>
          <li className='py-1'>
            {todoDataBackup?.length} Total Task
          </li>
        </ul>
        <ul className='flex gap-4'>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={() => changeFilter('All')}>All</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={() => changeFilter('Active')}>Active</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={() => changeFilter('Completed')}>Completed</button>
          </li>
        </ul>
        <ul>
          <li className='py-1 hover:text-red-500'>
            <button onClick={() => clearCompleted()} >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList