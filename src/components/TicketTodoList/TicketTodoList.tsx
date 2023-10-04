import React, { useContext, useEffect } from 'react'

import Loading from '../Loading/Loading'
import EachTodo from '../EachTodo/EachTodo'
import { ToDoContext } from '../../contexts/todo.context'
import { ToDoContextType } from '../../contexts/Types/ToDoContext.types'
import { useParams } from 'react-router-dom'

import { ITicketData } from '../../types/Ticket.type'

const TicketTodoList: React.FC<ITicketData> = ({ _id: ticketID }) => {
  const { id: userID } = useParams()
  const { todoDataBackup, loadToDos } = useContext(ToDoContext) as ToDoContextType

  useEffect(() => {
    if (userID) {
      loadToDos(userID, ticketID)
    }
  }, [loadToDos, userID, ticketID])

  return (

    <article className='flex flex-col w-full p-2 overflow-y-scroll text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
      <ul className='flex flex-col gap-1 overflow-scroll'>

        {
          !todoDataBackup
            ? <Loading />
            : todoDataBackup.length === 0
              ? <p>No pending tasks 👍</p>
              : todoDataBackup.map((todo, index) =>
                <li key={todo._id} >
                  <EachTodo {...todo} index={index} ticketID={ticketID} />
                </li>
              )
        }

      </ul>
    </article>

  )
}

export default TicketTodoList