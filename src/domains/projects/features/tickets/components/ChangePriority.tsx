import { useState } from "react";

import { PRIORITY_ARRAY, PrioriryName, Ticket } from "../tickets.type";
import { getPriorityColor } from "../utils/getPriorityColor";

interface ChangeDetails {
  data: Ticket;
  handleUpdateTickets: (newTicketData: Partial<Ticket>) => void;
}

export const ChangePriority: React.FC<ChangeDetails> = ({
  data,
  handleUpdateTickets,
}) => {
  const [selectedPriority, setSelectedPriority] = useState(data.priority);

  const handlePriorityChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPriority = event.target.value as PrioriryName;
    setSelectedPriority(newPriority);

    try {
      await handleUpdateTickets({ id: data.id, priority: newPriority });
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: Todo <explanation>
      console.log(error);
    }
  };

  const priorityColor = getPriorityColor(data.priority);

  return (
    <article className="flex items-center w-full gap-2 py-1 text-sm">
      <p>Priority:</p>
      <div className={`${priorityColor} h-4 w-4 rounded-full`} />
      <select
        className="text-slate-500 bg-blue-chill-50 dark:bg-zinc-50"
        value={selectedPriority}
        onChange={handlePriorityChange}
      >
        {PRIORITY_ARRAY.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </article>
  );
};
