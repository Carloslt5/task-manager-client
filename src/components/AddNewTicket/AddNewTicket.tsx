import { useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import ticketservices from '../../services/ticket.services'
import { useParams } from 'react-router-dom'
import { IState } from '../../types/State.type'

const AddNewTicket: React.FC<IState> = ({ _id: stateId }) => {
  const { projectId } = useParams()
  const [newTicket, setNewTicket] = useState({
    title: ''
  })

  const ticketInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTicket({ ...newTicket, [name]: value })
  }

  const addTicket = async (event: React.FormEvent, stateId: string): Promise<void> => {
    event.preventDefault()
    try {
      if (projectId && newTicket) {
        await ticketservices.createdTicket(projectId, stateId, newTicket)
        setNewTicket({ title: '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <form
      onSubmit={(event) => addTicket(event, stateId)}
      className='p-4 border'>
      <input
        className='block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white'
        type='text'
        placeholder='Add ticket..'
        name='title'
        // value={newTicket.title}
        onChange={ticketInputChange}
      />
      <div className='flex items-center gap-2 mt-2 listAdd-Controls'>
        <button
          className='flex gap-2 px-4 py-2 border'
          type='submit'>
          <MdPostAdd />
          <span>Add Ticket...</span>
        </button>
      </div>
    </form>

  )
}

export default AddNewTicket