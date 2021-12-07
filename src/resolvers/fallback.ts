import { Provider } from '@ethersproject/providers';
import { getGatewayUrl } from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = (uri: string): boolean => true;

const resolve = async (provider: Provider, ensName: string, address: string, uri: string): Promise<string | null> =>
  getGatewayUrl(uri);

export const fallbackResolver = {
  test,
  resolve,
};
