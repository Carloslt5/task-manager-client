import { State } from "./features/states/states.type";

export interface Project {
  id: string;
  title: string;
  states: State[];
  ownerId?: string;
}
