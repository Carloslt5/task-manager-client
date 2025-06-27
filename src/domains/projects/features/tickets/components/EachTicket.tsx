import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

import { useModalHook } from "@/shared/hooks/useModalHook";
import { Ticket } from "../tickets.type";
import { getPriorityColor } from "../utils/getPriorityColor";
import { TicketDetails } from "./TicketDetails";

type Props = {
  ticket: Ticket;
};

export const EachTicket: React.FC<Props> = ({ ticket }) => {
  const { modalProps, openModal } = useModalHook();

  const priorityColor = getPriorityColor(ticket.priority);

  const ref = useRef<HTMLLIElement | null>(null);
  const [isDragging, setDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const dragConfig = {
      element,
      getInitialData() {
        return { ticket };
      },
      onDragStart() {
        setDragging(true);
      },
      onDrop() {
        setDragging(false);
      },
    };

    return draggable(dragConfig);
  }, [ticket]);

  return (
    <>
      <li
        onClick={openModal}
        ref={ref}
        className={`flex justify-start items-stretch gap-2 bg-blue-chill-600 dark:text-white overflow-hidden rounded cursor-pointer hover:bg-blue-chill-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 h-20 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <div className={`${priorityColor} w-3`} />
        <p className="py-2">{ticket.id}</p>
        <p className="py-2">{ticket.title}</p>
      </li>

      {modalProps.open && <TicketDetails {...modalProps} ticket={ticket} />}
    </>
  );
};
