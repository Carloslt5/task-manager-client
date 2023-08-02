import EachTodo from "../EachTodo/EachTodo"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist, DeleteTodo }: TodoListProps) => {

  return (
    <>
      {<ul>
        {todolist.map(todo => <EachTodo {...todo} key={todo.id} DeleteTodo={DeleteTodo} />)}
      </ul>}
    </>
  )
}

export default TodoList