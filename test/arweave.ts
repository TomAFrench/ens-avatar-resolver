import { expect } from 'chai';

import { getDefaultProvider } from '@ethersproject/providers';

import { arweaveResolver } from '../src/resolvers/arweave';

describe('Arweave', () => {
  const provider = getDefaultProvider('ropsten');

  describe('resolve', () => {
    it('returns the expected avatar', async () => {
      expect(
        await arweaveResolver.resolve(
          provider,
          "doesn't matter",
          "doesn't matter",
          'ar://HOOyFYgw1FeJTJeVJ0erC2UXU7sKnc0xkCz7mY1wYkg'
        )
      ).to.be.eq('https://arweave.net/HOOyFYgw1FeJTJeVJ0erC2UXU7sKnc0xkCz7mY1wYkg');
    });
  });
});
