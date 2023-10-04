import { useDrag } from 'react-dnd'
import { ITicketData } from '../../types/Ticket.type'
import { MdDeleteForever } from 'react-icons/md'
import { useContext, useState } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { getPriorityColor } from '../../const/Ticket-Priority'
import ModalForm from '../ModalForm/ModalForm'
import TicketDetails from './TicketDetails'

const EachTicket: React.FC<ITicketData> = ({ _id, title, state, description, completed, priority, project, owner, todos }) => {
  const { deleteTicket } = useContext(TicketContext) as TicketContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
      description: description,
      state: state,
      completed: completed,
      priority: priority,
      project: project,
      todos: todos,
      owner: owner
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const priorityColor = getPriorityColor(priority)

  const ticketDetails = {
    _id,
    title,
    state,
    description,
    completed,
    priority,
    project,
    todos,
    owner,
  }

  return (
    <>
      <li
        ref={drag}
        className={`flex justify-start items-stretch gap-2 bg-gray-500 overflow-hidden rounded cursor-pointer hover:bg-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${isDragging && 'opacity-30'} `}
        onClick={toggleModal}
      >
        <div className={`${priorityColor} w-2`} />
        <article className='flex items-center justify-between w-full py-1'>
          <p>{title}</p>
          <span
            onClick={() => deleteTicket(_id, project._id)}
            className='rounded hover:text-red-500'>
            <MdDeleteForever />
          </span>
        </article>
      </li >

      {
        showModal &&
        <ModalForm >
          <TicketDetails
            ticketDetails={ticketDetails}
            toggleModal={toggleModal} />
        </ModalForm >
      }
    </>
  )
}

export default EachTicket