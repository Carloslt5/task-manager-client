import { Todo } from './../../types/Todo.type'

const TodoEach = ({ id, text }: Todo) => {
  return (
    <li key={id}>·{text}</li>
  )
}

export default TodoEach