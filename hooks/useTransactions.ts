import axios from 'axios';
import { useCallback } from 'react';
import { connectWebSocketClient, TransactionEventsResponse } from '@stacks/blockchain-api-client';
import { userAddress } from '../common/constants';

const useTransactions = (isSignedIn: boolean) => {
  const subscribeToTransactions = useCallback(async (testnetAddress: string) => {
    const client = await connectWebSocketClient('ws://stacks-node-api.stacks.co/');

    const sub = await client.subscribeAddressTransactions(
      testnetAddress === '' ? userAddress : testnetAddress,
      event => {
        console.log(event);
      }
    );
    return sub;
  }, []);

  const getTransaction = useCallback(
    async (testnetAddress: string) => {
      if (isSignedIn) {
        try {
          const response: TransactionEventsResponse = await axios
            .get(
              `https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool?address=${
                testnetAddress === '' ? userAddress : testnetAddress
              }`
            )
            .then(res => res.data);
          return response;
        } catch (e) {
          throw e;
        }
      }
    },
    [isSignedIn]
  );

  const getTestTokensFromFaucet = useCallback(
    async (testnetAddress: string) => {
      if (isSignedIn) {
        try {
          const response = await axios.post(
            'https://stacks-node-api.testnet.stacks.co/extended/v1/faucets/stx',
            { address: testnetAddress }
          );
          return response.data;
        } catch (e) {
          throw e;
        }
      }
    },
    [isSignedIn]
  );

  return { getTransaction, subscribeToTransactions, getTestTokensFromFaucet };
};

export default useTransactions;
