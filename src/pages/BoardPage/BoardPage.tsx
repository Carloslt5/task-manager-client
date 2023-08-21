// import CanvasCards from '../../components/CanvasCards/CanvasCards'
import kanbanservices from '../../services/kanban.services'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
// import NewTodo from '../../components/NewTodo/NewTodo'

const BoardPage = () => {
  const { boardId } = useParams()
  const [kanbanCardsData, setKanbanCardsData] = useState([])
  // const [addCard, setAddCard] = useState()

  const [newKanbanCard, setNewKanbanCard] = useState({
    title: '',
  })
  const { title } = newKanbanCard

  const loadkanbanCards = async () => {
    try {
      if (boardId) {
        const { data } = await kanbanservices.getKanbanCards(boardId)
        setKanbanCardsData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadkanbanCards()
  }, [])

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewKanbanCard({ ...newKanbanCard, [name]: value })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (boardId) {
        const { data } = await kanbanservices.createKanbanCards(boardId, newKanbanCard)
        setNewKanbanCard(data)
        setNewKanbanCard({ title: '' })
        loadkanbanCards()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='shadow appearance-none border rounded w-100 m-4 py-2 px-2 text-gray-700 leading-tight'>
      <div className='cardTitle mb-2 border-b flex justify-between items-center'>
        <h1 className=' text-2xl'>Board</h1>

      </div>

      <div>
        <ul className='flex flex-wrap gap-2'>
          {!kanbanCardsData
            ? <h1>Loading...</h1>
            : kanbanCardsData.map((card, idx) => (
              <li key={idx} className='shadow-md p-2 rounded'>
                <h1>{card.title}</h1>
                <hr />
                <button className='mt-3'>Add task</button>
              </li>
            ))
          }
        </ul>
      </div>

      <ul>
        <li className='border p-2 my-3 w-60'>
          <form
            onSubmit={todoSubmithandler}
          >
            <input
              className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              name='title'
              value={title}
              placeholder='Insert Task...'
              onChange={handlerInputChange}
            />
            <button
              className='mt-4 border p-4 flex gap-2'
              type='submit'>
              <MdPostAdd />
              <span>Add Card</span>
            </button>
          </form>
        </li>
      </ul>

    </div>
  )
}

export default BoardPage