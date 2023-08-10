import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import AboutPage from '../pages/AboutPage/AboutPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import PrivateRoutes from './PrivateRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

    </Routes>
  )
}

export default AppRoutes