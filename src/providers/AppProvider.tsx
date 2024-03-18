import { queryClient } from '@/lib/tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
