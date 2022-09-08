import useTransactions from './useTransactions';

describe('useTransaction', () => {
  describe('returns', () => {
    it('transaction', () => {
      expect(
        useTransactions(true).getTransaction('ST3Y4P66VZ7JG5QXQ8MFR8D08GGBJR0KJCT2NXN4F')
      ).toEqual([]);
    });
  });
});
