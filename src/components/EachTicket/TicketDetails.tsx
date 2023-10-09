import { ITicketData } from '../../types/Ticket.type'
import { getPriorityColor } from '../../const/Ticket-Priority'
import AddNewTodo from '../AddNewTodo/AddNewTodo'
import TicketTodoList from '../TicketTodoList/TicketTodoList'
import { useContext, useState } from 'react'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import ModalForm from '../ModalForm/ModalForm'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import ChangeTitle, { EditedContent } from '../ChangeTitle/ChangeTitle'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import ticketservices from '../../services/ticket.services'
import ChangeDetails, { EditedContentDetails } from '../ChangeDetails/ChangeDetails'

interface TicketDetailsProps {
  ticketDetails: ITicketData
  toggleModal: () => void
}

const priorityOptions = ['Low', 'Medium', 'High']

const TicketDetails: React.FC<TicketDetailsProps> = ({ toggleModal, ticketDetails }) => {
  const { projectId } = useParams()

  const { loadTicket, deleteTicket } = useContext(TicketContext) as TicketContextType

  const { _id: ticketID, priority, project } = ticketDetails

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  const handleDeleteTicket = () => {
    deleteTicket(ticketID, project._id)
  }

  const [selectedPriority, setSelectedPriority] = useState(priority)
  const handlePriorityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(event.target.value)
    try {
      console.log('cambiando prioridad')
    } catch (error) {
      console.log(error)
    }
  }

  const updateTickettTitle = async (ticketID: string, editedContent: EditedContent) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, editedContent)
    } catch (error) {
      console.log(error)
    }
  }
  const updateTicketDetails = async (ticketID: string, editedContent: EditedContentDetails) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, editedContent)
    } catch (error) {
      console.log(error)
    }
  }

  const priorityColor = getPriorityColor(priority)

  if (!projectId) {
    return <Loading />
  }

  return (
    <>
      <div className='max-h-full modal-form'>
        <section>
          <header className='flex justify-between gap-2 pb-3 mb-2 border-b'>
            <ChangeTitle
              data={ticketDetails}
              entityId={projectId}
              updateEntityTitle={updateTickettTitle}
              updateEntity={loadTicket}
            />
          </header>
          <section className='flex flex-col items-stretch gap-2'>
            <article className='flex items-center w-full gap-2 py-1 text-sm'>
              <p>Priority:</p>
              <div className={`${priorityColor} h-4 w-4 rounded-full`} />
              <select className='text-slate-500'
                value={selectedPriority}
                onChange={handlePriorityChange}
              >
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </article>
            <ChangeDetails
              data={ticketDetails}
              entityId={projectId}
              updateEntityDetails={updateTicketDetails}
              updateEntity={loadTicket}
            />
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
            className='btn-cancel'
            onClick={toggleModal}
          >
            <span>Cancel</span>
          </button>
          <button
            onClick={toggleDeleteModal}
            className='p-2 font-bold bg-red-500 rounded hover:bg-red-700'>
            <span>Delete Ticket</span>
          </button>

        </section>
      </div>

      {
        showDeleteModal &&
        <ModalForm>
          <ConfirmationModal
            modalTitle='Confirm Delete'
            message='Do you want to delete TICKET and ALL TASKS'
            onConfirm={handleDeleteTicket}
            onCancel={toggleDeleteModal}
          />
        </ModalForm>
      }

    </>
  )
}

export default TicketDetails