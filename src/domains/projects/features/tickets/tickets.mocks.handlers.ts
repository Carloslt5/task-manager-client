import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { MOCK_TICKETS_LIST } from "../../__mocks__/MockData";

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
];
