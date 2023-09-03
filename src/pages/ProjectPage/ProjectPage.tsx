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
import ChangeProjectTitle from '../../components/ChangeProjectTitle/ChangeProjectTitle'

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

  return (
    <div className='container h-full max-w-6xl mx-auto'>

      <ChangeProjectTitle />

      <button
        className='flex items-center gap-2 px-4 py-2 mb-4 text-white bg-gray-800 rounded hover:bg-gradient-to-b from-emerald-500 to-emerald-900'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add State</span>
      </button>

      <section className='h-[80%] mt-2'>
        <ul className='flex flex-row items-start h-full gap-2 pb-4 mb-2 overflow-y-auto text-white'>
          {projectData.state.map((state, idx) => (
            <li key={idx} className='flex flex-col gap-2 p-2 border min-w-[13rem] bg-slate-800 rounded max-h-[100%]' >
              <div className=''>
                <EachState {...state} />
              </div>
              <article className='overflow-y-scroll'>
                <ul className='flex flex-col gap-2 overflow-y-hidden'>
                  {!ticketData
                    ? <Loading />
                    : ticketData.filter(ticket => ticket.state?.stateName === state.stateName).map((ticket, idx) => (
                      <EachTicket {...ticket} key={idx} />
                    ))
                  }
                </ul>
              </article>
              <div className=''>
                < AddNewTicket {...state} />
              </div>
            </li >
          ))}
        </ul>
      </section >

      {
        showModal &&
        <ModalForm >
          <AddNewState toggleModal={toggleModal} />
        </ModalForm>
      }

    </div >
  )
}

export default ProjectPage