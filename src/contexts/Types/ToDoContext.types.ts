import { TodoData } from '../../types/Todo.type'

export interface ToDoContextType {
  todoData: TodoData[] | null
  loadToDos: () => Promise<void>
  addTodoHandler: (todo: TodoData) => Promise<void>
  updateTodoHandler: (todoID: number, completed: boolean) => Promise<void>
  deleteTodoHandler: (todoID: number) => Promise<void>
}
