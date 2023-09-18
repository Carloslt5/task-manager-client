import { IState } from './State.type'

export interface ProjectData {
  _id: string
  description: boolean
  owner: string
  state: IState[]
  title: string
}
