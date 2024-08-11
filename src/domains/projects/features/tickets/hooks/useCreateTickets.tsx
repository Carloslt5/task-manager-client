import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TICKETS } from "../tickets.constants";
import { createTicket } from "../tickets.services";
import { Ticket } from "../tickets.type";

export const useCreateTickets = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTicketData: Ticket) => {
      return createTicket(projectId, newTicketData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });
    },
  });
};
