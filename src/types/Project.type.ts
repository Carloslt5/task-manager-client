import { IState } from './State.type'

export interface ProjectData {
  _id: number
  description: boolean
  owner: string
  state: IState[]
  title: string
}
