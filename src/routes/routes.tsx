import { Outlet } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { HomePage } from '../task-manager/pages/Home';
import { LoginPage } from '../task-manager/pages/Login';

const App = () => {
  return (
    <>
      <MainLayout>
        <Outlet />;
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
