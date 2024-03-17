import { UserRoutes } from '@/features/user';
import { MainLayout } from '@/layout/MainLayout';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '*', element: <UserRoutes /> }],
  },
];
