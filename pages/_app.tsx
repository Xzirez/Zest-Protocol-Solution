import '../styles/globals.css';
import { ClientProvider } from '@micro-stacks/react';
import { useCallback } from 'react';

import type { AppProps } from 'next/app';
import { ClientConfig, MicroStacksClient } from '@micro-stacks/client';
import { destroySession, saveSession } from '../common/fetchers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider
      network={'testnet'}
      appName="Test"
      appIconUrl="/vercel.png"
      dehydratedState={pageProps?.dehydratedState}
      onPersistState={useCallback(async (dehydratedState: string) => {
        await saveSession(dehydratedState);
      }, [])}
      onSignOut={useCallback(async () => {
        await destroySession();
      }, [])}
    >
      <Component {...pageProps} />
    </ClientProvider>
  );
}

export default MyApp;
