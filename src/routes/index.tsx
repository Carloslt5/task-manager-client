import { useAuthStore } from '@/store/authStore';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuthStore((state) => state.authToken);

  const routes = auth ? protectedRoutes : publicRoutes;
  const router = createBrowserRouter([...commonRoutes, ...routes]);
  return <RouterProvider router={router} />;
};
