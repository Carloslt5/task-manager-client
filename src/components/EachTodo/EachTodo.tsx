import { useContext } from 'react'
import { TodoData } from '../../types/Todo.type'
import Check from '../icons/Check'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'

const EachTodo = ({ _id, title, completed }: TodoData) => {

  const { updateTodoHandler, deleteTodoHandler } = useContext(ToDoContext) as ToDoContextType

  return (
    <article className='flex justify-between items-center py-2 border-b gap-2'>
      <div className='flex gap-2 items-center'>

        <button
          className={`rounded-full h-6 w-6 border
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`
          }
          onClick={() => updateTodoHandler(_id, completed)}
        >
          {completed && <Check />}
        </button>
        <p className={`${completed && 'line-through text-gray-400'}`}>
          {title}
        </p>

      </div>
      <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => deleteTodoHandler(_id)}
      >
        X
      </button>
    </article>
  )
}

export default EachTodo