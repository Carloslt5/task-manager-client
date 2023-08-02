import EachTodo from "../EachTodo/EachTodo"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist, UpdateTodo, DeleteTodo, ClearCompleted }: TodoListProps) => {

  return (
    <>
      <div className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        {<ul>
          {todolist.map(todo =>
            <li key={todo.id}>
              <EachTodo {...todo} UpdateTodo={UpdateTodo} DeleteTodo={DeleteTodo} />
            </li>)}
        </ul>}
        <div className="filtertOptions flex flex-col items-center gap-2 mt-10 mb-2 text-gray-500 md:flex-row md:justify-between">
          <ul>
            <li>{todolist.length} Total Task</li>
          </ul>
          <ul
            className="flex gap-4">
            <li className="py-1">All</li>
            <li className="py-1">Active</li>
            <li className="py-1">Completed</li>
          </ul>
          <ul>
            <li onClick={ClearCompleted}>Clear Completed</li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default TodoList