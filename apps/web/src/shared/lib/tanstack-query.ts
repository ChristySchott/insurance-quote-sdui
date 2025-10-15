import { QueryClient } from '@tanstack/react-query'

const TEN_MINUTES_IN_MS = 10 * 60 * 1000
const FIVE_MINUTES_IN_MS = 5 * 60 * 1000

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES_IN_MS,
      gcTime: TEN_MINUTES_IN_MS,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error instanceof Error && 'status' in error) {
          const status = error?.status as number

          if (status >= 400 && status < 500) {
            return false
          }
        }

        return failureCount < 1
      },
    },
  },
})
