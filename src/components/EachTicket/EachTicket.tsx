import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'
import { MdDeleteForever } from 'react-icons/md'
import { useContext } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { getPriorityColor } from '../../const/Ticket-Priority'

const EachTicket: React.FC<ITicketData> = ({ _id, title, state, description, completed, priority, project, owner }) => {
  const { deleteTicket } = useContext(TicketContext) as TicketContextType

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
      description: description,
      state: state,
      completed: completed,
      priority: priority,
      project: project,
      owner: owner
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const priorityColor = getPriorityColor(priority)

  return (
    <li
      ref={drag}
      className={`flex justify-start items-stretch gap-2 bg-gray-500 overflow-hidden rounded cursor-pointer hover:bg-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${isDragging && 'opacity-30'} `}
    >
      <div className={`${priorityColor} w-2`}>
      </div>
      <article className='flex items-center justify-between w-full'>
        <p>{title}</p>
        <span
          onClick={() => deleteTicket(_id, project._id)}
          className='rounded hover:text-red-500'>
          <MdDeleteForever />
        </span>
      </article>
    </li >
  )
}

export default EachTicket