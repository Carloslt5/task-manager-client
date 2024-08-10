export interface Ticket {
  id: string;
  stateId: string;
  projectId: string;
  priority: "low" | "medium" | "high";
  name: string;
  description: string;
}
