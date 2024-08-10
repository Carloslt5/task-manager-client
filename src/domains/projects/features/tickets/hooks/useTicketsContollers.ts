import { useFetchTickets } from "./useFetchTickets";

export const useTicketsContollers = (projectId: string) => {
  //Get tickets in project
  const { data: tickets, isLoading: isLoadingTickets, isError: isErrorTickets } = useFetchTickets(projectId!);

  return {
    tickets,
    isLoadingTickets,
    isErrorTickets,
  };
};
