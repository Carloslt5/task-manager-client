import { TodoData } from './Todo.type'

export interface TodoList {
  todolist: TodoData[],
}

export interface TodoListProps extends TodoList {
  DeleteTodo: (todoID: number) => void
}