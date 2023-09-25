import { TodoData } from '../../types/Todo.type'

export interface ToDoContextType {
  todoData: TodoData[] | null
  todoDataBackup: TodoData[] | null
  setTodoData: React.Dispatch<React.SetStateAction<TodoData[] | []>>
  setTodoDataBackup: React.Dispatch<React.SetStateAction<TodoData[] | []>>
  loadToDos: (userId: string) => Promise<void>
  addTodoHandler: (todo: TodoData, id: string) => Promise<void>
  updateTodoHandler: (todoID: string, completed: boolean, id: string) => Promise<void>
  deleteTodoHandler: (todoID: string, id: string) => Promise<void>
  changeFilter: (filter: string) => void
  clearCompleted: (id: string) => Promise<void>
}
