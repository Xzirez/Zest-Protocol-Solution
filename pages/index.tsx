import styles from '../styles/Home.module.css';
import { WalletConnectButton } from '../components/wallet-connect-button';
import { UserCard } from '../components/user-card';

import type { NextPage, GetServerSidePropsContext } from 'next';
import MemPoolTable from '../components/mem-pool-table';
import { useAuth } from '@micro-stacks/react';
import { useMemo } from 'react';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  const { isSignedIn } = useAuth();

  const memPoolMemo = useMemo(
    () => isSignedIn && <MemPoolTable isSignedIn={isSignedIn} />,
    [isSignedIn]
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <UserCard />
        <WalletConnectButton />
        {memPoolMemo}
      </main>
    </div>
  );
};

export default Home;
