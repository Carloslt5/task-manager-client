export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export const PRIORITY_ARRAY = [
  Priority.LOW,
  Priority.MEDIUM,
  Priority.HIGH,
] as const;

export type PrioriryName = (typeof PRIORITY_ARRAY)[number];

export interface Ticket {
  id: string;
  stateId: string;
  projectId: string;
  priority: PrioriryName;
  title: string;
  description: string;
}
