import { faker } from "@faker-js/faker";

import { State } from "../features/states/states.type";

export class StateMother {
  private static currentId = 1;

  static getRandomState(projectId: string, state?: Partial<State>): State {
    const newState = {
      id: (this.currentId++).toString(),
      stateName: faker.commerce.department(),
      projectId,
      ...state,
    } as State;

    return newState;
  }

  static getRandomList(projectId: string, length = 0): State[] {
    return Array.from({ length }, () => this.getRandomState(projectId!));
  }
}
