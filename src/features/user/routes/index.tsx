import { ProjectRoutes } from '@/features/project/routes';
import { DashboardPage } from '@/features/user/pages/Dashboard';
import { Route, Routes } from 'react-router-dom';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="*" element={<ProjectRoutes />} />
    </Routes>
  );
};
