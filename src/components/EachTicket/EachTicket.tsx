import { ITicketData } from '../../types/Ticket.type'

const EachTicket: React.FC<ITicketData> = ({ title }) => {
  return (
    <li
      className='p-1 bg-gray-700 rounded cursor-pointer hover:bg-gray-900'>
      {title}
    </li >
  )
}

export default EachTicket