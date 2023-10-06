import { useContext } from 'react'
import { TodoData } from '../../types/Todo.type'
import { MdDeleteForever } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'

interface droppableTodo extends TodoData {
  index: number
  ticketID: string
}

const EachTodo: React.FC<droppableTodo> = ({ _id, title, completed, ticketID }) => {
  const { id } = useParams()
  const { updateTodoHandler, deleteTodoHandler } = useContext(ToDoContext) as ToDoContextType

  const updateTodo = () => updateTodoHandler(_id, completed, id!, ticketID)
  const deleteTodo = () => deleteTodoHandler(_id, id!, ticketID)

  return (
    <article
      className='flex items-center justify-between gap-2 p-2 rounded cursor-pointer bg-slate-600 dark:bg-zinc-700 dark:text-white'>
      <div className='flex items-center gap-2'>

        <button
          className={`rounded-full h-4 w-4 aspect-square flex flex-nowrap border bg-slate-200 dark:bg-zinc-900
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`
          }
          onClick={updateTodo}
        >
          {completed && <MdCheck />}
        </button>
        <p className={`${completed && 'line-through'}`}>
          {title}
        </p>

      </div>
      <button
        className='p-1 font-bold bg-red-500 rounded hover:bg-red-700'
        onClick={deleteTodo}
      >
        <MdDeleteForever />
      </button>
    </article>
  )
}

export default EachTodo