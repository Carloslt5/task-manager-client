import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
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
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
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
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          const sourceTicket = (source.data as { ticket: Ticket }).ticket;
          return sourceTicket?.id !== ticket.id;
        },
        getData({ input, element }) {
          return attachClosestEdge(
            { ticket },
            { input, element, allowedEdges: ["top", "bottom"] },
          );
        },
        onDragEnter({ self }) {
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDrag({ self }) {
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
      }),
    );
  }, [ticket]);

  return (
    <>
      <li
        onClick={openModal}
        ref={ref}
        className={`relative flex justify-start items-stretch gap-2 bg-blue-chill-600 dark:text-white overflow-hidden rounded cursor-pointer hover:bg-blue-chill-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 h-20 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {closestEdge === "top" && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />
        )}
        <div className={`${priorityColor} w-3`} />
        <article className="flex flex-col justify-start p-2 w-full">
          <p>Ticket ID: {ticket.id}</p>
          <p>{ticket.title}</p>
        </article>
        {closestEdge === "bottom" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400" />
        )}
      </li>

      {modalProps.open && <TicketDetails {...modalProps} ticket={ticket} />}
    </>
  );
};
