import { isAddress } from '@ethersproject/address';
import { EnsProvider, Provider } from '@ethersproject/providers';
import { avatarResolvers, fallbackResolver } from './resolvers';

export const _resolveAvatar = async (
  provider: Provider & EnsProvider,
  ensName: string,
  address: string
): Promise<string | null> => {
  const resolver = await provider.getResolver(ensName);
  if (resolver === null) return null;
  const uri = await resolver.getText('avatar');
  if (uri === null) return null;

  const avatarResolver = avatarResolvers.find((resolver) => resolver.test(uri));
  try {
    if (avatarResolver !== undefined) {
      return await avatarResolver.resolve(provider, ensName, address, uri);
    }
    return await fallbackResolver.resolve(provider, ensName, address, uri);
  } catch {
    return null;
  }
};

/**
 * @notice Resolves the avatar attached to a given ENS name
 * @param provider A provider with ENS resolution capabilities
 * @param addressOrEns The ENS name (or address) to resolve the avatar of.
 * @returns a URL to the provided ENS name's avatar or null if no avatar exists
 */
export const resolveENSAvatar = async (
  provider: Provider & EnsProvider,
  addressOrEns: string
): Promise<string | null> => {
  if (isAddress(addressOrEns)) {
    const ensName = await provider.lookupAddress(addressOrEns);
    if (ensName !== null) {
      return _resolveAvatar(provider, ensName, addressOrEns);
    } else {
      return null;
    }
  } else {
    const address = await provider.resolveName(addressOrEns);
    if (address !== null) {
      return _resolveAvatar(provider, addressOrEns, address);
    } else {
      return null;
    }
  }
};
