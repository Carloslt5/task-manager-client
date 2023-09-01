import { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

interface ModalFormProps {
  children: ReactNode
  toggleModal: () => void
}

const ModalForm: React.FC<ModalFormProps> = ({ children, toggleModal }) => {
  return (
    < div className='fixed inset-0 top-0 left-0 right-0 z-10 flex items-center justify-center max-w-full max-h-full p-2 overflow-x-hidden overflow-y-auto bg-opacity-50 bg-cyan-950'>
      <div
        id='containerForm'
        className=' flex flex-col  min-w-[90%] md:min-w-[50%] gap-2 p-4 text-white bg-gray-800 border rounded h-3/4'>
        <div className='flex justify-between'>
          <h1 className='text-2xl text-white '>Insert new project</h1>
          <button
            className='flex items-center justify-center p-2 border border-transparent rounded hover:border hover:border-red-500 hover:bg-gray-800 hover:text-red-500'
            onClick={toggleModal}>
            <MdClose />
          </button>
        </div>
        <hr className='mb-4' />

        {children}

      </div>
    </div>
  )
}

export default ModalForm