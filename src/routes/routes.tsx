import { MainLayout } from '@/components/MainLayout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
];
