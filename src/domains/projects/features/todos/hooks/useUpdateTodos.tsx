import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditContent } from "@/shared/components/ChangeTitle";

import { QUERY_KEY_TODO } from "../todos.constants";
import { updateTodos } from "../todos.services";

export const useUpdateTodos = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodoData: EditContent) => {
      return updateTodos(newTodoData.id, newTodoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TODO, ticketId],
      });
    },
  });
};
