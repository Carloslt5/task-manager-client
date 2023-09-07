import { useDrop } from 'react-dnd'
import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'
import { ITicketData } from '../../types/Ticket.type'
import { useState } from 'react'

const ColumnState: React.FC<IState> = (state) => {
  const [tickets, setTickets] = useState(state.ticket || [])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Ticket',
    drop: (ticket: ITicketData) => addItemToSection(ticket),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (ticketToAdd: ITicketData) => {
    console.log('droped', ticketToAdd, state.stateName)
    setTickets((prevTickets) => [...prevTickets, ticketToAdd])
  }

  return (
    <li>
      <article
        ref={drop}
        className='flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]'
      >
        <EachState {...state} />

        <article className={`py-2 overflow-y-scroll rounded ${isOver && 'bg-slate-950'}`}>
          <ul
            className='flex flex-col gap-2 overflow-y-hidden'>
            {!tickets
              ? <Loading />
              : tickets?.map((ticket, idx) => (
                <EachTicket {...ticket} key={idx} />
              ))
            }
          </ul>
        </article>

        < AddNewTicket {...state} />

      </article>

    </li >
  )
}

export default ColumnState