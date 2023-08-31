import { useContext } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'
import Loading from '../Loading/Loading'

const TodoList = () => {

  const { todoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType
  // const [currentFilter, setCurrentFilter] = useState('All')

  return (
    <div className='w-full px-2 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'>

      <ul>
        {!todoDataBackup
          ? <Loading />
          : todoDataBackup.map((todo, idx) =>
            <li key={idx}>
              <EachTodo {...todo} />
            </li>
          )}
      </ul>

      <div className='flex flex-col items-center gap-2 mt-10 mb-2 text-gray-500 filtertOptions sm:flex-row sm:justify-between '>
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
          <li className='py-1 hover:text-red-500'>
            <button onClick={() => clearCompleted()} >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList