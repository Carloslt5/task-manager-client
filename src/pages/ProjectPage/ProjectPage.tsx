import { useParams } from 'react-router-dom'
import { useCallback, useContext, useEffect, useState } from 'react'
import { MdPostAdd, MdClose } from 'react-icons/md'
import stateservices from '../../services/state.services'
import ticketservices from '../../services/ticket.services'
import { ITicketData } from '../../types/Ticket.type'
import Loading from '../../components/Loading/Loading'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import AddNewTicket from '../../components/AddNewTicket/AddNewTicket'
import EachState from '../../components/EachState/EachState'

const ProjectPage = () => {
  const { projectId } = useParams()
  const { projectData, loadProject } = useContext(ProjectContext) as ProjectContextType

  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })

  const [ticketData, setTicketData] = useState<ITicketData[] | null>(null)

  const [showInput, setShowInput] = useState(false)

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
    if (projectId) {
      loadProject(projectId)
      loadTicket()
    }
  }, [projectId, loadProject, loadTicket])

  if (projectData === null) {
    return <Loading />
  }

  const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewStateData({ ...newStateData, [name]: value })
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

  const toggleInput = () => {
    setShowInput(!showInput)
  }

  const { title } = projectData

  return (
    <div className='container max-w-6xl mx-auto'>
      <h1 className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200 '>{title}</h1>
      <div className='mt-2 overflow-y-auto'>
        <ul className='flex flex-row gap-2 pb-4 mb-2 overflow-y-scroll text-white'>
          {projectData.state.map((state, idx) => (
            <li key={idx} className='flex flex-col gap-2 justify-between p-2 border min-w-[13rem] bg-slate-800 rounded'>
              <article className='stateContent'>
                <EachState {...state} />
                <ul className='flex flex-col gap-2 py-4 mb-2 stateTickets'>
                  {!ticketData
                    ? <Loading />
                    : ticketData.filter(ticket => ticket.state?.stateName === state.stateName).map((ticket, idx) => (
                      <li
                        className='p-1 bg-gray-700 rounded cursor-pointer hover:bg-gray-900'
                        key={idx}>
                        {ticket.title}
                      </li>
                    ))
                  }
                </ul>
              </article>
              < AddNewTicket {...state} />
            </li >
          ))}

        </ul>

        {!showInput
          ? <form className='text-white bg-gray-800 border rounded h-fit hover:bg-gradient-to-b from-emerald-500 to-emerald-900 w-fit'>
            <button
              className='flex items-center gap-2 px-4 py-2 h-fit'
              onClick={toggleInput}>
              <MdPostAdd />
              <span>Add State</span>
            </button>
          </form>
          : <form
            className='flex flex-col gap-2 p-4 text-white bg-gray-800 border rounded h-fit w-fit'
            onSubmit={todoSubmithandler}
          >
            <input
              className='px-2 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              type='text'
              name='stateName'
              placeholder='Insert State...'
              onChange={handlerInputChange}
            />
            <div className='flex justify-between gap-2 mt-2 items-strech'>
              <button
                className='flex items-center gap-2 px-4 py-2 bg-gray-800 border rounded flex-2 hover:border-transparent hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
              >
                <MdPostAdd />
                <span>Add State</span>
              </button>
              <button
                className='flex items-center justify-center flex-1 rounded hover:border hover:border-red-500 hover:bg-gray-900'
                onClick={toggleInput}>
                <MdClose />
              </button>
            </div>
          </form>
        }
      </div >

    </div >

  )

}

export default ProjectPage