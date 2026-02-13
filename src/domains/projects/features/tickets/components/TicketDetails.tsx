import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useMemo } from "react";

import { Button } from "@/shared/components/Button";
import { ChangeTitle } from "@/shared/components/ChangeTitle";
import { ModalContent } from "@/shared/components/ModalContent";
import { ModalForm } from "@/shared/components/ModalForm";

import { CreateTodo } from "../../todos/components/CreateTodo";
import { TodosList } from "../../todos/components/TodosList";
import { useTicketsContollers } from "../hooks/useTicketsContollers";
import { Ticket } from "../tickets.type";
import { ChangeDetails } from "./ChangeDetails";
import { ChangePriority } from "./ChangePriority";
import { TicketDetailsSkeleton } from "./TicketDetailsSkeleton";

type Props = {
  readonly ticket: Ticket;
  readonly onClose: () => void;
};

export const TicketDetails: React.FC<Props> = ({ ticket, onClose }) => {
  const {
    ticketDetails,
    isLoadingTicketsDetails,
    isErrorTicketsDetails,
    handleUpdateTickets,
  } = useTicketsContollers(ticket.projectId, ticket.id);

  const renderTicketDetails = useMemo(() => {
    if (isLoadingTicketsDetails) {
      return <TicketDetailsSkeleton />;
    }
    if (isErrorTicketsDetails || !ticketDetails?.data) {
      return <h1>Not found ticket details...</h1>;
    }
    return <ChangeDetails data={ticketDetails?.data} />;
  }, [isLoadingTicketsDetails, isErrorTicketsDetails, ticketDetails]);

  return (
    <ModalForm onClose={onClose}>
      <ModalContent className="max-h-full">
        <section>
          <header className="flex justify-between gap-2 pb-3 mb-2 border-b">
            <ChangeTitle data={ticket} updateData={handleUpdateTickets} />
            <Button variant="danger" className="p-2 font-bold">
              <DeleteForeverIcon />
            </Button>
          </header>
          <section className="flex flex-col items-stretch gap-2 mb-2">
            <ChangePriority
              data={ticket}
              handleUpdateTickets={handleUpdateTickets}
            />
            {renderTicketDetails}
          </section>
        </section>

        <header className="pb-3 text-xl border-b mt-3">
          <h2>Bullet Points</h2>
        </header>

        <CreateTodo ticketId={ticket.id} />
        <TodosList ticketId={ticket.id} />

        <section className="flex items-center justify-end w-full gap-3">
          <Button variant="cancel" onClick={onClose}>
            <span>Close</span>
          </Button>
          <Button variant="add" onClick={onClose}>
            <span>Accept</span>
          </Button>
        </section>
      </ModalContent>
    </ModalForm>
  );
};
