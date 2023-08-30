import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProviderWrapper } from './contexts/auth.context'
import { ToDoProviderWrapper } from './contexts/todo.context.tsx'
import { KanbanProviderWrapper } from './contexts/kanban.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <KanbanProviderWrapper>
        <ToDoProviderWrapper>
          <Router>
            <App />
          </Router>
        </ToDoProviderWrapper>
      </KanbanProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>
)
