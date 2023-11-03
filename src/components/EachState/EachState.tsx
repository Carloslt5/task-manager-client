import { useState } from 'react'
import { IState } from '@/types/State.type'
import { MdDeleteForever } from 'react-icons/md'
import ModalForm from '@/components/ModalForm/ModalForm'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import { useModalHook } from '../ModalForm/Modal-Hook'
import { useHandleState } from './useHandleState-Hook'

type EachStateProps = {
  stateData: IState
}

const EachState: React.FC<EachStateProps> = ({ stateData }) => {

  const {
    register,
    handleSubmit,
    submitHandler,
    handlerDeleteStateAndTicket
  } = useHandleState(stateData)

  const { showModal, toggleModal } = useModalHook()

  const [isEditing, setEditing] = useState(false)
  const handlerEditClick = () => setEditing(!isEditing)

  const { stateName } = stateData

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