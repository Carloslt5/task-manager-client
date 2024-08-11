import { useCallback } from "react";

import { useCreateTickets } from "./useCreateTickets";
import { useFetchTickets } from "./useFetchTickets";
import { useFetchTicketsDetails } from "./useFetchTicketsDetails";
import { useUpdatePriorityTickets } from "./useUpdatePriorityTickets";
import { Ticket } from "../tickets.type";

export const useTicketsContollers = (projectId: string, ticketId?: string) => {
  //Get tickets
  const { data: tickets, isLoading: isLoadingTickets, isError: isErrorTickets } = useFetchTickets(projectId!);

  //Get tickets details
  const {
    data: ticketDetails,
    isLoading: isLoadingTicketsDetails,
    isError: isErrorTicketsDetails,
  } = useFetchTicketsDetails(ticketId!);

  // create ticket
  const addTicketsMutation = useCreateTickets(projectId!);
  const handleCreateTickets = useCallback(
    (newStateData: Ticket) => {
      addTicketsMutation.mutate(newStateData);
    },
    [addTicketsMutation],
  );

  // Update ticket priority
  const updatePriorityTicketsMutation = useUpdatePriorityTickets(projectId!);
  const handleUpdatePriorityTickets = useCallback(
    (ticketId: string, newPriority: string) => {
      updatePriorityTicketsMutation.mutate({ ticketId, priority: newPriority });
    },
    [updatePriorityTicketsMutation],
  );

  return {
    tickets,
    ticketDetails,
    isLoadingTickets,
    isLoadingTicketsDetails,
    isErrorTickets,
    isErrorTicketsDetails,
    handleCreateTickets,
    handleUpdatePriorityTickets,
  };
};
