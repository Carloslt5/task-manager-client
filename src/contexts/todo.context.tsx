
import { ReactNode, createContext, useCallback, useState } from 'react'
import { TodoData } from '../types/Todo.type'
import todoservices from '../services/ToDo.services'
import { ToDoContextType } from './Types/ToDoContext.types'

export const ToDoContext = createContext<ToDoContextType | null>(null)
export function ToDoProviderWrapper({ children }: { children: ReactNode }) {

  const [todoData, setTodoData] = useState<TodoData[] | []>([])
  const [todoDataBackup, setTodoDataBackup] = useState<TodoData[]>(todoData)

  const loadToDos = useCallback(async (userID: string, ticketID: string) => {
    try {
      if (ticketID) {

        const { data } = await todoservices.getTicketToDos(userID, ticketID)
        setTodoData(data)
        setTodoDataBackup(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const addTodoHandler = async (todo: TodoData, id: string, ticketID: string) => {
    try {
      setTodoData([...todoData ?? [], todo])
      loadToDos(id, ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodoHandler = async (todoID: string, completed: boolean, id: string, ticketID: string) => {
    try {
      await todoservices.updateToDo(todoID, completed, id)
      loadToDos(id, ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodoHandler = async (todoID: string, id: string, ticketID: string) => {
    try {
      await todoservices.deleteToDo(todoID, id)
      loadToDos(id, ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  // const changeFilter = (filter: string) => {
  //   if (todoDataBackup) {
  //     switch (filter) {
  //       case ('All'):
  //         return setTodoDataBackup(todoData)
  //       case ('Active'):
  //         return setTodoDataBackup(todoData!.filter(todo => !todo.completed))
  //       case ('Completed'):
  //         return setTodoDataBackup(todoData!.filter(todo => todo.completed))
  //       default:
  //         return setTodoDataBackup(todoData)
  //     }
  //   }
  // }

  // const clearCompleted = async (id: string) => {
  //   try {
  //     await todoservices.clearCompleted(id)
  //     loadToDos(id)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <ToDoContext.Provider
      value={{
        todoData,
        todoDataBackup,
        setTodoData,
        setTodoDataBackup,
        loadToDos,
        addTodoHandler,
        updateTodoHandler,
        deleteTodoHandler,
        // changeFilter,
        // clearCompleted
      }}>
      {children}
    </ToDoContext.Provider >
  )
}
