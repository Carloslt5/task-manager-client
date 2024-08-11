import { useCallback } from "react";

import { useCreateTickets } from "./useCreateTickets";
import { useFetchTickets } from "./useFetchTickets";
import { Ticket } from "../tickets.type";

export const useTicketsContollers = (projectId: string) => {
  //Get tickets in project
  const { data: tickets, isLoading: isLoadingTickets, isError: isErrorTickets } = useFetchTickets(projectId!);

  // create state in project
  const addTicketsMutation = useCreateTickets(projectId!);
  const handleCreateTickets = useCallback(
    (newStateData: Ticket) => {
      addTicketsMutation.mutate(newStateData);
    },
    [addTicketsMutation],
  );

  return {
    tickets,
    isLoadingTickets,
    isErrorTickets,
    handleCreateTickets,
  };
};
