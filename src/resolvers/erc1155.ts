import fetch from 'isomorphic-fetch';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import { getGatewayUrl } from '../utils';

const erc1155Regex = new RegExp(/eip155:1\/erc1155:(\w+)\/(\w+)/);

const erc1155Abi = [
  'function balanceOf(address _owner, uint256 _id) view returns (uint256)',
  'function uri(uint256 _id) view returns (string)',
];

const parseURI = (uri: string): [string, BigNumber] => {
  const result = erc1155Regex.exec(uri);
  if (result === null) throw Error('parsing URI failed');
  const [, contractAddress, tokenId] = result;
  return [contractAddress, BigNumber.from(tokenId)];
};

const test = (uri: string): boolean => erc1155Regex.exec(uri) !== null;

const resolve = async (provider: Provider, ensName: string, address: string, uri: string): Promise<string | null> => {
  const [contractAddress, tokenId] = parseURI(uri);
  const erc1155Contract = new Contract(contractAddress, erc1155Abi, provider);

  const userBalance: BigNumber = await erc1155Contract.balanceOf(address, tokenId);

  if (userBalance.isZero()) return null;

  const tokenURI = await erc1155Contract.uri(tokenId);

  const response = await fetch(getGatewayUrl(tokenURI, tokenId.toHexString().slice(2)));

  return (await response.json()).image;
};

export const erc1155Resolver = {
  test,
  resolve,
};
