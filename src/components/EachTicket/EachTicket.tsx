import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'

const EachTicket: React.FC<ITicketData> = ({ _id, title, state, completed, projectId, owner }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
      state: state,
      completed: completed,
      projectId: projectId,
      owner: owner
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <li
      ref={drag}
      className={`py-2 px-1 bg-gray-500 rounded cursor-pointer hover:bg-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${isDragging && 'opacity-30'}`}
    >
      <p>{title}</p>
    </li >
  )
}

export default EachTicket