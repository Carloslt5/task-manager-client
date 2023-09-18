import { useContext } from 'react'
import { TodoData } from '../../types/Todo.type'
import { MdDeleteForever } from 'react-icons/md'
import Check from '../icons/Check'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'

const EachTodo = ({ _id, title, completed }: TodoData) => {

  const { updateTodoHandler, deleteTodoHandler } = useContext(ToDoContext) as ToDoContextType

  return (
    <article className='flex items-center justify-between gap-2 py-2 border-b border-gray-400 dark:text-white'>
      <div className='flex items-center gap-2'>

        <button
          className={`rounded-full h-6 w-6 border bg-slate-200 dark:bg-zinc-900
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`
          }
          onClick={() => updateTodoHandler(_id, completed)}
        >
          {completed && <Check />}
        </button>
        <p className={`${completed && 'line-through'}`}>
          {title}
        </p>

      </div>
      <button
        className='px-2 py-2 font-bold bg-red-500 rounded hover:bg-red-700'
        onClick={() => deleteTodoHandler(_id)}
      >
        <MdDeleteForever />
      </button>
    </article>
  )
}

export default EachTodo