import { Todo } from '../../types/Todo.type'

const EachTodo = ({ id, title }: Todo) => {
  return (
    <li key={id}>·{title} </li>
  )
}

export default EachTodo