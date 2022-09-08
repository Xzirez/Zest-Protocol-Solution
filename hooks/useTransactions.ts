import { useAccount } from '@micro-stacks/react';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { connectWebSocketClient } from '@stacks/blockchain-api-client';
import { userAddress } from '../constants';

const useTransactions = (isSignedIn: { isSignedIn: boolean }) => {
  const subscribeToTransactions = useCallback(async () => {
    const client = await connectWebSocketClient('ws://stacks-node-api.stacks.co/');

    const sub = await client.subscribeAddressTransactions(userAddress, event => {
      console.log(event);
    });
    return sub;
  }, []);

  const getTransaction = useCallback(async (testnetAddress: string) => {
    if (isSignedIn) {
      try {
        const response = await axios.get(
          `https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool?address=${testnetAddress}`
        );
        return response.data.results;
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }, [isSignedIn]);



  return { getTransaction, subscribeToTransactions };
};

export default useTransactions;
