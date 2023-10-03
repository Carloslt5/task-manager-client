import { ProjectData } from './Project.type'
import { IState } from './State.type'

export interface ITicketData {
  _id: string
  title: string
  description: string
  completed: boolean
  project: ProjectData
  state: IState
  owner: string
}