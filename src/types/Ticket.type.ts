import { IStateData } from '../pages/ProjectPage/ProjectPage'
import { ProjectData } from './Project.type'

export interface ITicketData {
  title: string
  completed: boolean
  projectId: ProjectData
  state: IStateData
  owner: string
}