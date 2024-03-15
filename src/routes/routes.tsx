import { Outlet } from 'react-router-dom';
import { HomePage } from '../task-manager/pages/Home';
import { LoginPage } from '../task-manager/pages/Login';

const App = () => {
  return (
    <>
      <Outlet />;
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
