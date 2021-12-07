import { expect } from 'chai';

import { getDefaultProvider } from '@ethersproject/providers';

import { fallbackResolver } from '../src/resolvers';

describe('Fallback', () => {
  const provider = getDefaultProvider('mainnet');

  describe('resolve', () => {
    it('returns the expected avatar', async () => {
      expect(
        await fallbackResolver.resolve(provider, "doesn't matter", "doesn't matter", 'https://ethereum.org/')
      ).to.be.eq('https://ethereum.org/');
    });
  });
});
