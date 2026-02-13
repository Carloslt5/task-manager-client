# Mock Server

The app uses [MSW (Mock Service Worker)](https://mswjs.io/) to intercept API requests in the browser, enabling full frontend development without a backend.

## Setup

Source: `src/mock-server/browser.ts`

The MSW worker is initialized with all mock handlers collected from registered modules:

```typescript
import { setupWorker } from "msw/browser";
import { getAllMockHandlers } from "@/app/module-orquestator/modules.helpers";

export const worker = setupWorker(...getAllMockHandlers());
```

The worker is activated conditionally in `main.tsx` based on the `VITE_ENABLE_MSW` environment variable.

## Mock Handlers

Each feature defines its own MSW handlers in a `*.mocks.handlers.ts` file:

| Feature | Handler file |
|---------|-------------|
| Auth | `src/app/features/auth/auth.mocks.handlers.ts` |
| Projects | `src/domains/projects/projects.mocks.handlers.ts` |
| States | `src/domains/projects/features/states/states.mocks.handlers.ts` |
| Tickets | `src/domains/projects/features/tickets/tickets.mocks.handlers.ts` |
| Todos | `src/domains/projects/features/todos/todos.handlers.ts` |

Handlers use `http.get()`, `http.post()`, `http.put()`, `http.delete()` from MSW and return `HttpResponse.json()` responses with optional `delay()`.

Example:

```typescript
http.post("/api/auth/login", async () => {
  await delay(500);
  return HttpResponse.json({ data: userData });
});
```

## Mother Pattern

Mock data is generated using factory classes ("Mothers") with `@faker-js/faker`:

| Mother | Location | Generates |
|--------|----------|-----------|
| `UserMother` | `src/app/features/auth/__mocks__/UserMother.ts` | User objects from a JSON fixture |
| `ProjectMother` | `src/domains/projects/__mocks__/ProjectMother.ts` | Projects with faker product names |
| `StateMother` | `src/domains/projects/__mocks__/StatesMother.ts` | States with ordered names: "TO DO", "In Progress", "Closed" |
| `TicketMother` | `src/domains/projects/__mocks__/TicketsMother.ts` | Tickets with random priority, faker titles, sequential positions |
| `TodoMother` | `src/domains/projects/__mocks__/TodoMother.ts` | Todos with faker sentence titles, random completion status |

Each Mother class provides:

- A method to create a single random entity (e.g., `getRandomTicket()`)
- A method to create a list of N entities (e.g., `getRandomList(n)`)
- Auto-incrementing IDs

## MockData Orchestrator

Source: `src/domains/projects/__mocks__/MockData.ts`

Generates a full relational dataset at import time:

```test
Projects (N)
  └── States (3 per project)
       └── Tickets (5 per state)
            └── Todos (3 per ticket)
```

Exports: `MOCK_PROJECTS_LIST`, `MOCK_STATES_LIST`, `MOCK_TICKETS_LIST`, `MOCK_TODOS_LIST`

These arrays are used by the MSW handlers to serve consistent, interrelated data.
