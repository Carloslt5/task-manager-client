import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MdPostAdd } from 'react-icons/md'
import Loading from '../../components/Loading/Loading'
import { ProjectContext, ProjectContextType } from '../../contexts/project.context'
import AddNewTicket from '../../components/AddNewTicket/AddNewTicket'
import EachState from '../../components/EachState/EachState'
import EachTicket from '../../components/EachTicket/EachTicket'
import { TicketContext, TicketContextType } from '../../contexts/ticket.context'
import ModalForm from '../../components/ModalForm/ModalForm'
import AddNewState from '../../components/AddNewState/AddNewState'

const ProjectPage = () => {
  const { projectId } = useParams()

  const { projectData, loadProject } = useContext(ProjectContext) as ProjectContextType
  const { ticketData, loadTicket } = useContext(TicketContext) as TicketContextType

  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => setShowModal(!showModal)

  useEffect(() => {
    if (projectId) {
      loadProject(projectId)
      loadTicket(projectId)
    }
  }, [projectId, loadProject, loadTicket])

  if (projectData === null) {
    return <Loading />
  }

  const { title } = projectData

  return (
    <div className='container h-screen max-w-6xl mx-auto'>
      <h1
        className='py-2 text-5xl font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-200 '>
        {title}
      </h1>
      <div className='h-full mt-2 overflow-y-auto'>
        <ul className='flex flex-row gap-2 pb-4 mb-2 overflow-y-scroll text-white bg-red-400 h-[70%]'>
          {projectData.state.map((state, idx) => (
            <li key={idx} className='flex flex-col gap-2 p-2 border min-w-[13rem] bg-slate-800 rounded h-fit max-h-[100%]' >
              <article className=''>
                <EachState {...state} />
                <ul className='flex flex-col gap-2 py-4 mb-2 overflow-x-scroll bg-cyan-400'>
                  {!ticketData
                    ? <Loading />
                    : ticketData.filter(ticket => ticket.state?.stateName === state.stateName).map((ticket, idx) => (
                      <EachTicket {...ticket} key={idx} />
                    ))
                  }
                </ul>
              </article>
              < AddNewTicket {...state} />
            </li >
          ))}
        </ul>
        <button
          className='flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
          onClick={toggleModal}>
          <MdPostAdd />
          <span>Add State</span>
        </button>
      </div >

      {
        showModal &&
        <ModalForm toggleModal={toggleModal} >
          <AddNewState toggleModal={toggleModal} />
        </ModalForm>
      }
    </div >
  )
}

export default ProjectPage