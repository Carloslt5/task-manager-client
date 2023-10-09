import { useState } from 'react'
import { ITicketData } from '../../types/Ticket.type'

export interface EditedContentDetails {
  description: string
}

interface ChangeDetails {
  data: ITicketData
  entityId: string
  updateEntity: (entityId: string) => void
  updateEntityDetails: (ticketID: string, editedContent: EditedContentDetails) => Promise<void>
}

const ChangeDetails: React.FC<ChangeDetails> = ({ data: { _id: ticketID, description }, entityId, updateEntityDetails, updateEntity }) => {

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    description: description,
  })
  const handlerEditClick = () => {
    setEditing(!isEditing)
  }
  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      description: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await updateEntityDetails(ticketID, editedContent)
      setEditedContent({ description: description })
      setEditing(false)
      updateEntity(entityId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        !isEditing
          ?
          <article className='p-2 text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
            <p onClick={handlerEditClick}>{description}</p>
          </article>
          :
          <form
            onSubmit={todoSubmithandler} >
            <input
              type='text'
              value={editedContent.description}
              onChange={handlerInputChange}
              onBlur={handlerEditClick}
              autoFocus
              className='p-2 text-base input-standard'
            />
          </form>
      }
    </>
  )
}

export default ChangeDetails