import { useContext } from 'react'
import { TodoData } from '@/types/Todo.type'
import { MdDeleteForever } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'
import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import { EditedContent } from '@/contexts/ticket.context'
import todoservices from '@/services/ToDo.services'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface droppableTodo {
  todo: TodoData
  index: number
  ticketID: string
}

const EachTodo: React.FC<droppableTodo> = ({ todo, ticketID }) => {
  const { id: userID } = useParams()
  const { _id: todoID, completed } = todo

  const { loadToDos, updateToDo, deleteToDo } = useContext(ToDoContext) as ToDoContextType

  const handlerUpdateTodo = () => updateToDo(userID!, todo, ticketID)
  const handlerDeleteToDo = () => deleteToDo(userID!, todoID, ticketID)
  const handlerLoadToDos = () => loadToDos(userID!, ticketID)

  const handlerUpdateTitleToDo = async (_id: string, editedContent: EditedContent) => {
    try {
      await todoservices.updateTitleToDo(userID!, editedContent)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return (
    <article
      className='flex items-center justify-between gap-2 p-2 rounded cursor-pointer bg-slate-600 dark:bg-zinc-700 dark:text-white'>
      <div className='flex items-center w-full gap-2'>

        <button
          className={`rounded-full h-4 w-4 aspect-square flex flex-nowrap border bg-slate-200 dark:bg-zinc-900
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`
          }
          onClick={handlerUpdateTodo}
        >
          {completed && <MdCheck />}
        </button>
        <article className={`${completed && 'line-through'} w-full`}>
          <ChangeTitle
            data={todo}
            entityId={todoID}
            updateEntityTitle={handlerUpdateTitleToDo}
            updateEntity={handlerLoadToDos}
          />
        </article>

      </div>
      <div className='flex gap-2'>
        <button
          className='p-1 font-bold bg-red-500 rounded hover:bg-red-700'
          onClick={handlerDeleteToDo}
        >
          <MdDeleteForever />
        </button>
      </div>
    </article>
  )
}

export default EachTodo