import AddIcon from "@mui/icons-material/Add";

import EachState from "./EachState";
import { State } from "../states.type";

type Props = {
  readonly state: State;
};

export const ColumnState = ({ state }: Props) => {
  return (
    <>
      <li>
        <article className="flex flex-col gap-2 p-2 border border-gray-500 min-w-[15rem] bg-slate-700 dark:bg-zinc-950 rounded max-h-[100%]">
          <EachState state={state} />
          <article className={`py-2 overflow-y-scroll rounded `}>
            <ul className="flex flex-col gap-2 overflow-y-hidden"></ul>
          </article>
          <button className="flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-gray-900 dark:hover:bg-zinc-800 focus-outline-none ">
            <AddIcon />
            <p>Add Ticket...</p>
          </button>
        </article>
      </li>
    </>
  );
};
