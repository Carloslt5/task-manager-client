import { useContext } from 'react'
import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { useDrop } from 'react-dnd'
import ticketservices from '../../services/ticket.services'

const ColumnState: React.FC<IState> = (state) => {
  const { ticketData, setTicketData } = useContext(TicketContext) as TicketContextType

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EachTicket',
    drop: (ticket: { id: string }) => addTicketToState(ticket.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addTicketToState = (ticketID: string) => {
    setTicketData(tickets => {
      if (!tickets) {
        return tickets
      }
      const orderTicket = tickets?.map(ticket => {
        if (ticket._id == ticketID) {
          return { ...ticket, state: state }
        }
        return ticket
      })
      try {
        const infoupdate = { ticketID, state }
        ticketservices.updateStateTicket(infoupdate)
      } catch (error) {
        console.error('Error al cambiar el ticket en la base de datos', error)
      }
      return orderTicket
    })
  }

  return (
    <li
    >
      <article
        className={`flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]  ${isOver ? 'bg-slate-900' : ''}`}
      >
        <EachState {...state} />

        <article className='p-1 overflow-y-scroll'>
          <ul
            ref={drop}
            className='flex flex-col gap-2 overflow-y-hidden'>
            {!ticketData
              ? <Loading />
              : ticketData.filter(ticket => ticket.state?.stateName === state.stateName).map((ticket, idx) => (
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