import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { AuthContextType } from '../../contexts/Types/AuthContext.types'
import { Link } from 'react-router-dom'
import { MdPostAdd } from 'react-icons/md'
import kanbanservices from '../../services/kanban.services'
import { IKanbanBoardData } from '../../types/KanbanBoard.type'
import EachBoard from '../../components/EachBoard/EachBoard'
import Loading from '../../components/Loading/Loading'
import ModalForm from '../../components/ModalForm/ModalForm'
import BoardForm from '../../components/Forms/BoardForm'

const BoardPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData[] | []>([])

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  const loadBoard = async () => {
    try {
      const { data } = await kanbanservices.getKanbanBoard()
      setKanbanBoardData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadBoard()
  }, [])

  return (
    <div className='container max-w-6xl mx-auto'>
      <h1
        className='py-2 mb-4 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200'>
        My Boards
      </h1>

      <button
        className='flex items-center gap-2 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add Board</span>
      </button>

      <section className='grid w-full gap-2 mb-4 overflow-y-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[70vh]'>
        {!kanbanBoardData
          ? <Loading />
          : kanbanBoardData.map((kanbanBoard, idx) => (
            <Link to={`/${user?._id}/${kanbanBoard._id}`} key={idx}>
              <EachBoard {...kanbanBoard} />
            </Link>)
          )}
      </section >

      {
        showModal &&
        <ModalForm >
          <BoardForm
            loadBoard={loadBoard}
            onCancel={toggleModal}
          />
        </ModalForm>
      }

    </div>
  )
}

export default BoardPage