import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'

const EachTicket: React.FC<ITicketData> = ({ _id, title, completed, projectId, owner }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
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
      className={`p-1 bg-gray-700 rounded cursor-pointer hover:bg-gray-900 ${isDragging && 'opacity-30'}`}
    >
      <p>{title}</p>
      <p className='text-sm'>este es el id: </p>
      <p >{_id} </p>
    </li >
  )
}

export default EachTicket