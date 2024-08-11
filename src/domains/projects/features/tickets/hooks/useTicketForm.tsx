import { useForm } from "react-hook-form";

import { useTicketsContollers } from "./useTicketsContollers";
import { Priority, Ticket } from "../tickets.type";

type UseStateFormProps = {
  stateId: string;
  projectId: string;
  ticket?: Ticket;
  onClose: () => void;
};

export const useTicketForm = ({ stateId, projectId, onClose, ticket }: UseStateFormProps) => {
  const { handleCreateTickets } = useTicketsContollers(projectId);

  const { register, handleSubmit, reset } = useForm<Ticket>({
    defaultValues: ticket || {
      stateId: stateId,
      projectId: projectId,
      priority: Priority.LOW,
      name: "",
      description: "",
    },
  });

  const submitHandler = (data: Ticket) => {
    if (ticket) {
      //
    } else {
      handleCreateTickets(data);
    }
    reset();
    onClose();
  };

  return { register, handleSubmit, submitHandler };
};
