import { MdClose, MdOutlineDelete } from 'react-icons/md'
import stateservices from '../../services/state.services'

interface DeleteStateModalProprs {
  _id: string
  toggleModal: () => void
}

const DeleteStateModal: React.FC<DeleteStateModalProprs> = ({ toggleModal, _id: stateId }) => {

  const DeleteStateAndTask = async () => {
    try {
      await stateservices.deleteState(stateId)
      toggleModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      id='containerForm'
      className='modal-form'>
      <div className='flex justify-end'>
        <button
          className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
          onClick={toggleModal}
        >
          <MdClose />
        </button>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 px-4 mb-6'>
        <span className='text-7xl'><MdOutlineDelete /></span>
        <h1 className='text-2xl text-white '>Are you sure to delete the state and all tasks?</h1>
        <div className='flex items-center justify-center gap-4'>
          <button
            onClick={toggleModal}
            type='button'
            className='px-3 py-2 text-sm text-gray-500 bg-white rounded hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>
            No, cancel
          </button>
          <button
            onClick={DeleteStateAndTask}
            type='submit'
            className='px-3 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'>
            Yes, I'm sure
          </button>
        </div>
      </div>

    </div>
  )
}

export default DeleteStateModal