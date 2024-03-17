import { AuthRoutes } from '@/features/auth';
import { MainLayout } from '@/layout/MainLayout';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '*', element: <AuthRoutes /> }],
  },
];
