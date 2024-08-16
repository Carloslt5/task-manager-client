import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TODO } from "../todos.constants";
import { deleteTodo } from "../todos.services";

export const useDeleteTodos = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todoId: string) => {
      return deleteTodo(todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TODO, ticketId],
      });
    },
  });
};
