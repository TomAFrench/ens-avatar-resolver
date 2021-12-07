import { expect } from 'chai';

import { getDefaultProvider } from '@ethersproject/providers';

import { erc721Resolver } from '../src/resolvers/erc721';

describe('ERC721', () => {
  const provider = getDefaultProvider('mainnet');

  describe('resolve', () => {
    it('returns the expected avatar', async () => {
      expect(
        await erc721Resolver.resolve(
          provider,
          'brantly.eth',
          '0x983110309620D911731Ac0932219af06091b6744',
          'eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/2430'
        )
      ).to.be.eq('https://api.wrappedpunks.com/images/punks/2430.png');
    });
  });
});
