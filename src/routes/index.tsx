import { routes } from '@/routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const AppRoutes = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
