import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoutes = () => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log('---------- PRIVATE ROUTES --------------');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
  }, [navigate, isAuthenticated]);

  return <Outlet />;
};
