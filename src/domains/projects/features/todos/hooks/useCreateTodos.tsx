import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TODO } from "../todos.constants";
import { createTodos } from "../todos.services";
import { Todo } from "../todos.types";

export const useCreateTodos = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: Todo) => {
      return createTodos(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TODO, ticketId],
      });
    },
  });
};
