import { delay, HttpResponse, http } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { MOCK_TICKETS_LIST } from "../../__mocks__/MockData";
import { TicketMother } from "../../__mocks__/TicketsMother";
import { ReorderTicketsPayload, Ticket } from "./tickets.type";

export const ticketsHandlers = [
  http.get(`/api/ticket/getTicket/:projectId`, async ({ params }) => {
    const { projectId } = params;

    const tickets = [];
    for (const ticket of MOCK_TICKETS_LIST) {
      if (ticket.projectId === projectId) {
        // biome-ignore lint/correctness/noUnusedVariables: only need ticketWithoutDescription <explanation>
        const { description, ...ticketWithoutDescription } = ticket;
        tickets.push(ticketWithoutDescription);
      }
    }

    tickets.sort((a, b) => a.position - b.position);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: tickets,
    });
  }),

  http.get(`/api/ticket/getTicketDetails/:ticketId`, async ({ params }) => {
    const { ticketId } = params;

    const ticket = MOCK_TICKETS_LIST.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
      return HttpResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: ticket,
    });
  }),

  http.post(`/api/ticket/create/:projectId`, async ({ request }) => {
    const requestBody = await request.json();
    const newTicketData: Ticket = requestBody as Ticket;

    const ticketsInSameState = MOCK_TICKETS_LIST.filter(
      (t) =>
        t.stateId === newTicketData.stateId &&
        t.projectId === newTicketData.projectId,
    );
    const position = ticketsInSameState.length;

    const newTicket = TicketMother.getRandomTicket(
      newTicketData.stateId,
      newTicketData.projectId,
      newTicketData,
      position,
    );
    MOCK_TICKETS_LIST.push(newTicket);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "Ticket created",
    });
  }),

  http.post(
    `/api/ticket/updateTicketDetails/:ticketId`,
    async ({ request, params }) => {
      const { ticketId } = params;
      const requestBody = await request.json();
      const newTicketsData = requestBody as Partial<Ticket>;

      const ticketIndex = MOCK_TICKETS_LIST.findIndex(
        (ticket) => ticket.id === ticketId,
      );

      if (ticketIndex === -1) {
        return HttpResponse.json(
          { message: "Ticket not found" },
          { status: 404 },
        );
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
    },
  ),

  http.post(`/api/ticket/reorder`, async ({ request }) => {
    const requestBody = await request.json();
    const { updates } = requestBody as ReorderTicketsPayload;

    for (const update of updates) {
      const ticketIndex = MOCK_TICKETS_LIST.findIndex(
        (t) => t.id === update.id,
      );
      if (ticketIndex !== -1) {
        MOCK_TICKETS_LIST[ticketIndex] = {
          ...MOCK_TICKETS_LIST[ticketIndex],
          stateId: update.stateId,
          position: update.position,
        };
      }
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "Tickets reordered",
    });
  }),
];
