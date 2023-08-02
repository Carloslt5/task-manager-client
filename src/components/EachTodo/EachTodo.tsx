import { TodoProps } from '../../types/Todo.type'

const EachTodo = ({ id, title, DeleteTodo }: TodoProps) => {
  return (
    <li key={id} className='flex justify-between'>
      <p>·{title}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 py-2 px-4 rounded"
        onClick={DeleteTodo} >
        X
      </button>
    </li>
  )
}

export default EachTodo