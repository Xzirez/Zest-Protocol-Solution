import axios from 'axios';
import { useCallback } from 'react';
import { connectWebSocketClient, TransactionEventsResponse } from '@stacks/blockchain-api-client';
import {
  stacksTestNetV1APIUrl,
  stacksWebSocketTestNetV1Url,
  userAddress,
} from '../common/constants';
// This is more a repository not a hook. Reason being error with tests and hooks in next.js.
// Only difference is the memoiziation anyways, which is pretty irrelevant here
const useTransactions = (isSignedIn: boolean) => {
  const subscribeToTransactions = async (testnetAddress: string) => {
    const client = await connectWebSocketClient(stacksWebSocketTestNetV1Url);

    const sub = await client.subscribeAddressTransactions(
      testnetAddress === '' ? userAddress : testnetAddress,
      event => {
        // The solution is to either return the new status and id then match with the object
        // inside the transactions array or to just refetch a single transaction using the id endpoint
        // Way too many issues to solve this one...
        console.log(event);
        return { id: event.tx_id, status: event.tx_status };
      }
    );
    await sub.unsubscribe();
  };

  const getTransaction = async (testnetAddress: string) => {
    // All these with isSignedIn should have an else clause that handles
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
  };

  const getTestTokensFromFaucet = async (testnetAddress: string) => {
    // All these with isSignedIn should have an else clause that handles
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
  };

  return { getTransaction, subscribeToTransactions, getTestTokensFromFaucet };
};

export default useTransactions;
