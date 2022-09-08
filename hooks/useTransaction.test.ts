import useTransactions from './useTransactions';
import { useAccount } from '@micro-stacks/react';

jest.mock('@micro-stacks/react', () => ({
  useAccount: jest.fn(),
}));

describe('useTransaction', () => {
  describe('returns', () => {
    it('transaction', () => {
      (useAccount as jest.Mock).mockReturnValueOnce({
        stxAddress: 'ST3Y4P66VZ7JG5QXQ8MFR8D08GGBJR0KJCT2NXN4F',
      });
      expect(useTransactions({ isSignedIn: true }).getTransaction()).toEqual([]);
    });
  });
});
