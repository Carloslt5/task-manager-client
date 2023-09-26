import { useContext } from 'react'
import { TodoData } from '../../types/Todo.type'
import { MdDeleteForever } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'

const EachTodo: React.FC<TodoData> = ({ _id, title, completed }) => {
  const { id } = useParams()
  const { updateTodoHandler, deleteTodoHandler } = useContext(ToDoContext) as ToDoContextType

  const updateTodo = () => updateTodoHandler(_id, completed, id!)
  const deleteTodo = () => deleteTodoHandler(_id, id!)

  return (
    <article
      className='flex items-center justify-between gap-2 p-2 mb-1 rounded cursor-pointer bg-slate-600 dark:bg-zinc-700 dark:text-white'>
      <div className='flex items-center gap-2'>

        <button
          className={`rounded-full h-6 w-6 border bg-slate-200 dark:bg-zinc-900
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
        className='px-2 py-2 font-bold bg-red-500 rounded hover:bg-red-700'
        onClick={deleteTodo}
      >
        <MdDeleteForever />
      </button>
    </article>
  )
}

export default EachTodo