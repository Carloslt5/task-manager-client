import { createContext, ReactNode, useCallback, useState } from 'react'
import { ITicketData } from '@/types/Ticket.type'
import ticketservices from '@/services/ticket.services'
import stateservices from '@/services/state.services'

export interface EditedContent {
  _id?: string
  title?: string
  description?: string
  priority?: string
}

export interface TicketContextType {
  ticketData: ITicketData[] | null
  setTicketData: React.Dispatch<React.SetStateAction<ITicketData[] | null>>
  loadTicket: (projectId: string) => Promise<void>
  deleteTicket: (ticketId: string, projectId: string, stateID: string) => Promise<void>
  deleteStateAndTicket: (stateID: string, ticketID: string) => Promise<void>
  updateTickettTitle: (projectId: string, editedContent: EditedContent) => Promise<void>
  updateTicketPriority: (ticketID: string, priority: string) => Promise<void>
  updateTicketDetails: (ticketID: string, editedContent: EditedContent) => Promise<void>
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

  const deleteTicket = async (ticketId: string, projectId: string, stateID: string) => {
    await ticketservices.deleteTicket(ticketId, stateID)
    loadTicket(projectId)
  }

  const deleteStateAndTicket = async (stateID: string, ticketID: string) => {
    try {
      await ticketservices.deleteTicket(ticketID, stateID)
      await stateservices.deleteState(stateID)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTickettTitle = async (ticketID: string, editedContent: EditedContent) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, editedContent)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTicketPriority = async (ticketID: string, priority: string) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, { priority })
    } catch (error) {
      console.log(error)
    }
  }

  const updateTicketDetails = async (ticketID: string, editedContent: EditedContent) => {
    try {
      await ticketservices.updateTicketDetails(ticketID, editedContent)
    } catch (error) {
      console.log(error)
    }
  }

  const value = { ticketData, setTicketData, loadTicket, deleteTicket, deleteStateAndTicket, updateTicketPriority, updateTickettTitle, updateTicketDetails }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider >
  )
}