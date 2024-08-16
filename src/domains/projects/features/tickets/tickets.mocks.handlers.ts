import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { Ticket } from "./tickets.type";
import { MOCK_TICKETS_LIST } from "../../__mocks__/MockData";
import { TicketMother } from "../../__mocks__/TicketsMother";

export const ticketsHandlers = [
  http.get(`/api/ticket/getTicket/:projectId`, async ({ params }) => {
    const { projectId } = params;

    const tickets = [];
    for (const ticket of MOCK_TICKETS_LIST) {
      if (ticket.projectId === projectId) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { description, ...ticketWithoutDescription } = ticket;
        tickets.push(ticketWithoutDescription);
      }
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: tickets,
    });
  }),

  http.get(`/api/ticket/getTicketDetails/:ticketId`, async ({ params }) => {
    const { ticketId } = params;

    const ticket = MOCK_TICKETS_LIST.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
      return HttpResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: ticket,
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

  http.post(`/api/ticket/updateTicketDetails/:ticketId`, async ({ request, params }) => {
    const { ticketId } = params;
    const requestBody = await request.json();
    const newTicketsData = requestBody as Partial<Ticket>;

    const ticketIndex = MOCK_TICKETS_LIST.findIndex((ticket) => ticket.id === ticketId);

    if (ticketIndex === -1) {
      return HttpResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    MOCK_TICKETS_LIST[ticketIndex] = {
      ...MOCK_TICKETS_LIST[ticketIndex],
      ...newTicketsData,
    };
    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "Ticket priority updated",
      data: MOCK_TICKETS_LIST[ticketIndex],
    });
  }),
];
