import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'
import { MdDeleteForever } from 'react-icons/md'
import { useContext } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'

const EachTicket: React.FC<ITicketData> = ({ _id, title, state, description, completed, project, owner }) => {
  const { deleteTicket } = useContext(TicketContext) as TicketContextType

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
      description: description,
      state: state,
      completed: completed,
      project: project,
      owner: owner
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <li
      ref={drag}
      className={`flex justify-between items-center py-2 px-1 bg-gray-500 rounded cursor-pointer hover:bg-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${isDragging && 'opacity-30'}`}
    >
      <p>{title}</p>
      <span
        onClick={() => deleteTicket(_id, project._id)}
        className='rounded hover:text-red-500'>
        <MdDeleteForever />
      </span>
    </li >
  )
}

export default EachTicket