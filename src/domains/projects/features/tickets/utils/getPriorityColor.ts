import { Ticket, Priority } from "../tickets.type";

export const getPriorityColor = (priority: Ticket["priority"]): string => {
  switch (priority) {
    case Priority.HIGH:
      return "bg-red-500";
    case Priority.MEDIUM:
      return "bg-orange-500";
    case Priority.LOW:
      return "bg-yellow-500";
    default:
      return "bg-yellow-500";
  }
};
