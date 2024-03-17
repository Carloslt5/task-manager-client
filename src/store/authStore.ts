import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  authToken: string | null;
};

type AuthAction = {
  setToken: (authToken: string) => void;
};

export const useAuthStore = create(
  persist<AuthState & AuthAction>(
    (set) => ({
      authToken: null,
      setToken: (authToken: string) => set((_state) => ({ authToken })),
    }),
    {
      name: 'auth',
    },
  ),
);
