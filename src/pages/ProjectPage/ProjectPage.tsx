import { useParams } from 'react-router-dom'
import projectservices from '../../services/project.services'
import { useCallback, useEffect, useState } from 'react'
import { ProjectData } from '../../types/Project.type'
import { MdPostAdd, MdClose } from 'react-icons/md'
import stateservices from '../../services/state.services'
import ticketservices from '../../services/ticket.services'
import { ITicketData } from '../../types/Ticket.type'

export interface IStateData {
  id: string
  stateName: string
  ticket: string[]
}

const ProjectPage = () => {
  const { projectId } = useParams()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [newStateData, setNewStateData] = useState({
    stateName: '',
  })

  const [ticketData, setTicketData] = useState<ITicketData[] | null>(null)

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
    return <h1>Loading</h1>
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

  const { title, description } = projectData

  return (
    <>
      <div className='text-gray-700 bg-green-200 p-4 border rounded'>
        <h1 className='text-3xl mb-2 underline'>{title}</h1>
        <p className='text-sm'>{description}</p>

        <div className='bg-orange-200 mt-2 overflow-x-scroll'>
          <ul className='flex flex-wrap py-2 gap-2 justify-between '>
            {projectData.state.map((state, idx) => (
              <li key={idx} className='h-60 w-52 border p-2 bg-slate-400 rounded'>
                {state.stateName}
                {!ticketData
                  ? <h1>Loading...</h1>
                  : ticketData.filter(ticket => ticket.state.stateName === state.stateName).map((ticket, idx) => (
                    <h1 key={idx}>{ticket.title}</h1>
                  ))
                }
              </li>

            ))}

          </ul>
          {!showInput
            ? <button className='border px-4 py-2 flex gap-2 items-center h-fit rounded bg-slate-500' onClick={toggleInput}>
              <MdPostAdd />
              <span>Add State</span>
            </button>
            : <form className='border p-4'
              onSubmit={todoSubmithandler}
            >
              <input
                className='shadow appearance-none border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='stateName'
                placeholder='Insert State...'
                onChange={handlerInputChange}
              />
              <div className='listAdd-Controls flex gap-2 items-center mt-2'>
                <button
                  className='border px-4 py-2 flex gap-2'
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