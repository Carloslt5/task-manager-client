import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { queryClient as defaultQueryClient } from "./libs/queryClient";

type Props = {
  readonly children: React.ReactNode;
  readonly queryClient?: QueryClient;
};

export function AppProviders({ children, queryClient = defaultQueryClient }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
