
export interface TodoData {
  id: number,
  title: string,
  completed: boolean,
  createdAt: string
  updatedAt: string
}

export interface TodoProps extends TodoData {
  // DeleteTodo: (React.MouseEventHandler<HTMLButtonElement>)
  // UpdateTodo: (todoID: number) => void
  // DeleteTodo: (todoID: number) => void
}