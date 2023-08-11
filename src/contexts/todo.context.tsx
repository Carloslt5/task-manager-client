
import { ReactNode, createContext, useEffect, useState, } from 'react'
import { TodoData } from '../types/Todo.type'
import todoservices from '../services/ToDo.services'

export interface ToDoContextType {
  todoData: TodoData[] | null
  loadToDos: () => Promise<void>
  addTodoHandler: (todo: TodoData) => Promise<void>
  updateTodoHandler: (todoID: number, completed: boolean) => Promise<void>
  deleteTodoHandler: (todoID: number) => Promise<void>
}

export const ToDoContext = createContext<ToDoContextType | null>(null)
export function ToDoProviderWrapper({ children }: { children: ReactNode }) {

  const [todoData, setTodoData] = useState<TodoData[] | null>(null)

  const loadToDos = async () => {
    try {
      const { data } = await todoservices.getAllToDos()
      setTodoData(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadToDos()
  }, [])

  const addTodoHandler = async (todo: TodoData) => {
    try {
      setTodoData([...todoData ?? [], todo])
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodoHandler = async (todoID: number, completed: boolean) => {
    try {
      await todoservices.updateToDo(todoID, completed)
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodoHandler = async (todoID: number) => {
    try {
      await todoservices.deleteToDo(todoID)
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ToDoContext.Provider value={{ todoData, loadToDos, addTodoHandler, updateTodoHandler, deleteTodoHandler }}>
      {children}
    </ToDoContext.Provider >
  )
}
