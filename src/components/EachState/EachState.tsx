import { useContext, useState } from 'react'
import { IState } from '@/types/State.type'
import stateservices from '@/services/state.services'
import { useParams } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { ProjectContext, ProjectContextType } from '@/contexts/project.context'
import ModalForm from '@/components/ModalForm/ModalForm'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import { EditedContent, TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { useForm } from 'react-hook-form'

type EachStateProps = {
  stateData: IState
}

const EachState: React.FC<EachStateProps> = ({ stateData }) => {
  const { _id, stateName } = stateData
  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType
  const { ticketData, deleteStateAndTicket } = useContext(TicketContext) as TicketContextType

  const [isEditing, setEditing] = useState(false)

  const stateForm = useForm({
    defaultValues: {
      _id: _id,
      stateName: stateName
    }
  })
  const { register, handleSubmit } = stateForm

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)
  const handlerEditClick = () => setEditing(!isEditing)

  const submitHandler = async (stateFormData: EditedContent): Promise<void> => {
    try {
      if (projectId) {
        await stateservices.editState(stateFormData)
        setEditing(false)
        loadProject(projectId)
      }
    } catch (error) {
      //error server Tosty
      console.log(error)
    }
  }

  const handlerDeleteStateAndTicket = () => {
    if (ticketData) {
      ticketData.map(ticket => {
        deleteStateAndTicket(_id, ticket._id)
      })
    }
  }

  return (
    <>
      <div className='flex items-center justify-between gap-2 '>
        {
          !isEditing
            ? <h2 className='w-full px-1 font-bold 2xl' onClick={handlerEditClick} >{stateName}</h2>
            :
            <form
              className='w-full'
              onSubmit={handleSubmit(submitHandler)}
            >
              <input
                autoFocus
                type='text'
                className='w-full px-1 text-gray-900 rounded outline-none bg-gray-50 dark:focus:ring-2 dark:focus:ring-teal-500 focus:ring-2 focus:ring-blue-500'
                placeholder={stateName}
                {...register('stateName')}
                onBlur={handlerEditClick}
                required />
            </form>
        }

        <button
          onClick={toggleModal}
          className='hover:text-red-500 '>
          <MdDeleteForever />
        </button>
      </div >
      <hr />

      {
        showModal &&
        <ModalForm >
          <ConfirmationModal
            modalTitle='Confirm Delete State'
            message='Are you sure to delete the TICKET and ALL TO DO?'
            onConfirm={handlerDeleteStateAndTicket}
            onCancel={toggleModal}
          />
        </ModalForm>
      }
    </>

  )
}

export default EachState