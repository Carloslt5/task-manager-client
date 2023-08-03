import { TodoProps } from '../../types/Todo.type'
import Check from '../icons/Check'

const EachTodo = ({ id, title, completed, UpdateTodo, DeleteTodo }: TodoProps) => {

  return (
    <article className='flex justify-between items-center py-2 border-b gap-2'>
      <div className='flex gap-2 items-center'>

        <button
          className={`rounded-full h-6 w-6 border
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`
          }
          onClick={UpdateTodo.bind(null, id)}
        >
          {completed && <Check />}
        </button>
        <p className={`${completed && 'line-through text-gray-400'}`}>
          {title}
        </p>

      </div>
      <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={DeleteTodo.bind(null, id)} >
        X
      </button>
    </article>
  )
}

export default EachTodo