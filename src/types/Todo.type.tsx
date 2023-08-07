
export interface TodoData {
  _id: number,
  title: string,
  completed: boolean,
  createdAt: string
  updatedAt: string
}

export interface TodoProps extends TodoData {
  UpdateTodo: (todoID: number, completed: boolean) => void
  DeleteTodo: (todoID: number) => void
  // DeleteTodo: (todoID: number) => void
}