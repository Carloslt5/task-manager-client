import { useContext, useState } from 'react'
import { MdOutlineClose, MdAdd, MdOutlineCheck } from 'react-icons/md'
import ticketservices from '../../services/ticket.services'
import { useParams } from 'react-router-dom'
import { IState } from '../../types/State.type'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'

const AddNewTicket: React.FC<IState> = ({ _id: stateId }) => {
  const { projectId } = useParams()

  const [showInput, setShowInput] = useState(false)
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const { loadTicket } = useContext(TicketContext) as TicketContextType
  const [newTicket, setNewTicket] = useState({
    title: ''
  })

  const toggleInput = () => {
    setShowInput(!showInput)
  }

  const ticketInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTicket({ ...newTicket, [name]: value })
  }

  const addTicket = async (event: React.FormEvent, stateId: string): Promise<void> => {
    event.preventDefault()
    try {
      if (projectId && newTicket) {
        await ticketservices.createdTicket(projectId, stateId, newTicket)
        loadTicket(projectId)
        setNewTicket({ title: '' })
        toggleInput()
        loadProject(projectId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!showInput
        ? <button
          className='flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-gray-900 dark:hover:bg-zinc-800 focus-outline-none '
          onClick={toggleInput}>
          <MdAdd />
          <p >Add Ticket...</p>
        </button>
        : <form
          onSubmit={(event) => addTicket(event, stateId)}
          className=''>
          <input
            autoFocus
            onBlur={toggleInput}
            className='w-full input-primary'
            type='text'
            placeholder='Add ticket..'
            name='title'
            value={newTicket.title}
            onChange={ticketInputChange}
          />
          <div className='flex items-stretch justify-end gap-2 mt-2'>
            <button
              className='p-2 rounded hover:bg-gray-900 hover:text-emerald-500 dark:hover:bg-zinc-800'
            >
              <span className='flex items-center gap-1'><MdOutlineCheck />Add ticket</span>
            </button>
            <button
              className='p-2 rounded hover:bg-gray-900 dark:hover:bg-zinc-800 hover:text-red-500'
              onClick={toggleInput}
            >
              <span><MdOutlineClose /> </span>
            </button>
          </div>
        </form >

      }

    </>

  )
}

export default AddNewTicket

