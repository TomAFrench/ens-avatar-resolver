import { Provider } from '@ethersproject/providers';

export type AvatarResolver = {
  test: (uri: string) => boolean;
  resolve: (provider: Provider, ensName: string, address: string, uri: string) => Promise<string | null>;
};
