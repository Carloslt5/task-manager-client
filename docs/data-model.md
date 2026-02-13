# Data Model

## Entity Relationships

``` test
User
 └── Project (ownerId)
      └── State (projectId)
           └── Ticket (stateId, projectId)
                └── Todo (ticketId)
```

A **User** owns multiple **Projects**. Each Project has multiple **States** (columns like "TO DO", "In Progress", "Closed"). Each State contains multiple **Tickets** ordered by `position`. Each Ticket can have multiple **Todos** (checklist items).

## TypeScript Interfaces

### User

Source: `src/app/features/auth/auth.types.ts`

```typescript
interface User {
  login: string;
  email: string;
  name: string;
  userId: string;
  roles: UserRoles[];
  permissions: string[];
  userData: {
    description: string;
    employeeId: string;
    employeeNumber: number;
    id: string;
    login: string;
    mail: string;
    name: string;
  };
}

enum UserRoles {
  ADMIN = "admin",
  STAFF = "staff",
}
```

### Project

Source: `src/domains/projects/projects.type.ts`

```typescript
interface Project {
  id: string;
  title: string;
  states: State[];
  ownerId?: string;
}
```

### State

Source: `src/domains/projects/features/states/states.type.ts`

```typescript
interface State {
  id: string;
  stateName: string;
  projectId: string;
}
```

### Ticket

Source: `src/domains/projects/features/tickets/tickets.type.ts`

```typescript
enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

interface Ticket {
  id: string;
  stateId: string;
  projectId: string;
  priority: PrioriryName; // "low" | "medium" | "high"
  title: string;
  description: string;
  position: number;
}

interface ReorderTicketsPayload {
  projectId: string;
  updates: Array<{ id: string; stateId: string; position: number }>;
}
```

### Todo

Source: `src/domains/projects/features/todos/todos.types.ts`

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  ticketId: string;
}
```
