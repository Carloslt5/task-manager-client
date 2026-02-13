# Drag & Drop

The app uses `@atlaskit/pragmatic-drag-and-drop` to enable ticket reordering within and between state columns.

## Libraries

- `@atlaskit/pragmatic-drag-and-drop` — core `draggable()` and `dropTargetForElements()` APIs
- `@atlaskit/pragmatic-drag-and-drop-hitbox` — `attachClosestEdge()` and `extractClosestEdge()` for detecting drop position ("top" or "bottom")

## Component: EachTicket

Source: `src/domains/projects/features/tickets/components/EachTicket.tsx`

Each ticket is both a **drag source** and a **drop target**, combined via `combine()`:

```typescript
combine(
  draggable({
    element: dragRef.current,
    getInitialData: () => ({ ticketId: ticket.id, stateId: ticket.stateId }),
    onDragStart: () => setIsDragging(true),
    onDrop: () => setIsDragging(false),
  }),
  dropTargetForElements({
    element: dragRef.current,
    getData: ({ input, element }) => attachClosestEdge(
      { ticketId: ticket.id, stateId: ticket.stateId },
      { input, element, allowedEdges: ["top", "bottom"] }
    ),
    onDragEnter: ({ self }) => setClosestEdge(extractClosestEdge(self.data)),
    onDragLeave: () => setClosestEdge(null),
    onDrop: () => setClosestEdge(null),
  })
)
```

A visual indicator (thin blue line) appears at the closest edge when a ticket is being dragged over.

## Reorder Utilities

Source: `src/domains/projects/features/tickets/utils/reorderUtils.ts`

Two pure functions handle position recalculation:

### `reorderWithinColumn()`

Reorders tickets within the same state column. Takes the column's tickets, source/target ticket IDs, and edge position. Returns an array of `TicketUpdate` objects with recalculated `position` values.

### `moveBetweenColumns()`

Moves a ticket from one state column to another. Updates positions in both source and destination columns. Returns all affected ticket updates with new `stateId` and `position` fields.

Both functions return `TicketUpdate[]`:

```typescript
type TicketUpdate = { id: string; stateId: string; position: number };
```

## Mutation Hook: useReorderTickets

Source: `src/domains/projects/features/tickets/hooks/useReorderTickets.tsx`

Handles the API call with **optimistic updates**:

1. **`onMutate`**: Cancels running queries, snapshots current cache, applies position updates immediately to the query cache
2. **`onError`**: Rolls back to the snapshot
3. **`onSettled`**: Invalidates the tickets query to refetch from server

## Data Flow

```text
User drags ticket
  → EachTicket: draggable() fires onDragStart
  → EachTicket: dropTarget detects closest edge
  → onDrop: call reorderWithinColumn() or moveBetweenColumns()
  → useReorderTickets.mutate(updates)
    → Optimistic cache update (instant UI)
    → API call (reorderTickets service)
    → On settle: invalidate + refetch
```
