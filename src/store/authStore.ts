import authservices from '@/services/auth.services';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  authToken: string | null;
  user: Auth | null;
};

type AuthAction = {
  setToken: (authToken: string) => void;
  authenticate: () => void;
};

export const useAuthStore = create(
  persist<AuthState & AuthAction>(
    (set) => ({
      authToken: null,
      user: null,
      setToken: (authToken: string) => set((_state) => ({ authToken })),
      authenticate: async () => {
        const tokenString = localStorage.getItem('auth');
        if (tokenString) {
          const tokenObject = JSON.parse(tokenString);
          const authToken = tokenObject.state.authToken;
          const { data } = await authservices.verify(authToken);
          set(() => ({
            user: data,
          }));
        }
      },
    }),
    {
      name: 'auth',
    },
  ),
);
