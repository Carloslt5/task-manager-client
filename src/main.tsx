import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProviderWrapper } from './contexts/auth.context'
import { ToDoProviderWrapper } from './contexts/todo.context.tsx'
import { KanbanProviderWrapper } from './contexts/kanban.context.tsx'
import { ProjectProviderWrapper } from './contexts/project.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <KanbanProviderWrapper>
        <ProjectProviderWrapper>
          <ToDoProviderWrapper>
            <Router>
              <App />
            </Router>
          </ToDoProviderWrapper>
        </ProjectProviderWrapper>
      </KanbanProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>
)
