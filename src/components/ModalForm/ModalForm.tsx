import React from 'react'
import AddNewState from '../AddNewState/AddNewState'

interface ModalFormProps {
  toggleModal: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ toggleModal }) => {
  return (
    < div
      id='inputModalState'
      className='fixed inset-0 top-0 left-0 right-0 z-10 flex items-center justify-center max-w-full max-h-full p-2 overflow-x-hidden overflow-y-auto bg-opacity-50 bg-cyan-950'
    >
      <AddNewState toggleModal={toggleModal} />
    </div>
  )
}

export default ModalForm