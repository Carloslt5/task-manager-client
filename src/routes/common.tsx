import { MainLayout } from '@/layout/MainLayout';
import { HomePage } from '@/pages/Home';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const commonRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '', element: <HomePage /> }],
  },
];
