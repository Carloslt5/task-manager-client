import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_TICKET_DETAILS } from "../tickets.constants";
import { fetchTicketDetails } from "../tickets.services";

export const useFetchTicketsDetails = (ticketId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_TICKET_DETAILS, ticketId],
    queryFn: () => fetchTicketDetails(ticketId),
    enabled: !!ticketId,
  });
};
