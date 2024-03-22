import { UserRoutes } from '@/features/user/routes';

export const protectedRoutes = [{ path: '/*', element: <UserRoutes /> }];
