import { AvatarResolver } from '../types';
import { arweaveResolver } from './arweave';
import { erc1155Resolver } from './erc1155';
import { erc721Resolver } from './erc721';

export const avatarResolvers: AvatarResolver[] = [erc721Resolver, erc1155Resolver, arweaveResolver];
export { fallbackResolver } from './fallback';
