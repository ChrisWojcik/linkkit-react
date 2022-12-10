import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrentUserProvider } from '@/web/lib/auth';
import Router from './Router';
import RouteAnnouncer from '@/web/components/RouteAnnouncer';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 1000, // 1 min
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const user = window.__INITIAL_STATE__?.auth?.user || null;

  return (
    <CurrentUserProvider user={user}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <RouteAnnouncer />
      </QueryClientProvider>
    </CurrentUserProvider>
  );
}

export default App;
