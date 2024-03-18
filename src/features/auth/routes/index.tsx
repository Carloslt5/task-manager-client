import { LoginPage } from '@/pages/Login';
import { SignupPage } from '@/pages/Signup';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
