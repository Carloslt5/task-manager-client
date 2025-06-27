import { delay, HttpResponse, http } from "msw";

import { DEFAULT_DELAY } from "@/mock-server/constants";
import { MOCK_TODOS_LIST } from "../../__mocks__/MockData";
import { TodoMother } from "../../__mocks__/TodoMother";
import { Todo } from "./todos.types";

export const todosHandlers = [
  http.post(`/api/todos/createTodos`, async ({ request }) => {
    const requestBody = await request.json();
    const newTodo = requestBody as Partial<Todo>;

    if (!newTodo.title || !newTodo.ticketId) {
      return HttpResponse.json(
        {
          code: 400,
          message: "Title and ticketId are required",
        },
        { status: 400 },
      );
    }

    const createdTodo = TodoMother.getRandomTodo(newTodo.ticketId, {
      title: newTodo.title,
      completed: newTodo.completed,
      ticketId: newTodo.ticketId,
    });

    MOCK_TODOS_LIST.push(createdTodo);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: newTodo,
    });
  }),

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

  http.post(`/api/todos/updateTodo/:todoId`, async ({ params, request }) => {
    const { todoId } = params;
    const requestBody = await request.json();
    const updatedTodo = requestBody as Partial<Todo>;

    const todoIndex = MOCK_TODOS_LIST.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "Todo not found",
        },
        { status: 404 },
      );
    }

    MOCK_TODOS_LIST[todoIndex] = {
      ...MOCK_TODOS_LIST[todoIndex],
      ...updatedTodo,
    };

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      data: MOCK_TODOS_LIST[todoIndex],
    });
  }),

  http.delete(`/api/todos/deleteTodo/:todoId`, async ({ params }) => {
    const { todoId } = params;

    const todoIndex = MOCK_TODOS_LIST.findIndex((todo) => todo.id === todoId);

    if (todoIndex === -1) {
      return HttpResponse.json(
        {
          code: 404,
          message: "Todo not found",
        },
        { status: 404 },
      );
    }

    MOCK_TODOS_LIST.splice(todoIndex, 1);

    await delay(DEFAULT_DELAY);
    return HttpResponse.json({
      message: "To do deleted",
    });
  }),
];
