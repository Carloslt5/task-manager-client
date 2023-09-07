import { ITicketData } from './Ticket.type'

export interface IState {
  _id: string
  stateName: string
  ticket: ITicketData[]
}
