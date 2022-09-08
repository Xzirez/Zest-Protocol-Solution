import '../styles/globals.css';
import { ClientProvider } from '@micro-stacks/react';
import { useCallback } from 'react';

import type { AppProps } from 'next/app';
import type { ClientConfig } from '@micro-stacks/client';

function MyApp({ Component, pageProps }: AppProps) {
  const onSignOut: ClientConfig['onSignOut'] = useCallback(async () => {}, []);

  return (
    <ClientProvider appName="Zest Protocol Solution" appIconUrl="/vercel.png" onSignOut={onSignOut}>
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default MyApp;
