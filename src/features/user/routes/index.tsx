import { ProjectRoutes } from '@/features/project/routes';
import { DashboardPage } from '@/features/user/pages/Dashboard';
import { PrivateRoutes } from '@/providers/PrivateRoutes';
import { Route, Routes } from 'react-router-dom';

export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="project/*" element={<ProjectRoutes />} />
      </Route>
    </Routes>
  );
};
