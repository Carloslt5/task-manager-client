import { Ticket } from "../tickets.type";

export const TICKET_PRIORITY = ["Low", "Medium", "High"];

export const getPriorityColor = (priority: Ticket["priority"]): string => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-orange-500";
    case "low":
      return "bg-yellow-500";
    default:
      return "bg-yellow-500";
  }
};
