import { useParams } from 'react-router-dom'
import projectservices from '../../services/project.services'
import { useCallback, useEffect, useState } from 'react'
import { ProjectData } from '../../types/Project.type'
import { MdPostAdd, MdClose } from 'react-icons/md'
import stateservices from '../../services/state.services'
import ticketservices from '../../services/ticket.services'
import { ITicketData } from '../../types/Ticket.type'
import Loading from '../../components/Loading/Loading'

export interface IStateData {
  id: string
  stateName: string
  ticket: ITicketData[]
}

const ProjectPage = () => {
  const { projectId } = useParams()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })

  const [ticketData, setTicketData] = useState<ITicketData[] | null>(null)
  const [newTicket, setNewTicket] = useState({
    title: ''
  })

  const [showInput, setShowInput] = useState(false)

  const loadProject = useCallback(async () => {
    try {
      if (projectId) {
        const { data } = await projectservices.getOneProject(projectId)
        // console.log(data)
        setProjectData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [projectId])

  const loadTicket = useCallback(async () => {
    try {
      if (projectId) {
        const { data } = await ticketservices.getTicket(projectId)
        setTicketData(data)
      }
    } catch (error) {
      console.log(error)
    }

  }, [projectId])

  useEffect(() => {
    loadProject()
    loadTicket()
  }, [loadProject, loadTicket])

  if (projectData === null) {
    return <Loading />
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewStateData({ ...newStateData, [name]: value })
  }

  const ticketInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewTicket({ ...newTicket, [name]: value })
  }

  const todoSubmithandler = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      if (projectId) {
        await stateservices.createState(projectId, newStateData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addTicket = async (event: React.FormEvent, state: IStateData): Promise<void> => {
    event.preventDefault()
    try {
      if (projectId && newTicket) {
        const { data } = await ticketservices.createdTicket(projectId, state, newTicket)
        console.log('datos del ticket creado en el front createdTicket', data)
        setNewTicket({ title: '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleInput = () => {
    setShowInput(!showInput)
  }

  const { title, description } = projectData

  return (
    <>
      <div className='p-4 text-gray-700 bg-green-200 border rounded'>
        <h1 className='mb-2 text-3xl underline'>{title}</h1>
        <p className='text-sm'>{description}</p>

        <div className='mt-2 bg-orange-200'>
          <ul className='flex flex-wrap py-2 bg-orange-200'>
            {projectData.state.map((state, idx) => (
              <li key={idx} className='p-2 border rounded w-52 bg-slate-400'>
                {state.stateName}
                {!ticketData
                  ? <h1>Loading...</h1>
                  : ticketData.filter(ticket => ticket.state.stateName === state.stateName).map((ticket, idx) => (
                    <h1 key={idx}>{ticket.title}</h1>
                  ))}

                <form
                  onSubmit={(event) => addTicket(event, state)}
                  className='p-4 border'>
                  <input
                    className='block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white'
                    type='text'
                    placeholder='Add ticket..'
                    name='title'
                    // value={newTicket.title}
                    onChange={ticketInputChange}
                  />
                  <div className='flex items-center gap-2 mt-2 listAdd-Controls'>
                    <button
                      className='flex gap-2 px-4 py-2 border'
                      type='submit'>
                      <MdPostAdd />
                      <span>Add Ticket...</span>
                    </button>
                  </div>
                </form>
              </li>
            ))}

          </ul>
          {!showInput
            ? <button
              className='flex items-center gap-2 px-4 py-2 border rounded h-fit bg-slate-500'
              onClick={toggleInput}>
              <MdPostAdd />
              <span>Add State</span>
            </button>
            : <form
              className='p-4 border'
              onSubmit={todoSubmithandler}
            >
              <input
                className='px-2 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
                type='text'
                name='stateName'
                placeholder='Insert State...'
                onChange={handlerInputChange}
              />
              <div className='flex items-center gap-2 mt-2 listAdd-Controls'>
                <button
                  className='flex gap-2 px-4 py-2 border'
                  type='submit'>
                  <MdPostAdd />
                  <span>Add State</span>
                </button>
                <button onClick={toggleInput}>
                  <MdClose />
                </button>
              </div>
            </form>
          }
        </div>
      </div >

    </>

  )

}

export default ProjectPage