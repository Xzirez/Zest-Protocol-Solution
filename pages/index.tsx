import styles from '../styles/Home.module.css';
import { WalletConnectButton } from '../components/wallet-connect-button';
import { UserCard } from '../components/user-card';

import type { NextPage } from 'next';
import MemPoolTable from '../components/mem-pool-table';
import { useAuth } from '@micro-stacks/react';
import { useMemo } from 'react';

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
          Zest Protocol Solution <a href="https://github.com/Xzirez/Zest-Protocol-Solution">Repo</a>
        </h1>
        <UserCard />
        <WalletConnectButton />
        {memPoolMemo}
      </main>
    </div>
  );
};

export default Home;
