import fetch from 'isomorphic-fetch';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { getGatewayUrl } from '../utils';

const erc721Regex = new RegExp(/eip155:1\/erc721:(\w+)\/(\w+)/);

const erc721Abi = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function tokenURI(uint256 _tokenId) external view returns (string)',
];

const parseURI = (uri: string): [string, BigNumber] => {
  const result = erc721Regex.exec(uri);
  if (result === null) throw Error('parsing URI failed');
  const [, contractAddress, tokenId] = result;
  return [contractAddress, BigNumber.from(tokenId)];
};

const test = (uri: string): boolean => erc721Regex.exec(uri) !== null;

const resolve = async (provider: Provider, ensName: string, address: string, uri: string): Promise<string | null> => {
  const [contractAddress, tokenId] = parseURI(uri);
  const erc721Contract = new Contract(contractAddress, erc721Abi, provider);

  const tokenOwner = await erc721Contract.ownerOf(tokenId);

  if (tokenOwner.toLowerCase() !== address.toLowerCase()) return null;

  const tokenURI = await erc721Contract.tokenURI(tokenId);

  const response = await fetch(getGatewayUrl(tokenURI, tokenId.toHexString()));
  return (await response.json()).image;
};

export const erc721Resolver = {
  test,
  resolve,
};
