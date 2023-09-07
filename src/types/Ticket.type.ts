import { ProjectData } from './Project.type'

export interface ITicketData {
  _id: string
  title: string
  completed: boolean
  projectId: ProjectData
  owner: string
}