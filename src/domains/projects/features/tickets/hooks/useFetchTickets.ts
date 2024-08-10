import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY_TICKETS } from "../tickets.constants";
import { fetchTickets } from "../tickets.services";

export const useFetchTickets = (projectId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY_TICKETS, projectId],
    queryFn: () => fetchTickets(projectId),
    enabled: !!projectId,
  });
};
