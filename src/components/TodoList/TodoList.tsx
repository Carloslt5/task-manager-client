import EachTodo from "../EachTodo/EachTodo"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist }: TodoListProps) => {

  return (
    <>
      {<ul>
        {todolist.map(todo => <EachTodo {...todo} key={todo.id} />)}
      </ul>}
    </>
  )
}

export default TodoList