import { useState } from 'react'
import { ITicketData } from '@/types/Ticket.type'
import { EditedContent } from '@/contexts/ticket.context'

interface ChangeDetails {
  data: ITicketData
  entityId: string
  updateEntity: (entityId: string) => void
  updateEntityDetails: (ticketID: string, editedContent: EditedContent) => Promise<void>
}

const ChangeDetails: React.FC<ChangeDetails> = ({ data: { _id: ticketID, description }, entityId, updateEntityDetails, updateEntity }) => {

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState<EditedContent>({
    description: description,
  })
  const handlerEditClick = () => {
    setEditing(!isEditing)
  }
  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedContent({
      ...editedContent,
      description: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await updateEntityDetails(ticketID, editedContent)
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
          ? <article
            className='p-2 text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
            <p onClick={handlerEditClick}>{description}</p>
          </article>
          :
          <form
            onSubmit={todoSubmithandler}
          >
            <textarea
              value={editedContent.description}
              onChange={handlerInputChange}
              autoFocus
              className='p-2 mb-1 text-base border-none max-h-40 input-standard'
              placeholder={description}
            />

            <section className='flex items-center justify-end w-full gap-3'>
              <button
                className='btn-cancel'
                onClick={handlerEditClick}>
                Cancel
              </button>
              <button
                type='submit'
                className='btn-add '
              >
                Save Description
              </button>
            </section>
          </form>

      }
    </>
  )
}

export default ChangeDetails