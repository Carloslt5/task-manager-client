import React, { useMemo } from "react";

import { ModalForm } from "@/shared/components/ModalForm";

import { ChangePriority } from "./ChangePriority";
import { useTicketsContollers } from "../hooks/useTicketsContollers";
import { Ticket } from "../tickets.type";

type Props = {
  readonly ticket: Ticket;
  readonly onClose: () => void;
};

export const TicketDetails: React.FC<Props> = ({ ticket, onClose }) => {
  const { ticketDetails, isLoadingTicketsDetails, isErrorTicketsDetails, handleUpdatePriorityTickets } =
    useTicketsContollers(ticket.projectId, ticket.id);

  const renderTicketDetails = useMemo(() => {
    if (isLoadingTicketsDetails) {
      return <h1 className="text-white">Loading...</h1>;
    }
    if (isErrorTicketsDetails) {
      return <h1>Not found ticket details...</h1>;
    }
    return <p>{ticketDetails?.data.description}</p>;
  }, [isLoadingTicketsDetails, isErrorTicketsDetails, ticketDetails]);

  return (
    <ModalForm onClose={onClose}>
      <div className="max-h-full modal__form">
        <section>
          <header className="flex justify-between gap-2 pb-3 mb-2 border-b">{ticket.name}</header>
          <section className="flex flex-col items-stretch gap-2 mb-2">
            <ChangePriority data={ticket} updatePriority={handleUpdatePriorityTickets} />
            {renderTicketDetails}
          </section>
        </section>

        <header className="pb-3 text-xl border-b">
          <h2>Bullet Points</h2>
        </header>
        <p>todo list</p>
        <section className="flex items-center justify-end w-full gap-3">
          <button className="btn btn__cancel" onClick={onClose}>
            <span>Close</span>
          </button>
          <button className="p-2 font-bold bg-red-500 rounded btn hover:bg-red-700">
            <span>Delete Ticket</span>
          </button>
        </section>
      </div>
    </ModalForm>
  );
};
