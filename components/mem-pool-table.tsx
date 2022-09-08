import { useCallback, useEffect, useRef, useState } from 'react';
import useTransactions from '../hooks/useTransactions';

const MemPoolTable = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const [transactions, setTransactions] = useState([]);
  const { getTransaction, subscribeToTransactions } = useTransactions({ isSignedIn });

  const getTransactionsAndSubscribe = useCallback(async () => {
    setTransactions(await getTransaction());
    subscribeToTransactions();
  }, [getTransaction, subscribeToTransactions]);

  return (
    <>
      <button style={{ marginTop: '10px' }} onClick={() => getTransactionsAndSubscribe()}>
        Get Transactions
      </button>
      {transactions ? (
        <div>
          {transactions.map(transaction => (
            <div key={`key: ${transaction.tx_id}`}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <p>TransactionId: {transaction.tx_id}</p>
                <p>Status: {transaction.tx_status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Transactions to show</div>
      )}
    </>
  );
};

export default MemPoolTable;
