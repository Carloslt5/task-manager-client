import { State } from "../features/states/states.type";

export class StateMother {
  private static currentId = 1;
  private static readonly orderedStateNames = [
    "TO DO",
    "In Progress",
    "Closed",
  ];

  static getOrderedState(
    projectId: string,
    index: number,
    state?: Partial<State>,
  ): State {
    const stateName =
      this.orderedStateNames[index % this.orderedStateNames.length];

    const newState = {
      id: (this.currentId++).toString(),
      stateName: stateName,
      projectId,
      ...state,
    } as State;

    return newState;
  }

  static getRandomList(projectId: string, length = 0): State[] {
    return Array.from({ length }, (_, i) =>
      this.getOrderedState(projectId!, i),
    );
  }

  static getNextId(): string {
    return (this.currentId++).toString();
  }
}
