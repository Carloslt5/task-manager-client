import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY_TICKETS } from "../tickets.constants";
import { reorderTickets } from "../tickets.services";
import { ReorderTicketsPayload, Ticket } from "../tickets.type";

export const useReorderTickets = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReorderTicketsPayload) => {
      return reorderTickets(payload);
    },
    onMutate: async (payload: ReorderTicketsPayload) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });

      const previousTickets = queryClient.getQueryData([
        QUERY_KEY_TICKETS,
        projectId,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY_TICKETS, projectId],
        (old: { data: Ticket[] } | undefined) => {
          if (!old?.data) return old;

          const updatesMap = new Map(payload.updates.map((u) => [u.id, u]));

          return {
            ...old,
            data: old.data.map((ticket) => {
              const update = updatesMap.get(ticket.id);
              if (update) {
                return {
                  ...ticket,
                  stateId: update.stateId,
                  position: update.position,
                };
              }
              return ticket;
            }),
          };
        },
      );

      return { previousTickets };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousTickets) {
        queryClient.setQueryData(
          [QUERY_KEY_TICKETS, projectId],
          context.previousTickets,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TICKETS, projectId],
      });
    },
  });
};
