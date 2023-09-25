import { useContext } from 'react'
import { TodoData } from '../../types/Todo.type'
import { MdDeleteForever } from 'react-icons/md'
import { MdCheck } from 'react-icons/md'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'
import { useDrag, useDrop } from 'react-dnd'

export interface draggableToDo extends TodoData {
  index: number
}

const EachTodo: React.FC<draggableToDo> = ({ _id, title, completed, order, owner, index }) => {
  const { id } = useParams()
  const { updateTodoHandler, deleteTodoHandler } = useContext(ToDoContext) as ToDoContextType
  // const { todoDataBackup, setTodoDataBackup } = useContext(ToDoContext) as ToDoContextType

  const updateTodo = () => updateTodoHandler(_id, completed, id!)
  const deleteTodo = () => deleteTodoHandler(_id, id!)

  const [, drag] = useDrag(() => ({
    type: 'TODO',
    item: {
      _id: _id,
      title: title,
      completed: completed,
      owner: owner,
      order: order,
      index: index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }))

  const [, drop] = useDrop(() => ({
    accept: 'TODO',
    drop: (item: draggableToDo) => reorderTodos(item, item.index, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  }))

  const reorderTodos = (item: TodoData, startIndex: number, endIndex: number) => {
    console.log('item', item)
    console.log('inicio', startIndex)
    console.log('end', endIndex)
  }

  return (
    <article
      ref={(node) => drag(drop(node))}
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
          <br />
          position: {index}
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