import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'

const EachTicket: React.FC<ITicketData> = ({ _id, title }) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EachTicket',
    item: { id: _id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  return (
    <li
      ref={drag}
      className={`p-1 bg-gray-700 rounded cursor-pointer hover:bg-gray-900  ${isDragging ? 'opacity-20' : 'opacity-100'}`}
    >
      {title}
    </li >
  )
}

export default EachTicket