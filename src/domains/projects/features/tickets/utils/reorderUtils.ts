import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { Ticket } from "../tickets.type";

type TicketUpdate = { id: string; stateId: string; position: number };

export function reorderWithinColumn(
  columnTickets: Ticket[],
  sourceId: string,
  targetId: string,
  edge: Edge,
): TicketUpdate[] {
  const sorted = [...columnTickets].sort((a, b) => a.position - b.position);
  const sourceIndex = sorted.findIndex((t) => t.id === sourceId);
  const targetIndex = sorted.findIndex((t) => t.id === targetId);

  if (sourceIndex === -1 || targetIndex === -1) return [];

  const [moved] = sorted.splice(sourceIndex, 1);
  let insertIndex = sorted.findIndex((t) => t.id === targetId);

  if (edge === "bottom") {
    insertIndex += 1;
  }

  sorted.splice(insertIndex, 0, moved);

  return sorted.map((ticket, index) => ({
    id: ticket.id,
    stateId: ticket.stateId,
    position: index,
  }));
}

export function moveBetweenColumns(
  sourceColumnTickets: Ticket[],
  destColumnTickets: Ticket[],
  sourceTicketId: string,
  destStateId: string,
  targetTicketId: string | null,
  edge: Edge | null,
): TicketUpdate[] {
  const sortedSource = [...sourceColumnTickets].sort(
    (a, b) => a.position - b.position,
  );
  const sortedDest = [...destColumnTickets].sort(
    (a, b) => a.position - b.position,
  );

  const sourceIndex = sortedSource.findIndex((t) => t.id === sourceTicketId);
  if (sourceIndex === -1) return [];

  const [moved] = sortedSource.splice(sourceIndex, 1);

  let insertIndex = sortedDest.length;

  if (targetTicketId && edge) {
    const targetIndex = sortedDest.findIndex((t) => t.id === targetTicketId);
    if (targetIndex !== -1) {
      insertIndex = edge === "bottom" ? targetIndex + 1 : targetIndex;
    }
  }

  sortedDest.splice(insertIndex, 0, { ...moved, stateId: destStateId });

  const updates: TicketUpdate[] = [];

  for (let i = 0; i < sortedSource.length; i++) {
    updates.push({
      id: sortedSource[i].id,
      stateId: sortedSource[i].stateId,
      position: i,
    });
  }

  for (let i = 0; i < sortedDest.length; i++) {
    updates.push({
      id: sortedDest[i].id,
      stateId: destStateId,
      position: i,
    });
  }

  return updates;
}
