import { MdClose } from 'react-icons/md'
import { useContext, useState } from 'react'
import ticketservices from '../../services/ticket.services'
import { useParams } from 'react-router-dom'
import { IState } from '../../types/State.type'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { TICKET_PRIORITY } from '../../const/Ticket-Priority'

interface NewTicketFormProps extends IState {
  toggleModal: () => void
}
const NewTicketForm: React.FC<NewTicketFormProps> = ({ toggleModal, _id: stateID }) => {
  const { projectId } = useParams()
  const { loadTicket } = useContext(TicketContext) as TicketContextType

  const [newTicketData, setNewTicketData] = useState({
    title: '',
    description: '',
    priority: ''
  })

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setNewTicketData((prevTicket) => ({ ...prevTicket, [name]: value, }))
  }

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      console.log(newTicketData)
      if (projectId) {
        ticketservices.createdTicket(projectId, stateID, newTicketData)
        setNewTicketData({ title: '', description: '', priority: '' })
        loadTicket(projectId)
        toggleModal()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const { title, description, priority } = newTicketData

  return (
    <div
      className='modal-form'>
      <div className='flex justify-between'>
        <h1 className='text-2xl text-white '>New Ticket</h1>
        <button
          className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
          onClick={toggleModal}
        >
          <MdClose />
        </button>
      </div>
      <hr className='mb-4' />
      <form
        className='flex flex-col gap-2 text-white'
        onSubmit={handlerSubmit}
      >
        <input
          autoFocus
          className='input-primary'
          type='text'
          name='title'
          value={title}
          placeholder='Insert title...'
          onChange={handlerInputChange}
        />
        <textarea
          className='input-primary min-h-[50px] max-h-32'
          name='description'
          value={description}
          placeholder='Insert description...'
          onChange={handlerInputChange}
        />
        <ul className='flex items-center gap-2'>
          <p>Priority:</p>
          {TICKET_PRIORITY.map((el, index) => (
            <li key={index}>
              <input
                id={`checkbox${index}`}
                type='radio'
                name='priority'
                value={el}
                checked={priority === el}
                onChange={handlerInputChange}
              />
              <label
                className='inline-block pl-[0.15rem] hover:cursor-pointer'
                htmlFor={`checkbox${index}`}>
                {el}
              </label>
            </li>
          ))}
        </ul>
        <div className='flex justify-between gap-2 mt-4 items-strech'>
          <button
            className='flex items-center gap-2 btn-add'
          >
            <span>Create Ticket</span>
          </button>
        </div>
      </form >
    </div>

  )
}

export default NewTicketForm