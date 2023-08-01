import { Todo } from '../../types/Todo.type'

const EachTodo = ({ id, text }: Todo) => {
  return (
    <li key={id}>·{text}</li>
  )
}

export default EachTodo