import { IRaribleSdk } from '@rarible/sdk/build/domain';
import { EthereumCreateCollectionAsset } from '@rarible/sdk/build/types/nft/deploy/domain';

export const createCollection = async (sdk: IRaribleSdk) => {
  const asset: EthereumCreateCollectionAsset = {
    assetType: 'ERC721',
    arguments: {
      name: `Wa${new Date().getTime()}`,
      symbol: 'W',
      baseURI: 'ipfs://',
      contractURI: 'ipfs://',
      isUserToken: false,
    },
  };

  const { Blockchain } = await import('@rarible/api-client/build/models');
  const collection = {
    blockchain: Blockchain.POLYGON,
    asset: asset,
  };

  // @ts-ignore
  const result = await sdk.nft.createCollection(collection);
  await result.tx.wait();
  return result.address;
};

export const getCollection = async (sdk: IRaribleSdk, collection: string) => {
  const res = await sdk.apis.collection.getCollectionById({
    collection,
  });
  return res;
};

export const getItemsByCreator = async (sdk: IRaribleSdk, creator: string) => {
  const res = await sdk.apis.item.getItemsByCreator({
    creator,
  });
  return res;
};
