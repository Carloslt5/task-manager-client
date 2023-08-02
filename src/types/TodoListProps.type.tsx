import { TodoData } from './Todo.type'

export interface TodoListProps {
  todolist: TodoData[],
  DeleteTodo: React.MouseEventHandler<HTMLButtonElement>
}