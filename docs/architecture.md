# Architecture

## Module System

The app uses a custom module orchestrator that provides a plugin-like architecture. Each domain or feature registers itself as a module with routes, menu items, and mock handlers.

### Core Types

Defined in `src/app/app.types.ts`:

```typescript
interface Module {
  name: string;
  parent?: string;
  menuItems?: MenuItem[];
  routes?: RouteObject[];
  mockHandlers?: RequestHandler[];
  permissions?: string[];
}

interface MenuItem {
  title: string;
  icon?: JSX.Element;
  path?: string;
  isAllowed?: (user: User) => boolean;
  priority?: number;
}
```

### How It Works

1. **Registry** (`src/app/module-orquestator/modules.helpers.ts`): Modules are stored in `globalThis.APP_MODULES` as a singleton (avoids Vite HMR issues). Helper functions extract routes, menu items, and mock handlers from all registered modules.

2. **Registration** (`src/app/module-orquestator/modules.ts`): Importing this file triggers side-effect registration of all modules:

   ```typescript
   import "@/app/features/auth";
   import "@/domains/dashboard";
   import "@/domains/projects";
   ```

3. **Domain entry points** (e.g., `src/domains/projects/index.tsx`): Each domain calls `registerModule()` with its routes, menu items, and mock handlers. Sub-features are imported as side-effects:

   ```typescript
   import "./features/states";
   import "./features/tickets";
   import "./features/todos";

   registerModule({ name: MODULE_PROJECT, routes, menuItems, mockHandlers });
   ```

4. **Sub-feature entry points** (e.g., `src/domains/projects/features/tickets/index.tsx`): Register only mock handlers (no routes or menu items of their own):

   ```typescript
   registerModule({ name: MODULE_TICKETS, mockHandlers: ticketsHandlers });
   ```

### Key Helper Functions

| Function | Purpose |
| -------- | ------- |
| `registerModule(module)` | Add a module to the global registry |
| `getAllRoutes()` | Collect all routes from registered modules |
| `getAllowedMenuItems(user)` | Get menu items filtered by user permissions, sorted by priority |
| `getAllMockHandlers()` | Collect all MSW handlers from registered modules |

## Feature Pattern

Each feature follows a consistent file structure:

```text
feature/
├── index.tsx                  # Module registration (side-effect import)
├── feature.constants.ts       # Module name, query keys
├── feature.type.ts            # TypeScript interfaces
├── feature.services.ts        # API calls (Axios)
├── feature.mocks.handlers.ts  # MSW request handlers
├── components/                # React components
├── hooks/                     # Custom hooks (queries, mutations)
└── utils/                     # Feature-specific utilities
```

## React Query Patterns

- **Query keys** are defined in `*.constants.ts` files for each feature
- **Query hooks** wrap `useQuery` with the appropriate service call and key
- **Mutation hooks** use `useMutation` with optimistic updates:
  1. `onMutate`: Cancel queries, snapshot cache, apply optimistic update
  2. `onError`: Rollback to snapshot
  3. `onSettled`: Invalidate queries to refetch

See [Drag & Drop](drag-and-drop.md) for an example of optimistic updates in `useReorderTickets`.
