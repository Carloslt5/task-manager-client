import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const [test] = useState(false);

  const routes = test ? protectedRoutes : publicRoutes;
  const router = createBrowserRouter([...commonRoutes, ...routes]);
  return <RouterProvider router={router} />;
};
