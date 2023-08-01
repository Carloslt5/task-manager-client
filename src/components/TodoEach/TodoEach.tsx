
interface Todo {
  id: number,
  text: string
}

const TodoEach = ({ id, text }: Todo) => {
  return (
    <li key={id}>·{text}</li>
  )
}

export default TodoEach