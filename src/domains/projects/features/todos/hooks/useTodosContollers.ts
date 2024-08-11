import { useCallback } from "react";

import { EditContent } from "@/shared/components/ChangeTitle";

import { useFetchTodos } from "./useFetchTodos";
import { useUpdateTodos } from "./useUpdateTodos";

export const useTodosContollers = (ticketId: string) => {
  //Get todos
  const { data: todos, isLoading: isLoadingTodos, isError: isErrorTodos } = useFetchTodos(ticketId!);

  // Update todo
  const updateTodosMutation = useUpdateTodos(ticketId!);
  const handleUpdateTodos = useCallback(
    (newStateData: EditContent) => {
      updateTodosMutation.mutate(newStateData);
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
