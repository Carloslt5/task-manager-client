import { faker } from "@faker-js/faker";

import { Todo } from "../features/todos/todos.types";

export class TodoMother {
  private static currentId = 1;

  static getRandomTodo(ticketId: string, todo?: Partial<Todo>): Todo {
    const newTodo = {
      id: (this.currentId++).toString(),
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      ticketId,
      ...todo,
    } as Todo;

    return newTodo;
  }

  static getRandomList(ticketId: string, length = 2): Todo[] {
    return Array.from({ length }, () => this.getRandomTodo(ticketId));
  }
}
