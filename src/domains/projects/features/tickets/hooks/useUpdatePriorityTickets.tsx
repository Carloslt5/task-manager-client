import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TICKETS } from "../tickets.constants";
import { updatePriorityTicket } from "../tickets.services";

export const useUpdatePriorityTickets = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ticketId, priority }: { ticketId: string; priority: string }) => {
      return updatePriorityTicket(ticketId, priority);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });
    },
  });
};
