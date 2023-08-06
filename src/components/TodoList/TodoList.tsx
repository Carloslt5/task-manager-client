import EachTodo from '../EachTodo/EachTodo'
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todoslist, DeleteTodo }: TodoListProps) => {

  return (
    <div className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
      {<ul>
        {todoslist?.map((todo, idx) =>
          <li key={idx}>
            <EachTodo {...todo} DeleteTodo={DeleteTodo} />
          </li>
        )}
      </ul>}
      <div className='filtertOptions flex flex-col items-center gap-2 mt-10 mb-2 text-gray-500 sm:flex-row sm:justify-between '>
        <ul>
          <li className='py-1'>
            {todoslist.length} Total Task
          </li>
        </ul>
        <ul className='flex gap-4'>
          <li className='py-1 hover:text-emerald-400'>
            <button>All</button>
          </li>
          <li className='py-1  hover:text-emerald-400'>
            <button>Active</button>
          </li>
          <li className='py-1  hover:text-emerald-400'>
            <button>Completed</button>
          </li>
        </ul>
        <ul>
          <li className='py-1  hover:text-emerald-400'>
            <button
            // onClick={ClearCompleted}
            >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList