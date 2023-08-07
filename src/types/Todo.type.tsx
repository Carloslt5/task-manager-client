
export interface TodoData {
  _id: number,
  title: string,
  completed: boolean,
  createdAt: string
  updatedAt: string
}

export interface TodoProps extends TodoData {
  DeleteTodo: (todoID: number) => void
  UpdateTodo: (todoID: number, completed: boolean) => void
  // DeleteTodo: (todoID: number) => void
}