import { useCallback } from "react";
import { Todo } from "../todos.types";
import { useCreateTodos } from "./useCreateTodos";
import { useDeleteTodos } from "./useDeleteTodo";
import { useFetchTodos } from "./useFetchTodos";
import { useUpdateTodos } from "./useUpdateTodos";

export const useTodosContollers = (ticketId: string) => {
  //Get todos
  const {
    data: todos,
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
  } = useFetchTodos(ticketId!);

  // Create todo
  const createTodoMutation = useCreateTodos(ticketId!);
  const handleCreateTodos = useCallback(
    (newTodo: Todo) => {
      createTodoMutation.mutate(newTodo);
    },
    [createTodoMutation],
  );

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
    handleCreateTodos,
    handleUpdateTodos,
    handleDeleteTodo,
  };
};
