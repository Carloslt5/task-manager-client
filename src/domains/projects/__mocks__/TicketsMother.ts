import { faker } from "@faker-js/faker";

import { Ticket } from "../features/tickets/tickets.type";

export class TicketMother {
  private static currentId = 1;

  static getRandomTicket(
    stateId: string,
    projectId: string,
    ticket?: Ticket,
    position = 0,
  ): Ticket {
    const newTicket = {
      id: (this.currentId++).toString(),
      stateId,
      projectId,
      priority: faker.helpers.arrayElement(["low", "medium", "high"]),
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      position,
      ...ticket,
    } as Ticket;

    return newTicket;
  }

  static getRandomList(
    stateId: string,
    projectId: string,
    length = 2,
  ): Ticket[] {
    return Array.from({ length }, (_, index) =>
      this.getRandomTicket(stateId, projectId, undefined, index),
    );
  }
}
