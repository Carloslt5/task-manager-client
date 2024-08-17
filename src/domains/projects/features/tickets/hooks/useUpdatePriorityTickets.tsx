import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TICKET_DETAILS, QUERY_KEY_TICKETS } from "../tickets.constants";
import { updateTickets } from "../tickets.services";
import { Ticket } from "../tickets.type";

export const useUpdateTickets = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTicketsData: Partial<Ticket>) => {
      return updateTickets(newTicketsData);
    },
    onSuccess: (_, variables) => {
      const ticketId = variables.id;

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TICKET_DETAILS, ticketId],
      });
    },
  });
};
