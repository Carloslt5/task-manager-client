import { State } from "../features/states/states.type";

export class StateMother {
  private static currentId = 1;

  static getStates(projectId: string, title: string, state?: Partial<State>) {
    return {
      id: (this.currentId++).toString(),
      stateName: title,
      projectId,
      ...state,
    } as State;
  }

  static generateStates(projectId: string) {
    const stateTitles = ["Pending", "In Progress", "Done"];
    return stateTitles.map((title) => this.getStates(projectId, title));
  }
}
