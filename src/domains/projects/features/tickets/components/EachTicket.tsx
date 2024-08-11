import { useModalHook } from "@/shared/hooks/useModalHook";

import { TicketDetails } from "./TicketDetails";
import { Ticket } from "../tickets.type";
import { getPriorityColor } from "../utils/getPriorityColor";

type Props = {
  ticket: Ticket;
};

export const EachTicket: React.FC<Props> = ({ ticket }) => {
  const { modalProps, openModal } = useModalHook();

  const priorityColor = getPriorityColor(ticket.priority);
  return (
    <>
      <li
        onClick={openModal}
        className={`flex justify-start items-stretch gap-2 bg-blue-chill-600 dark:text-white overflow-hidden rounded cursor-pointer hover:bg-blue-chill-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 h-20`}
      >
        <div className={`${priorityColor} w-3`} />
        <p className="py-2">{ticket.name}</p>
      </li>

      {modalProps.open && <TicketDetails {...modalProps} ticket={ticket} />}
    </>
  );
};
