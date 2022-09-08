import { useCallback, useState } from 'react';
import useTransactions from '../hooks/useTransactions';

const MemPoolTable = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const { getTransaction, subscribeToTransactions, getTestTokensFromFaucet } =
    useTransactions(isSignedIn);

  const GetTransactionsForm = () => {
    const getTransactionsAndSubscribe = useCallback(async (testnetAdress: string) => {
      try {
        setTransactions(await getTransaction(testnetAdress));
      } catch (e: any) {
        console.log(e);
        setError('Get Transactions Request Failed with status code ' + e.response.status);
      }
      subscribeToTransactions(testnetAdress);
    }, []);

    return (
      // I would never do this in prod, but it looks cool to use vanilla html :D
      <form
        onSubmit={event => {
          event.preventDefault();
          getTransactionsAndSubscribe(event.currentTarget.children[0].value);
        }}
      >
        <input id="inputForm" type="text" placeholder="Input testnet address" />
        <button type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
          Get Transactions
        </button>
      </form>
    );
  };

  const GetFuacetTokensForm = () => {
    return (
      // I would never do this in prod, but it looks cool to use vanilla html :D
      <form
        onSubmit={async event => {
          event.preventDefault();
          try {
            await getTestTokensFromFaucet(event.currentTarget.children[0].value);
          } catch (e: any) {
            setError('Faucet Request Failed with status code ' + e.response.status);
          }
        }}
      >
        <input id="inputForm" type="text" placeholder="Input testnet address" />
        <button type="submit" style={{ marginTop: '10px', marginLeft: '5px' }}>
          Get Faucet Tokens
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
      <GetTransactionsForm />
      <GetFuacetTokensForm />
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
