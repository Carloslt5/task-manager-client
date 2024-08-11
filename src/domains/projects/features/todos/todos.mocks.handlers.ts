import { delay, http, HttpResponse } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";

import { MOCK_TODOS_LIST } from "../../__mocks__/MockData";

export const todosHandlers = [
  http.get(`/api/todos/getTodos/:ticketId`, async ({ params }) => {
    const { ticketId } = params;

    const todos = [];
    for (const todo of MOCK_TODOS_LIST) {
      if (todo.ticketId === ticketId) {
        todos.push(todo);
      }
    }

    if (!todos) {
      return HttpResponse.json(
        {
          code: 404,
          message: "No todos found for this ticket",
        },
        { status: 404 },
      );
    }

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: todos,
    });
  }),
];
