import { useContext } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'

const TodoList = () => {

  const { todoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType
  // const [currentFilter, setCurrentFilter] = useState('All')

  return (
    <div className='shadow appearance-none border rounded w-full mb-4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>

      <ul>
        {!todoDataBackup
          ? <h1>Loading....</h1>
          : todoDataBackup.map((todo, idx) =>
            <li key={idx}>
              <EachTodo {...todo} />
            </li>
          )}
      </ul>

      <div className='filtertOptions flex flex-col items-center gap-2 mt-10 mb-2 text-gray-500 sm:flex-row sm:justify-between '>
        <ul>
          <li className='py-1'>
            {todoDataBackup?.length} Total Task
          </li>
        </ul>
        <ul className='flex gap-4'>
          <li className={'py-1  hover:text-emerald-400'}>
            <button
              className={'focus:text-emerald-400'}
              onClick={() => changeFilter('All')}>All</button>
          </li>
          <li className={'py-1  hover:text-emerald-400'}>
            <button
              className={'focus:text-emerald-400'}
              onClick={() => changeFilter('Active')}>Active</button>
          </li>
          <li className={'py-1  hover:text-emerald-400'}>
            <button
              className={'focus:text-emerald-400'}
              onClick={() => changeFilter('Completed')}>Completed</button>
          </li>
        </ul>
        <ul>
          <li className='py-1  hover:text-red-500'>
            <button onClick={() => clearCompleted()} >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList