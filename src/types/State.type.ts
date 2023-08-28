import { ProjectData } from './Project.type'

export interface IState {
  stateName: string
  ticket: object[]
}

export interface ITicket {
  title: string
  completed: boolean
  projectId: ProjectData[]
  state: IState[]
  owner: string
}