import { ITicketData } from '../../types/Ticket.type'

const EachTicket: React.FC<ITicketData> = ({ _id, title }) => {

  return (
    <li
      className='p-1 bg-gray-700 rounded cursor-pointer hover:bg-gray-900 opacity-30'
    >
      <p>{title}</p>
      <p className='text-sm'>este es el id: </p>
      <p >{_id} </p>
    </li >
  )
}

export default EachTicket