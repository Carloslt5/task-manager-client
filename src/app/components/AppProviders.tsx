import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProviderWrapper } from "../contexts/theme.context";
import { AuthProvider } from "../features/auth/auth.context";
import { queryClient as defaultQueryClient } from "../libs/queryClient";

type Props = {
  readonly children: React.ReactNode;
  readonly queryClient?: QueryClient;
};

export function AppProviders({
  children,
  queryClient = defaultQueryClient,
}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
}
