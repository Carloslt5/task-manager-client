import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const defaultQueryClientOptions = {
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
  // queryCache: defaultQueryCache,
  // mutationCache: defaultMutationCache,
};

export function queryClientFactory(options?: QueryClientConfig) {
  return new QueryClient({ ...defaultQueryClientOptions, ...options });
}

export const queryClient = queryClientFactory();
