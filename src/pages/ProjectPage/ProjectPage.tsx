/* eslint-disable react-hooks/exhaustive-deps */
import kanbanservices from '../../services/kanban.services'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { MdArrowDropDownCircle, MdModeEdit } from 'react-icons/md'
import { IKanbanBoardData } from '../../components/Dashboard/Dashboard'

const ProjectPage = () => {
  const { kanbanBoardId } = useParams()
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData | null>(null)

  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState({
    title: '',
  })

  const loadKanbanBoard = useCallback(async () => {
    try {
      if (kanbanBoardId) {
        const { data } = await kanbanservices.getOneKanbanBoard(kanbanBoardId)
        setKanbanBoardData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [kanbanBoardId])

  useEffect(() => {
    loadKanbanBoard()
  }, [loadKanbanBoard])

  const handlerEditClick = () => {
    setEditing(!isEditing)
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent({
      ...editedContent,
      title: event.target.value,
    })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (kanbanBoardId) {
        await kanbanservices.updateKanbanBoard(kanbanBoardId, editedContent)
        setEditedContent({ title: '' })
        loadKanbanBoard()
        setEditing(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const toggleInput = () => {
  //   setShowInput(!showInput)
  // }

  if (!kanbanBoardData) {
    return <h1>Loading...</h1>
  }

  const { title } = kanbanBoardData

  return (
    <div className='shadow appearance-none border rounded w-100 m-4 py-2 px-2 text-gray-700 leading-tight'>
      <div className='cardTitle mb-2 flex justify-between items-center gap-4'>

        {!isEditing
          ? <h1 className='text-2xl p-2 border border-transparent rounded w-full'>{title}</h1>
          :
          <form
            onSubmit={todoSubmithandler}
            className='w-full'>
            <input
              type='text'
              name='title'
              value={editedContent.title}
              onChange={handlerInputChange}
              className='text-2xl p-2 bg-gray-50 border text-gray-900 rounded focus:ring-blue-500 block w-full'
              placeholder={title}
              required />
          </form>
        }

        <div className='board-controls flex gap-2 items-center'>
          <button onClick={handlerEditClick}><MdModeEdit /></button>
        </div>
      </div>

      <div>
        <section className='flex flex-wrap flex-col gap-2'>
          {kanbanBoardData.project.map((project, idx) => (
            <article key={idx} className='flex rounded border p-2 justify-between items-center' >
              <h2>{project.title}</h2>
              <MdArrowDropDownCircle />
            </article>
          ))}
        </section>
      </div>

      {/* <ul>
        <li className='border p-2 my-3 w-80'>
          {!showInput
            ? <button className='border p-4 flex gap-2 w-full items-center' onClick={toggleInput}>
              <MdPostAdd />
              <span>Add Card</span>
            </button>
            : <form onSubmit={todoSubmithandler}>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='title'
                value={title}
                placeholder='Insert Task...'
                onChange={handlerInputChange}
              />
              <div className='listAdd-Controls flex gap-2 items-center mt-2'>
                <button
                  className='border p-4 flex gap-2'
                  type='submit'>
                  <MdPostAdd />
                  <span>Add Card</span>
                </button>
                <button
                  onClick={toggleInput} >
                  <MdClose />
                </button>
              </div>
            </form>
          }
        </li>
      </ul> */}

    </div >
  )
}

export default ProjectPage