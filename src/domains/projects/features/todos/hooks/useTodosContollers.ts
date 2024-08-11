import { useCallback } from "react";

import { useFetchTodos } from "./useFetchTodos";
import { useUpdateTodos } from "./useUpdateTodos";
import { Todo } from "../todos.types";

export const useTodosContollers = (ticketId: string) => {
  //Get todos
  const { data: todos, isLoading: isLoadingTodos, isError: isErrorTodos } = useFetchTodos(ticketId!);

  // Update todo
  const updateTodosMutation = useUpdateTodos(ticketId!);
  const handleUpdateTodos = useCallback(
    (newTodoData: Todo) => {
      updateTodosMutation.mutate(newTodoData);
    },
    [updateTodosMutation],
  );

  return {
    todos,
    isLoadingTodos,
    isErrorTodos,
    handleUpdateTodos,
  };
};
