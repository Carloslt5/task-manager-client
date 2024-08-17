import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TODO } from "../todos.constants";
import { updateTodo } from "../todos.services";
import { Todo } from "../todos.types";

export const useUpdateTodos = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodoData: Todo) => {
      return updateTodo(newTodoData.id, newTodoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TODO, ticketId],
      });
    },
  });
};
