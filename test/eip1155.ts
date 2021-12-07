import { expect } from 'chai';

import { getDefaultProvider } from '@ethersproject/providers';

import { erc1155Resolver } from '../src/resolvers/erc1155';

describe('ERC1155', () => {
  const provider = getDefaultProvider('mainnet');

  describe('resolve', () => {
    it('returns the expected avatar', async () => {
      expect(
        await erc1155Resolver.resolve(
          provider,
          'nick.eth',
          '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
          'eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937'
        )
      ).to.be.eq(
        'https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE'
      );
    });
  });
});
