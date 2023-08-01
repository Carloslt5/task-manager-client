import NewTodo from "../NewTodo/NewTodo"
import EachTodo from "../EachTodo/EachTodo"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist }: TodoListProps) => {

  return (
    <>
      <div className="container px-2 mx-auto">
        <NewTodo />
        {<ul>
          {todolist.map(todo => <EachTodo {...todo} key={todo.id} />)}
        </ul>}
      </div>
    </>
  )
}

export default TodoList