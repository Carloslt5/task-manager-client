import { IStateData } from '../pages/ProjectPage/ProjectPage'

export interface ProjectData {
  _id: number
  description: boolean
  owner: string
  state: IStateData[]
  title: string
}
