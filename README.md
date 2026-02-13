# Kanban Manager

![Version 2 - Deploy](https://img.shields.io/badge/V.2.0-deploy-brightgreen)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3cf7b717-bb14-4d3b-8222-15e262f69310/deploy-status)](https://app.netlify.com/sites/kanban-manager-app/deploys)

Kanban-style task management app built with React + TypeScript. Features drag-and-drop ticket ordering, light/dark theming, and a fully mocked API server for frontend-only development.

## Quick Start

### Prerequisites

- Node.js (>=16.0.0)
- npm (>=10.8.0)

### Installation

```sh
git clone https://github.com/Carloslt5/task-manager-client.git
cd kanban-manager
npm install
npm start
```

## Documentation

| Topic | Description |
| ----- | ----------- |
| [Architecture](docs/architecture.md) | Project structure, module system, feature patterns |
| [Data Model](docs/data-model.md) | Entities, relationships, TypeScript interfaces |
| [Drag & Drop](docs/drag-and-drop.md) | DnD implementation with pragmatic-drag-and-drop |
| [Theming](docs/theming.md) | Tailwind CSS v4 theme system, dark mode, custom utilities |
| [Mock Server](docs/mock-server.md) | MSW setup, Mother pattern, mock data generation |
| [Auth](docs/auth.md) | Authentication context, login flow, test credentials |

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Server State:** TanStack React Query
- **Forms:** react-hook-form
- **Drag & Drop:** @atlaskit/pragmatic-drag-and-drop
- **Styling:** Tailwind CSS v4
- **Mock API:** MSW (Mock Service Worker) + Faker.js
- **Linting:** Biome

## Links

- **Deploy (v1):** <https://kanban-manager-app.netlify.app>
