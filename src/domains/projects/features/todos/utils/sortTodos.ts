import { Todo } from "../todos.types";

export const sortByTitle = (a: Todo, b: Todo): number => {
  return a.title.localeCompare(b.title);
};

export const sortByCompletion = (a: Todo, b: Todo): number => {
  if (a.completed === b.completed) return 0;
  return a.completed ? 1 : -1;
};
