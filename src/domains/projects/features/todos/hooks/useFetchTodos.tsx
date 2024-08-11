import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_TODO } from "../todos.constants";
import { fetchTodos } from "../todos.services";

export const useFetchTodos = (ticketId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_TODO, ticketId],
    queryFn: () => fetchTodos(ticketId),
    enabled: !!ticketId,
  });
};
