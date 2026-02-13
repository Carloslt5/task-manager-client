import { useParams } from "react-router-dom";

import { useStatesControllers } from "../hooks/useStatesControllers";
import { ColumnState } from "./ColumnState";

export const StatesContainer = () => {
  const { id: projectId } = useParams();

  const { states, isLoadingStates, isErrorStates } = useStatesControllers(
    projectId!,
  );

  const renderContent = () => {
    if (isLoadingStates) {
      return (
        <p className="text-center text-slate-500 dark:text-zinc-500">
          Loading states...
        </p>
      );
    }

    if (isErrorStates) {
      return (
        <p className="text-center text-red-500 dark:text-red-400">
          Error loading states.
        </p>
      );
    }

    if (states && states?.data?.length > 0) {
      return states.data.map((state) => (
        <ColumnState key={state.id} state={state} />
      ));
    }

    return (
      <p className="text-center text-slate-500 dark:text-zinc-500">
        Add your first state
      </p>
    );
  };

  return (
    <section className="h-[75%] mt-2">
      <ul className="flex flex-row items-stretch max-h-full gap-4 pb-2 mb-3 overflow-y-auto text-white">
        {renderContent()}
      </ul>
      <p className="mt-2 text-sm text-center text-slate-500 dark:text-zinc-500">
        Drag and Drop ticket to change state
      </p>
    </section>
  );
};
