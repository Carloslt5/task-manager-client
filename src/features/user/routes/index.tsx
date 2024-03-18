import { DashboardPage } from '@/pages/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard/:id" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  );
};
