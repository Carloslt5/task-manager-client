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
    <>
      <h1 className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200 '>{title}</h1>
      <div className='mt-2 bg-orange-200'>
        <ul className='flex flex-wrap gap-2 text-white bg-slate-800'>
          {projectData.state.map((state, idx) => (
            <li key={idx} className='flex flex-col justify-between p-2 border'>
              <article className='stateContent'>
                <EachState {...state} />
                <ul className='mb-2 stateTickets'>
                  {!ticketData
                    ? <Loading />
                    : ticketData.filter(ticket => ticket.state?.stateName === state.stateName).map((ticket, idx) => (
                      <li key={idx}>{ticket.title}</li>
                    ))
                  }
                </ul>
              </article>
              < AddNewTicket {...state} />
            </li >
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
      </div >

    </>

  )

}

export default ProjectPage