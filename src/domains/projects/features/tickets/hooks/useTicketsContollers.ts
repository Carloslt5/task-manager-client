import { useCallback } from "react";

import { ReorderTicketsPayload, Ticket } from "../tickets.type";
import { useCreateTickets } from "./useCreateTickets";
import { useFetchTickets } from "./useFetchTickets";
import { useFetchTicketsDetails } from "./useFetchTicketsDetails";
import { useReorderTickets } from "./useReorderTickets";
import { useUpdateTickets } from "./useUpdatePriorityTickets";

export const useTicketsContollers = (projectId: string, ticketId?: string) => {
  //Get tickets
  const {
    data: tickets,
    isLoading: isLoadingTickets,
    isError: isErrorTickets,
  } = useFetchTickets(projectId!);

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
  const updateTicketsMutation = useUpdateTickets(projectId!);
  const handleUpdateTickets = useCallback(
    (newTicketData: Partial<Ticket>) => {
      updateTicketsMutation.mutate(newTicketData);
    },
    [updateTicketsMutation],
  );

  // Reorder tickets
  const reorderTicketsMutation = useReorderTickets(projectId!);
  const handleReorderTickets = useCallback(
    (payload: ReorderTicketsPayload) => {
      reorderTicketsMutation.mutate(payload);
    },
    [reorderTicketsMutation],
  );

  return {
    tickets,
    ticketDetails,
    isLoadingTickets,
    isLoadingTicketsDetails,
    isErrorTickets,
    isErrorTicketsDetails,
    handleCreateTickets,
    handleUpdateTickets,
    handleReorderTickets,
  };
};
