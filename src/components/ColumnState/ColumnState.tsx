import { IState } from '@/types/State.type'
import EachState from '@/components/EachState/EachState'
import EachTicket from '@/components/EachTicket/EachTicket'
import Loading from '@/components/Loading/Loading'
import { useContext, useState } from 'react'
import { TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { ITicketData } from '@/types/Ticket.type'
import ticketservices from '@/services/ticket.services'
import { useDrop } from 'react-dnd'
import ModalForm from '@/components/ModalForm/ModalForm'
import { MdAdd } from 'react-icons/md'
import NewTicketForm from '@/components/Forms/NewTicketForm'

const ColumnState: React.FC<IState> = (state) => {
  const { ticketData, setTicketData } = useContext(TicketContext) as TicketContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

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

    ticketservices.updateStateTicket(ticketToAdd._id, state._id)
  }

  return (
    <>
      <li>
        <article
          ref={drop}
          className='flex flex-col gap-2 p-2 border border-gray-500 min-w-[15rem] bg-slate-700 dark:bg-zinc-950 rounded max-h-[100%]'
        >
          <EachState {...state} />

          <article className={`py-2 overflow-y-scroll rounded ${isOver && 'bg-slate-950 dark:bg-zinc-700'}`}>
            <ul className='flex flex-col gap-2 overflow-y-hidden'>
              {
                !ticketData
                  ? <Loading />
                  : ticketData
                    .filter((ticket) => ticket.state._id === state._id)
                    .map((ticket) => (
                      <EachTicket key={ticket._id} {...ticket} />
                    ))
              }
            </ul>
          </article>

          <button
            className='flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-gray-900 dark:hover:bg-zinc-800 focus-outline-none '
            onClick={toggleModal}>
            <MdAdd />
            <p >Add Ticket...</p>
          </button>
        </article>
      </li >
      {
        showModal &&
        <ModalForm >
          <NewTicketForm
            data={state}
            onCancel={toggleModal}
          />
        </ModalForm >
      }

    </>

  )
}

export default ColumnState