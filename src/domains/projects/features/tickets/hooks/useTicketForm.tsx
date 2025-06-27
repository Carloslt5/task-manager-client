import { useForm } from "react-hook-form";
import { Priority, Ticket } from "../tickets.type";
import { useTicketsContollers } from "./useTicketsContollers";

type UseStateFormProps = {
  stateId: string;
  projectId: string;
  ticket?: Ticket;
  onClose: () => void;
};

export const useTicketForm = ({
  stateId,
  projectId,
  onClose,
  ticket,
}: UseStateFormProps) => {
  const { handleCreateTickets, handleUpdateTickets } =
    useTicketsContollers(projectId);

  const { register, handleSubmit, reset } = useForm<Ticket>({
    defaultValues: ticket || {
      stateId: stateId,
      projectId: projectId,
      priority: Priority.LOW,
      title: "",
      description: "",
    },
  });

  const submitHandler = (data: Ticket) => {
    if (ticket) {
      handleUpdateTickets(data);
    } else {
      handleCreateTickets(data);
    }
    reset();
    onClose();
  };

  return { register, handleSubmit, submitHandler };
};
