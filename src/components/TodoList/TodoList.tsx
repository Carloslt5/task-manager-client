import TodoEach from "../TodoEach/TodoEach"
import { TodoListProps } from './../../types/TodoListProps.type'

const TodoList = ({ todolist }: TodoListProps) => {

  return (
    <>
      <div>TodoList</div>

      {<ul>
        {todolist.map(todo => <TodoEach {...todo} key={todo.id} />)}
      </ul>}
    </>

  )
}

export default TodoList