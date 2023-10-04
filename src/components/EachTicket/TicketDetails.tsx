import { MdClose } from 'react-icons/md'
import { ITicketData } from '../../types/Ticket.type'
import { getPriorityColor } from '../../const/Ticket-Priority'
import AddNewTodo from '../AddNewTodo/AddNewTodo'
import TicketTodoList from '../TicketTodoList/TicketTodoList'
import { useContext, useState } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import ModalForm from '../ModalForm/ModalForm'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

interface TicketDetailsProps {
  ticketDetails: ITicketData
  toggleModal: () => void
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ toggleModal, ticketDetails }) => {
  const { deleteTicket } = useContext(TicketContext) as TicketContextType

  const { _id: ticketID, title, description, priority, project } = ticketDetails

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  const handleDeleteTicket = () => {
    deleteTicket(ticketID, project._id)
  }

  const priorityColor = getPriorityColor(priority)

  return (
    <>
      <div className='max-h-full modal-form'>
        <section>
          <header className='flex justify-between pb-3 mb-2 border-b'>
            <h1 className='text-2xl text-white '>{title}</h1>
            <button
              className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
              onClick={toggleModal}
            >
              <MdClose />
            </button>
          </header>
          <section className='flex flex-col items-stretch gap-2'>
            <article className='flex items-center w-full gap-2 py-1 text-sm'>
              <p>Priority:</p>
              <section className={`${priorityColor} h-4 w-4 rounded-full`} />
              <p>{priority}</p>
            </article>
            <article className='p-2 text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
              <p>{description}</p>
            </article>
          </section>
        </section>

        <header className='pb-3 text-xl border-b'>
          <h2 >Bullet Points</h2>
        </header>

        <AddNewTodo
          {...ticketDetails}
        />
        <TicketTodoList
          {...ticketDetails}
        />
        <section className='flex items-center justify-end w-full gap-3'>
          <button
            onClick={toggleDeleteModal}
            className='p-2 font-bold bg-red-500 rounded hover:bg-red-700'>
            <span>Delete Ticket</span>
          </button>
          {/* <button
          // onClick={handleDeleteTicket}
          className='btn-form'>
          <span>Save Ticket</span>
        </button> */}
        </section>
      </div>

      {showDeleteModal && (
        <ModalForm>
          <ConfirmationModal
            title='Confirm Delete'
            message='Do you want to delete TICKET and ALL TASKS'
            onConfirm={handleDeleteTicket}
            onCancel={toggleDeleteModal}
          />
        </ModalForm>
      )
      }

    </>
  )
}

export default TicketDetails