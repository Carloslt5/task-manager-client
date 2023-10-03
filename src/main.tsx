import './utils/darkMode.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProviderWrapper } from './contexts/auth.context'
import { KanbanProviderWrapper } from './contexts/kanban.context.tsx'
import { ProjectProviderWrapper } from './contexts/project.context.tsx'
import { TicketProviderWrapper } from './contexts/ticket.context.tsx'
import { ToDoProviderWrapper } from './contexts/todo.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <KanbanProviderWrapper>
          <ProjectProviderWrapper>
            <TicketProviderWrapper>
              <ToDoProviderWrapper>
                <App />
              </ToDoProviderWrapper>
            </TicketProviderWrapper>
          </ProjectProviderWrapper>
        </KanbanProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
)
