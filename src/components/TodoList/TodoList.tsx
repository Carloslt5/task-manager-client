import TodoEach from "../TodoEach/TodoEach"


interface TodoListProps {
  items: { id: number, text: string }[]
}

const TodoList: React.FC<TodoListProps> = props => {

  return (
    <>
      <div>TodoList</div>

      {<ul>
        {props.items.map(todo => {
          return <TodoEach {...todo} key={todo.id} />
        })}
      </ul>}
    </>

  )
}

export default TodoList