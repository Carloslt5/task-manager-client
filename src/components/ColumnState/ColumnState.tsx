import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'

import { useState } from 'react'

const ColumnState: React.FC<IState> = (state) => {
  const [tickets, setTickets] = useState(state.ticket || [])

  return (
    <li>
      <article
        className='flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]'
      >
        <EachState {...state} />

        <article className='py-2 overflow-y-scroll rounded bg-slate-950'>
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