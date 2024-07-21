# Task Manager Client
![Version 2 - In Progress](https://img.shields.io/badge/V.2.0-progress-yellow)

This project is a task list application that uses a Kanban layout to organize tasks and allows drag-and-drop functionality for an intuitive user experience.

### Deploy
![v.1 - Deploy](https://img.shields.io/badge/V.1.0-is%20deploy-green)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3cf7b717-bb14-4d3b-8222-15e262f69310/deploy-status)](https://app.netlify.com/sites/kanban-manager-app/deploys)

https://kanban-manager-app.netlify.app

### User Test
You can also register [sign up](https://kanban-todo-app.netlify.app/signup) 👍

1. User:

```
02@email.com
```

2. Password:

```
1234
```

## Getting Started

### Prerequisites

- Node.js (>=16.0.0)
- npm (>=10.8.0)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Carloslt5/task-manager-client.git
   cd task-manager-client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Development

To start the development server:

```sh
npm start
```

This will start the Vite development server and open the application in your default web browser.

## Features

- **User session with JWT**
- **Drag-and-Drop:** Easily move tasks ✅ .
- **Tailwind:** Theme Light 🌞 and Dark 🌚

## Technologies

- React
- React DOM
- React Router DOM
- TypeScript
- Vite
- Mock Service Worker (MSW) to development
- Axios
- Hooks-form
- Toastify
- ESLint (with plugins for TypeScript, React, and Prettier)

## Rest API

https://github.com/Carloslt5/task-manager-server

## DDBB
Project
  - id
  - title
  - ownerId

State
  - id
  - title
  - Project ID

Ticket
  - id
  - State ID
  - Project ID
  - Priority
  - name
  - description