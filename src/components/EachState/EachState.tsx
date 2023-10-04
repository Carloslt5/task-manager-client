import { useContext, useState } from 'react'
import { IState } from '../../types/State.type'
import stateservices from '../../services/state.services'
import { useParams } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import ModalForm from '../ModalForm/ModalForm'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

const EachState: React.FC<IState> = ({ _id, stateName }) => {

  const { projectId } = useParams()
  const { loadProject } = useContext(ProjectContext) as ProjectContextType

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    stateName: '',
  })

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  const handlerEditClick = () => {
    setEditing(!isEditing)
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      stateName: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (projectId) {
        await stateservices.editState({ _id, ...editedContent })
        setEditedContent({ stateName: '' })
        setEditing(false)
        loadProject(projectId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteStateAndTask = async () => {
    try {
      await stateservices.deleteState(_id)
      toggleModal()
      loadProject(projectId!)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        {
          !isEditing
            ? <h2 onClick={handlerEditClick} className='px-1 font-bold uppercase 2xl'>{stateName}</h2>
            :
            <form
              onSubmit={todoSubmithandler}
              className='flex w-full'>
              <input
                autoFocus
                onBlur={handlerEditClick}
                type='text'
                name='title'
                value={editedContent.stateName}
                onChange={handlerInputChange}
                className='w-full px-1 font-extrabold text-gray-900 uppercase rounded outline-none bg-gray-50dark:focus:ring-2 dark:focus:ring-teal-500 focus:ring-2 focus:ring-blue-500'
                placeholder={stateName}
                required />
            </form>
        }
        <button
          onClick={toggleModal}
          className='hover:text-red-500 '>
          <MdClose />
        </button>
      </div >
      <hr />

      {/* {
        showModal &&
        <ModalForm >
          <DeleteStateModal toggleModal={toggleModal} _id={_id} />
        </ModalForm>
      } */}

      {
        showModal &&
        <ModalForm >
          <ConfirmationModal
            title='Confirm Delete State'
            message='Are you sure to delete the TICKET and ALL TO DO?'
            onConfirm={deleteStateAndTask}
            onCancel={toggleModal}
          />
        </ModalForm>
      }
    </>

  )
}

export default EachState