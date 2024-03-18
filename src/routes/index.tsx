import { MainLayout } from '@/components/layout/MainLayout';
import { useAuthStore } from '@/store/authStore';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = useAuthStore((state) => state.authToken);

  const routes = [
    {
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Outlet />,
          children: [...commonRoutes, ...(auth ? protectedRoutes : publicRoutes)],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};
