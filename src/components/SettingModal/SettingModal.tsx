import React, { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import ModalForm from '../ModalForm/ModalForm'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

interface SettingModalProps {
  textData: string
  deleteEntity: () => void
}

const SettingModal: React.FC<SettingModalProps> = ({ textData, deleteEntity }) => {

  const [settingModal, setSettingModal] = useState(false)
  const toggleSettingModal = () => setSettingModal(!settingModal)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  return (
    <div className='relative'>
      <button
        className='p-6 edit-title'
        onClick={toggleSettingModal}
      >
        <span><MdSettings /></span>
      </button>
      {
        settingModal &&
        <div
          className='absolute right-0 w-32 py-2 mt-1 rounded dark:bg-zinc-800 top-16 dark:text-slate-100 '
          onClick={toggleSettingModal}
        >
          <ul className='flex flex-col items-stretch w-full justify-stretch'>
            <li className='p-2 text-center hover:text-red-500'
              onClick={toggleDeleteModal}
            >
              {textData}
            </li>
          </ul>
        </div>
      }
      {
        showDeleteModal &&
        <ModalForm>
          <ConfirmationModal
            modalTitle='Confirm Delete'
            message='Are you SURE you want to DELETE ALL PROJECT?'
            onConfirm={deleteEntity}
            onCancel={toggleDeleteModal}
          />
        </ModalForm>
      }
    </div>
  )
}

export default SettingModal