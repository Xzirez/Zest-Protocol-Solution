import { useCallback, useEffect, useRef, useState } from 'react';
import useTransactions from '../hooks/useTransactions';

const MemPoolTable = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const [transactions, setTransactions] = useState([]);

  const FormAndButton = () => {
    const { getTransaction, subscribeToTransactions } = useTransactions({ isSignedIn });

    const getTransactionsAndSubscribe = useCallback(
      async (testnetAdress: string) => {
        setTransactions(await getTransaction(testnetAdress));
        subscribeToTransactions();
      },
      [getTransaction, subscribeToTransactions]
    );
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          getTransactionsAndSubscribe(event.currentTarget.children[0].value);
        }}
      >
        <input id="inputForm" type="text" placeholder="Input testnet address" />
        <button type="submit" style={{ marginTop: '10px' }}>
          Get Transactions
        </button>
      </form>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        marginTop: '10px',
        alignItems: 'center',
      }}
    >
      <FormAndButton />
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
    </div>
  );
};

export default MemPoolTable;
