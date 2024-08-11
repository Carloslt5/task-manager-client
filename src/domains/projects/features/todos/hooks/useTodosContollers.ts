import { useFetchTodos } from "./useFetchTodos";

export const useTodosContollers = (ticketId: string) => {
  //Get todos
  const { data: todos, isLoading: isLoadingTodos, isError: isErrorTodos } = useFetchTodos(ticketId!);

  return {
    todos,
    isLoadingTodos,
    isErrorTodos,
  };
};
