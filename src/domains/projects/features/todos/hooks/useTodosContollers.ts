import { useCallback } from "react";

import { useDeleteTodos } from "./useDeleteTodo";
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

  // Delete todo
  const deleteTodoMutation = useDeleteTodos(ticketId!);
  const handleDeleteTodo = useCallback(
    (todoId: string) => {
      deleteTodoMutation.mutate(todoId);
    },
    [deleteTodoMutation],
  );

  return {
    todos,
    isLoadingTodos,
    isErrorTodos,
    handleUpdateTodos,
    handleDeleteTodo,
  };
};
