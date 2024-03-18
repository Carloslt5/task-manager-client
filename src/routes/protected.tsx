import { UserRoutes } from '@/features/user';

export const protectedRoutes = [{ path: '/*', element: <UserRoutes /> }];
