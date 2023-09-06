import { useContext } from 'react'
import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'

const ColumnState: React.FC<IState> = (state) => {
  const { ticketData } = useContext(TicketContext) as TicketContextType

  return (
    <li>
      <article
        className='flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]'
      >
        <EachState {...state} />

        <article className='overflow-y-scroll'>
          <ul className='flex flex-col gap-2 overflow-y-hidden'>
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