import { ProjectData } from './Project.type'
import { IState } from './State.type'

export interface ITicketData {
  _id: string
  title: string
  completed: boolean
  projectId: ProjectData
  state: IState
  owner: string
}