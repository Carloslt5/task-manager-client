import { createContext, ReactNode, useCallback, useState } from 'react'
import { ITicketData } from '../types/Ticket.type'
import ticketservices from '../services/ticket.services'
import stateservices from '../services/state.services'

export interface TicketContextType {
  ticketData: ITicketData[] | null
  setTicketData: React.Dispatch<React.SetStateAction<ITicketData[] | null>>
  loadTicket: (projectId: string) => Promise<void>
  deleteTicket: (ticketId: string, projectId: string) => Promise<void>
  deleteStateAndTicket: (stateID: string, ticketID: string) => Promise<void>
}

export const TicketContext = createContext<TicketContextType | null>(null)

export function TicketProviderWrapper({ children }: { children: ReactNode }) {
  const [ticketData, setTicketData] = useState<ITicketData[] | null>(null)

  const loadTicket = useCallback(async (projectId: string) => {
    try {
      if (projectId) {
        const { data } = await ticketservices.getTicket(projectId)
        setTicketData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const deleteTicket = async (ticketId: string, projectId: string) => {
    await ticketservices.deleteTicket(ticketId)
    loadTicket(projectId)
  }

  const deleteStateAndTicket = async (stateID: string, ticketID: string) => {
    try {
      await stateservices.deleteState(stateID)
      await ticketservices.deleteTicket(ticketID)
    } catch (error) {
      console.log(error)
    }
  }

  const value = { ticketData, setTicketData, loadTicket, deleteTicket, deleteStateAndTicket }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider >
  )
}