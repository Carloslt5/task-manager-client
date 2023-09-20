import { TodoData } from '../../types/Todo.type'

export interface ToDoContextType {
  todoData: TodoData[] | null
  todoDataBackup: TodoData[] | null
  loadToDos: (userId: string) => Promise<void>
  addTodoHandler: (todo: TodoData, id: string) => Promise<void>
  updateTodoHandler: (todoID: number, completed: boolean, id: string) => Promise<void>
  deleteTodoHandler: (todoID: number, id: string) => Promise<void>
  changeFilter: (filter: string) => void
  clearCompleted: (id: string) => Promise<void>
}
