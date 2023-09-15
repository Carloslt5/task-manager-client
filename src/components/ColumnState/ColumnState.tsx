import { useDrop } from 'react-dnd'
import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'
import { useContext, useEffect } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { useParams } from 'react-router-dom'
import { ITicketData } from '../../types/Ticket.type'

const ColumnState: React.FC<IState> = (state) => {
  const { projectId } = useParams()
  const { ticketData, setTicketData, loadTicket } = useContext(TicketContext) as TicketContextType

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'Ticket',
    drop: (ticket: ITicketData) => addItemToSection(ticket),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  const addItemToSection = (ticketToAdd: ITicketData) => {
    setTicketData(prev => {

      const updateTicket = prev?.map(ticket => {
        if (ticket._id === ticketToAdd._id) {
          return { ...ticket, state: state }
        }
        return ticket
      })

      return updateTicket || null
    })
  }

  useEffect(() => {
    if (projectId) {
      loadTicket(projectId)
    }
  }, [projectId, loadTicket])

  return (
    <li>
      <article
        ref={drop}
        className='flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]'
      >
        <EachState {...state} />

        <article className={`py-2 overflow-y-scroll rounded ${isOver && 'bg-slate-950'}`}>
          <ul className='flex flex-col gap-2 overflow-y-hidden'>
            {!ticketData
              ? <Loading />
              : ticketData
                .filter((ticket) => ticket.state._id === state._id)
                .map((ticket) => (
                  <EachTicket key={ticket._id} {...ticket} />
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