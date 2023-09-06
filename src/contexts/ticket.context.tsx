import { createContext, ReactNode, useCallback, useState } from 'react'
import { ITicketData } from '../types/Ticket.type'
import ticketservices from '../services/ticket.services'

export interface TicketContextType {
  ticketData: ITicketData[] | null
  setTicketData: React.Dispatch<React.SetStateAction<ITicketData[] | null>>
  loadTicket: (projectId: string) => Promise<void>

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

  return (
    <TicketContext.Provider value={{ ticketData, setTicketData, loadTicket }}>
      {children}
    </TicketContext.Provider >
  )
}