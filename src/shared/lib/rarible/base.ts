import { t } from '@lingui/macro';
import { Blockchain, Collection } from '@rarible/api-client/build/models';
import { IRaribleSdk } from '@rarible/sdk';

import { isUrl } from '../validators/validators';

import { RaribleItemIdI } from './types';

export const getCollection = async (sdk: IRaribleSdk, chain: Blockchain, id: string) => {
  try {
    const collection = await sdk.apis.collection.getCollectionById({
      collection: `${chain}:${id}`,
    });
    // @ts-ignore
    return collection as Collection;
  } catch (error: any) {
    console.error('get collection', error);
    if (error.status) {
      switch (error.status) {
        case 404:
          throw new Error(t`Collection not found`);
        default:
          throw new Error(error.data.code);
      }
    }
    throw new Error(error.message);
  }
};

export const createKeyGetItemById = ({ blockchain = 'ETHEREUM', token, tokenId }: RaribleItemIdI): string =>
  blockchain + ':' + token + ':' + tokenId;

export const biteOffBlockchainPrefix = (address: string) => address.split(':')[1];

export const checkRaribleURL = (url: string) => {
  if (!isUrl(url)) {
    throw new Error('Invalid link provided.');
  }
  const { pathname } = new URL(url);
  const path = pathname.split('/');

  const isNotEthBch = path.length !== 4;
  const isSupportBch = path[2] === 'polygon';
  if (isNotEthBch && !isSupportBch)
    throw new Error(t`NFTs are supported only from the Polygon blockchain. NFT Blockchain Item: ` + path[2]);

  if (path[1] !== 'token') throw new Error(t`The link provided does not lead to NFT Item.`);

  const token = path[3].split(':');
  if (token.length !== 2) throw new Error(t`Token and Token id not found in the provided link.`);

  return {
    chain: path[2],
    collection: token[0],
    tokenId: token[1],
  };
};
