import { faker } from "@faker-js/faker";

import { Ticket } from "../features/tickets/tickets.type";

export class TicketMother {
  private static currentId = 1;

  static getRandomTicket(stateId: string, projectId: string, ticket?: Partial<Ticket>): Ticket {
    const newTicket = {
      id: (this.currentId++).toString(),
      stateId,
      projectId,
      priority: faker.helpers.arrayElement(["low", "medium", "high"]),
      name: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      ...ticket,
    } as Ticket;

    return newTicket;
  }

  static getRandomList(stateId: string, projectId: string, length = 2): Ticket[] {
    return Array.from({ length }, () => this.getRandomTicket(stateId, projectId));
  }
}
