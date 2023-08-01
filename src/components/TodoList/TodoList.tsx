import NewTodo from "../NewTodo/NewTodo"
import EachTodo from "../EachTodo/EachTodo"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist }: TodoListProps) => {

  return (
    <>
      <div>TodoList</div>
      <div className="container px-2">
        <NewTodo />
        {<ul>
          {todolist.map(todo => <EachTodo {...todo} key={todo.id} />)}
        </ul>}
      </div>

    </>

  )
}

export default TodoList