import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  QUERY_KEY_TICKET_DETAILS,
  QUERY_KEY_TICKETS,
} from "../tickets.constants";
import { updateTickets } from "../tickets.services";
import { Ticket } from "../tickets.type";

export const useUpdateTickets = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTicketsData: Partial<Ticket>) => {
      return updateTickets(newTicketsData);
    },
    onMutate: async (newTicketsData: Partial<Ticket>) => {
      // Cancel any pending refetches to prevent them from overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });

      // Get the snapshot of the current data
      const previousTickets = queryClient.getQueryData([
        QUERY_KEY_TICKETS,
        projectId,
      ]);

      // Optimistically update the cache
      queryClient.setQueryData(
        [QUERY_KEY_TICKETS, projectId],
        (old: { data: Ticket[] } | undefined) => {
          if (!old?.data) return old;

          return {
            ...old,
            data: old.data.map((ticket: Ticket) =>
              ticket.id === newTicketsData.id
                ? { ...ticket, ...newTicketsData }
                : ticket,
            ),
          };
        },
      );

      // Return the snapshot so you can revert in case of error
      return { previousTickets };
    },
    onError: (_err, _newTicketsData, context) => {
      // Rollback optimistic update on error
      if (context?.previousTickets) {
        queryClient.setQueryData(
          [QUERY_KEY_TICKETS, projectId],
          context.previousTickets,
        );
      }
    },
    onSettled: (_, __, variables) => {
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
