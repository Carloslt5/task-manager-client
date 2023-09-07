import { IState } from '../../types/State.type'
import AddNewTicket from '../AddNewTicket/AddNewTicket'
import EachState from '../EachState/EachState'
import EachTicket from '../EachTicket/EachTicket'
import Loading from '../Loading/Loading'

const ColumnState: React.FC<IState> = (state) => {

  return (
    <li>
      <article
        className='flex flex-col gap-2 p-2 border min-w-[15rem] bg-slate-800 rounded max-h-[100%]'
      >
        <EachState {...state} />

        <article className='py-2 overflow-y-scroll rounded '>
          <ul
            className='flex flex-col gap-2 overflow-y-hidden'>
            {!state.ticket
              ? <Loading />
              : state.ticket?.map((ticket, idx) => (
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