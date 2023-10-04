import { TodoData } from '../../types/Todo.type'

export interface ToDoContextType {
  todoData: TodoData[] | []
  setTodoData: React.Dispatch<React.SetStateAction<TodoData[] | []>>
  todoDataBackup: TodoData[]
  setTodoDataBackup: React.Dispatch<React.SetStateAction<TodoData[] | []>>
  loadToDos: (userId: string, ticketID: string) => Promise<void>
  addTodoHandler: (todo: TodoData, id: string, ticketID: string) => Promise<void>
  updateTodoHandler: (todoID: string, completed: boolean, id: string, ticketID: string) => Promise<void>
  deleteTodoHandler: (todoID: string, id: string, ticketID: string) => Promise<void>
  // changeFilter: (filter: string) => void
  // clearCompleted: (id: string) => Promise<void>
}
