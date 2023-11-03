import { useContext } from 'react'
import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'
import { EditedContent } from '@/contexts/ticket.context'
import todoservices from '@/services/ToDo.services'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { TodoData } from '@/types/Todo.type'

export const useHandleTodo = (todo: TodoData, ticketID: string) => {

  const { id: userID } = useParams()
  const { _id: todoID } = todo

  const { loadToDos, updateToDo, deleteToDo } = useContext(ToDoContext) as ToDoContextType

  const handlerUpdateTodo = () => updateToDo(userID!, todo, ticketID)
  const handlerDeleteToDo = () => deleteToDo(userID!, todoID, ticketID)
  const handlerLoadToDos = () => loadToDos(userID!, ticketID)

  const handlerUpdateTitleToDo = async (_id: string, editedContent: EditedContent) => {
    try {
      await todoservices.updateTitleToDo(userID!, editedContent)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return {
    handlerUpdateTodo,
    handlerDeleteToDo,
    handlerLoadToDos,
    handlerUpdateTitleToDo
  }

}