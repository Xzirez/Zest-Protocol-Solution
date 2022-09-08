import { AxiosError } from 'axios';
import { userAddress } from '../common/constants';
import useTransactions from './useTransactions';
// These are mostly integration as integration is usually higher value.
// If we go for unit tests it should be higher coverage. I love unit tests tho.
describe('useTransaction', () => {
  it('supports value comparison', () => {
    const { getTransaction, getTestTokensFromFaucet } = useTransactions(true);
    expect(true).toEqual(true);
    expect(false).not.toEqual(true);
    expect(getTransaction).not.toEqual(getTestTokensFromFaucet);
  });
  describe('getTransaction', () => {
    it('initializes', async () => {
      const { getTransaction } = useTransactions(true);
      expect(getTransaction).not.toBeUndefined();
    });
    it('transaction with results', async () => {
      const { getTransaction, getTestTokensFromFaucet } = useTransactions(true);
      try {
        await getTestTokensFromFaucet(userAddress);
      } catch (e) {
        console.log(e);
      }
      const data = await getTransaction(userAddress);
      expect(data?.results).not.toBeUndefined();
    });
    it('error with invalid address', async () => {
      const { getTransaction } = useTransactions(true);
      await expect(getTransaction('jj')).rejects.toThrow();
    });

    it('returns null when signed out', async () => {
      const { getTransaction } = useTransactions(false);
      const data = await getTransaction(userAddress);
      expect(data).toBeUndefined();
    });
  });
  describe('getTestTokens', () => {
    it('initializes', async () => {
      const { getTestTokensFromFaucet } = useTransactions(true);
      expect(getTestTokensFromFaucet).not.toBeUndefined();
    });
    it('error with invalid address', async () => {
      const { getTestTokensFromFaucet } = useTransactions(true);
      await expect(getTestTokensFromFaucet('jj')).rejects.toThrow();
    });

    it('returns null when signed out', async () => {
      const { getTestTokensFromFaucet } = useTransactions(false);
      const data = await getTestTokensFromFaucet(userAddress);
      expect(data).toBeUndefined();
    });
  });
});
