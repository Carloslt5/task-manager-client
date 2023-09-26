import { useContext, useEffect } from 'react'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { ToDoContext } from '../../contexts/todo.context'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { ReactSortable } from 'react-sortablejs'
import { TodoData } from '../../types/Todo.type'
import todoservices from '../../services/ToDo.services'

const TodoList = () => {
  const { id } = useParams()
  const { loadToDos, todoDataBackup, setTodoDataBackup, changeFilter, clearCompleted } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    if (id) {
      loadToDos(id)
    }
  }, [loadToDos, id])

  const changeFilterHandler = (filter: string) => () => changeFilter(filter)
  const clearCompletedHandler = () => clearCompleted(id!)

  const handleSortEnd = (newOrder: TodoData[]) => {
    setTodoDataBackup(newOrder)

    const updatedOrder = newOrder.map((item: TodoData, index: number) => ({
      _id: item._id,
      title: item.title,
      order: index,
    }))

    todoservices.updateTodoOrder(id!, updatedOrder)
  }

  return (
    <div className='flex flex-col w-full p-2 overflow-hidden text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
      <ul
        className='mb-4 overflow-y-auto'>
        <ReactSortable
          filter='.addImageButtonContainer'
          dragClass='sortableDrag'
          list={todoDataBackup as never[]}
          setList={handleSortEnd}
          animation={200}
          easing='ease-out'
        >
          {
            !todoDataBackup
              ? <Loading />
              : todoDataBackup.length === 0
                ? <p>No pending tasks 👍</p>
                : todoDataBackup.map((todo) =>
                  <li key={todo._id}>
                    <EachTodo {...todo} />
                  </li>
                )
          }
        </ReactSortable>
      </ul>
      <div className='flex flex-col items-center gap-2 text-white sm:flex-row sm:justify-between '>
        <ul>
          <li className='py-1'>
            {todoDataBackup?.length} Total Task
          </li>
        </ul>
        <ul className='flex gap-4'>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('All')}>All</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('Active')}>Active</button>
          </li>
          <li className={'py-1  hover-primary'}>
            <button
              className={'focus:text-blue-500'}
              onClick={changeFilterHandler('Completed')}>Completed</button>
          </li>
        </ul>
        <ul>
          <li className='py-1 hover:text-red-500'>
            <button onClick={clearCompletedHandler} >Clear Completed</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList