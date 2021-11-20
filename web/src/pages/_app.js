import React, { useState, useEffect } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.scss';

function MyApp({ Component, pageProps }) {
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

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    window.scrollTo(0, 0);

    function onFirstScroll() {
      window.history.scrollRestoration = 'auto';
      window.removeEventListener('scroll', onFirstScroll, false);
    }

    window.addEventListener('scroll', onFirstScroll, false);

    return () => {
      window.removeEventListener('scroll', onFirstScroll, false);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
