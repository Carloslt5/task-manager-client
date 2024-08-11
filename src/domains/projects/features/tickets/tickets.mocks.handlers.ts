import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { Ticket } from "./tickets.type";
import { MOCK_TICKETS_LIST } from "../../__mocks__/MockData";
import { TicketMother } from "../../__mocks__/TicketsMother";

export const ticketsHandlers = [
  http.get(`/api/ticket/getTicket/:projectId`, async ({ params }) => {
    const { projectId } = params;

    const tickets = [];
    for (const state of MOCK_TICKETS_LIST) {
      if (state.projectId === projectId) {
        tickets.push(state);
      }
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: tickets,
    });
  }),

  http.post(`/api/ticket/create/:projectId`, async ({ request }) => {
    const requestBody = await request.json();
    const newTicketData: Ticket = requestBody as Ticket;

    const newTicket = TicketMother.getRandomTicket(newTicketData.stateId, newTicketData.projectId, newTicketData);
    MOCK_TICKETS_LIST.push(newTicket);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "Ticket created",
    });
  }),
];
