import { TodoData } from './Todo.type'

export interface TodoList {
  todolist: TodoData[],
}

export interface TodoListProps extends TodoList {
  UpdateTodo: (todoID: number) => void
  DeleteTodo: (todoID: number) => void
}