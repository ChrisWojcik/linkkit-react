import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/web/lib/auth';
import router from './router';

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

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
