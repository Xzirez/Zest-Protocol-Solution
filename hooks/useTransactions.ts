import axios from 'axios';
import { useCallback } from 'react';
import { connectWebSocketClient, TransactionEventsResponse } from '@stacks/blockchain-api-client';
import {
  stacksTestNetV1APIUrl,
  stacksWebSocketTestNetV1Url,
  userAddress,
} from '../common/constants';

const useTransactions = (isSignedIn: boolean) => {
  const subscribeToTransactions = useCallback(async (testnetAddress: string) => {
    const client = await connectWebSocketClient(stacksWebSocketTestNetV1Url);

    const sub = await client.subscribeAddressTransactions(
      testnetAddress === '' ? userAddress : testnetAddress,
      event => {
        console.log(event);
        return event;
      }
    );
    await sub.unsubscribe();
  }, []);

  const getTransaction = useCallback(
    async (testnetAddress: string) => {
      if (isSignedIn) {
        try {
          const response: TransactionEventsResponse = await axios
            .get(
              `${stacksTestNetV1APIUrl}tx/mempool?address=${
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
          const response = await axios.post(`${stacksTestNetV1APIUrl}faucets/stx`, {
            address: testnetAddress,
          });
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
