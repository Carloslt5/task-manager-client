import { useParams } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import EachState from "./EachState";
import { EachTicket } from "../../tickets/components/EachTicket";
import { useTicketsContollers } from "../../tickets/hooks/useTicketsContollers";
import { State } from "../states.type";

type Props = {
  readonly state: State;
};

export const ColumnState = ({ state }: Props) => {
  const { id: projectId } = useParams();

  const { tickets, isLoadingTickets, isErrorTickets } = useTicketsContollers(projectId!);

  if (isLoadingTickets) {
    return <p>Loading...</p>;
  }

  if (isErrorTickets) {
    return <p>Error loading tickets</p>;
  }

  const ticketsInState = (tickets?.data ?? []).filter((ticket) => ticket.stateId === state.id);

  return (
    <li className="">
      <article className="flex flex-col gap-2 p-2 bg-blue-chill-400 dark:bg-zinc-950 min-w-[300px] rounded max-h-[100%]">
        <EachState state={state} />
        <article className={`py-2 overflow-y-scroll rounded `}>
          <ul className="flex flex-col gap-2 overflow-y-hidden">
            {ticketsInState.length === 0 ? (
              <p>No tickets available</p>
            ) : (
              ticketsInState.map((ticket) => <EachTicket ticket={ticket} key={ticket.id} />)
            )}
          </ul>
        </article>
        <button className="flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-blue-chill-500 dark:hover:bg-zinc-800 focus-outline-none ">
          <AddIcon />
          <p>Add Ticket...</p>
        </button>
      </article>
    </li>
  );
};
