import { useAccount, useAuth } from '@micro-stacks/react';
import { Subscription } from '@project-serum/anchor';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import useTransactions from '../hooks/useTransactions';

const MemPoolTable = ({ isSignedIn }: { isSignedIn: boolean }) => {
  const { getTransaction, transactions } = useTransactions({ isSignedIn });

  return (
    <>
      <button style={{ marginTop: '10px' }} onClick={() => getTransaction()}>
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
        <div>Error Could not load transaction</div>
      )}
    </>
  );
};

export default MemPoolTable;
