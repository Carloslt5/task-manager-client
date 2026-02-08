import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useModalHook } from "@/shared/hooks/useModalHook";
import { CreateTicketModal } from "../../tickets/components/CreateTicketModal";
import { EachTicket } from "../../tickets/components/EachTicket";
import { EmptyTicket } from "../../tickets/components/EmptyTicket";
import { useTicketsContollers } from "../../tickets/hooks/useTicketsContollers";
import { Ticket } from "../../tickets/tickets.type";
import {
  moveBetweenColumns,
  reorderWithinColumn,
} from "../../tickets/utils/reorderUtils";
import { State } from "../states.type";
import { ColumnPlaceholder } from "./ColumnPlaceholder";
import EachState from "./EachState";

type Props = {
  readonly state: State;
};

export const ColumnState = ({ state }: Props) => {
  const { id: projectId } = useParams();
  const { modalProps, openModal } = useModalHook();

  const columnRef = useRef<HTMLElement>(null);
  const [isOver, setIsOver] = useState(false);

  const { tickets, isLoadingTickets, isErrorTickets, handleReorderTickets } =
    useTicketsContollers(projectId!);

  const allTickets = tickets?.data ?? [];

  useEffect(() => {
    const element = columnRef.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData() {
        return { stateId: state.id };
      },
      onDragEnter() {
        setIsOver(true);
      },
      onDragLeave() {
        setIsOver(false);
      },
      onDrop({ source, location }) {
        setIsOver(false);
        const sourceTicket = (source.data as { ticket: Ticket }).ticket;
        if (!sourceTicket) return;

        const dropTargets = location.current.dropTargets;

        // Find if we dropped on a ticket (innermost target)
        const ticketTarget = dropTargets.find(
          (target) => (target.data as { ticket?: Ticket }).ticket != null,
        );
        const targetTicket = ticketTarget
          ? (ticketTarget.data as { ticket: Ticket }).ticket
          : null;
        const edge = ticketTarget
          ? extractClosestEdge(ticketTarget.data)
          : null;

        const sourceColumnTickets = allTickets.filter(
          (t) => t.stateId === sourceTicket.stateId,
        );

        if (sourceTicket.stateId === state.id) {
          // Reorder within the same column
          if (!targetTicket || !edge) return;
          if (targetTicket.id === sourceTicket.id) return;

          const updates = reorderWithinColumn(
            sourceColumnTickets,
            sourceTicket.id,
            targetTicket.id,
            edge,
          );

          if (updates.length > 0) {
            handleReorderTickets({ projectId: projectId!, updates });
          }
        } else {
          // Move between columns
          const destColumnTickets = allTickets.filter(
            (t) => t.stateId === state.id,
          );

          const updates = moveBetweenColumns(
            sourceColumnTickets,
            destColumnTickets,
            sourceTicket.id,
            state.id,
            targetTicket?.id ?? null,
            edge,
          );

          if (updates.length > 0) {
            handleReorderTickets({ projectId: projectId!, updates });
          }
        }
      },
    });
  }, [state.id, handleReorderTickets, allTickets, projectId]);

  if (isLoadingTickets) {
    return <ColumnPlaceholder />;
  }

  if (isErrorTickets) {
    return <p>Error loading tickets</p>;
  }

  const ticketsInState = allTickets
    .filter((ticket) => ticket.stateId === state.id)
    .sort((a, b) => a.position - b.position);

  return (
    <>
      <li>
        <article
          ref={columnRef}
          className={`flex flex-col gap-2 p-2 min-w-[300px] rounded max-h-full transition-all duration-200
          ${isOver ? "bg-blue-chill-800 dark:bg-zinc-700" : "bg-blue-chill-400 dark:bg-zinc-950"}`}
        >
          <EachState state={state} />
          <article className={`py-2 overflow-y-scroll rounded-sm `}>
            <ul className="flex flex-col gap-2 overflow-y-hidden">
              {ticketsInState.length === 0 ? (
                <EmptyTicket stateId={state.id} />
              ) : (
                ticketsInState.map((ticket) => (
                  <EachTicket ticket={ticket} key={ticket.id} />
                ))
              )}
            </ul>
          </article>
          <button
            className="flex items-center w-full gap-2 p-1 rounded-sm h-fit hover:bg-blue-chill-500 dark:hover:bg-zinc-800 focus-outline-none"
            onClick={openModal}
          >
            <AddIcon />
            <p>Add Ticket...</p>
          </button>
        </article>
      </li>

      {modalProps.open && (
        <CreateTicketModal stateId={state.id} {...modalProps} />
      )}
    </>
  );
};
