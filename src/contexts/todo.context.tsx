
import { ReactNode, createContext, useState } from 'react'
import { TodoData } from '../types/Todo.type'
import todoservices from '../services/ToDo.services'
import { ToDoContextType } from './Types/ToDoContext.types'

export const ToDoContext = createContext<ToDoContextType | null>(null)
export function ToDoProviderWrapper({ children }: { children: ReactNode }) {

  const [todoData, setTodoData] = useState<TodoData[] | null>(null)
  const [todoDataBackup, setTodoDataBackup] = useState(todoData)

  const loadToDos = async () => {
    try {
      const { data } = await todoservices.getAllToDos()
      setTodoData(data)
      setTodoDataBackup(data)
    } catch (error) {
      console.log(error)
    }
  }

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

  const changeFilter = (filter: string) => {
    if (todoDataBackup) {
      switch (filter) {
        case ('All'):
          return setTodoDataBackup(todoData)
        case ('Active'):
          return setTodoDataBackup(todoData!.filter(todo => !todo.completed))
        case ('Completed'):
          return setTodoDataBackup(todoData!.filter(todo => todo.completed))
        default:
          return setTodoDataBackup(todoData)
      }
    }
  }

  const clearCompleted = async () => {
    try {
      await todoservices.clearCompleted()
      loadToDos()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ToDoContext.Provider value={{ todoData, todoDataBackup, loadToDos, addTodoHandler, updateTodoHandler, deleteTodoHandler, changeFilter, clearCompleted }}>
      {children}
    </ToDoContext.Provider >
  )
}
