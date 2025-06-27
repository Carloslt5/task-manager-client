import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useModalHook } from "@/shared/hooks/useModalHook";
import { CreateTicketModal } from "../../tickets/components/CreateTicketModal";
import { EachTicket } from "../../tickets/components/EachTicket";
import { useTicketsContollers } from "../../tickets/hooks/useTicketsContollers";
import { State } from "../states.type";
import EachState from "./EachState";

type Props = {
  readonly state: State;
};

export const ColumnState = ({ state }: Props) => {
  const { id: projectId } = useParams();
  const { modalProps, openModal } = useModalHook();

  const columnRef = useRef<HTMLElement>(null);
  const [isOver, setIsOver] = useState(false);

  const { tickets, isLoadingTickets, isErrorTickets, handleUpdateTickets } =
    useTicketsContollers(projectId!);

  useEffect(() => {
    const element = columnRef.current;
    if (!element) return;

    const dropConfig = {
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
      // biome-ignore lint/suspicious/noExplicitAny: the drag-and-drop library does not provide types for the ‘source’ object <explanation>
      onDrop({ source }: any) {
        setIsOver(false);
        const sourceTicket = source.data.ticket;
        if (sourceTicket && sourceTicket.stateId !== state.id) {
          handleUpdateTickets({
            id: sourceTicket.id,
            stateId: state.id,
          });
        }
      },
    };

    return dropTargetForElements(dropConfig);
  }, [state.id, handleUpdateTickets]);

  if (isLoadingTickets) {
    return <p>Loading...</p>;
  }

  if (isErrorTickets) {
    return <p>Error loading tickets</p>;
  }

  const ticketsInState = (tickets?.data ?? []).filter(
    (ticket) => ticket.stateId === state.id,
  );

  return (
    <>
      <li>
        <article
          ref={columnRef}
          className={`flex flex-col gap-2 p-2 bg-blue-chill-400 dark:bg-zinc-950 min-w-[300px] rounded max-h-[100%] transition-colors duration-200 ${
            isOver ? "bg-blue-chill-300 dark:bg-zinc-500" : ""
          }`}
        >
          <EachState state={state} />
          <article className={`py-2 overflow-y-scroll rounded `}>
            <ul className="flex flex-col gap-2 overflow-y-hidden">
              {ticketsInState.length === 0 ? (
                <p>No tickets available</p>
              ) : (
                ticketsInState.map((ticket) => (
                  <EachTicket ticket={ticket} key={ticket.id} />
                ))
              )}
            </ul>
          </article>
          <button
            className="flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-blue-chill-500 dark:hover:bg-zinc-800 focus-outline-none"
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
