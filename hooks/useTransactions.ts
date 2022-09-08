import { useAccount } from '@micro-stacks/react';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { connectWebSocketClient } from '@stacks/blockchain-api-client';

interface UseTransactionModel {
  isSignedIn: boolean;
}

const useTransactions = (isSignedIn: UseTransactionModel) => {
  const { stxAddress: publicAddress } = useAccount();
  const [transactions, setTransactions] = useState([]);

  const subscribeToTransactions = useCallback(async () => {
    const client = await connectWebSocketClient('ws://stacks-node-api.stacks.co/');

    const sub = publicAddress
      ? await client.subscribeAddressTransactions(publicAddress, event => {
          console.log(event);
        })
      : null;

    return sub;
  }, [publicAddress]);

  const getTransaction = useCallback(async () => {
    if (isSignedIn) {
      try {
        const response = await axios.get(
          `https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool?address=${publicAddress}`
        );
        setTransactions(response.data.results);
      } catch (e) {
        console.error(e);
        throw e;
      }
      subscribeToTransactions();
    }
  }, [publicAddress, isSignedIn, subscribeToTransactions]);

  return { transactions, getTransaction, subscribeToTransactions };
};

export default useTransactions;
