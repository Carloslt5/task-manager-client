import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import AboutPage from '../pages/AboutPage/AboutPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import PrivateRoutes from './PrivateRoutes'
import TaskPage from '../pages/TaskPage/TaskPage'
import KanbanBoardPage from '../pages/KanbanBoardPage/KanbanBoardPage'
import ProjectPage from '../pages/ProjectPage/ProjectPage'
import BoardPage from '../pages/BoardPage/BoardPage'
import { ToDoProviderWrapper } from '../contexts/todo.context'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />

      <Route element={<>
        <Breadcrumbs />
        <PrivateRoutes />
      </>
      }>
        <Route path='/:id' element={<BoardPage />} />
        <Route path='/:id/:kanbanBoardId' element={<KanbanBoardPage />} />
        <Route path='/:id/:kanbanBoardId/:projectId' element={<ProjectPage />} />
        <Route path='/:id/task' element={<TaskPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes