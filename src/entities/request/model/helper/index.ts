import { getBlockchainByChainId } from 'shared/lib/blockchain/parse';
import { ipfsToURL } from 'shared/lib/url/url-ipfs';

import { Embed, UserRequest, Lists, ReqStatus } from 'entities/request';

import { FormatedDataForItemPage } from '../types/item.types';
import { BlockchainNamesList } from '../types/request/request.lists';

const blockchainDataFormation = ({ blockchain, owner, contract, tokenId }: any) => {
  return {
    owner: {
      address: owner,
      link: '',
    },
    contract: {
      address: contract,
      link: '',
    },
    token: {
      address: tokenId,
      link: '',
    },
    blockchain: {
      chain: blockchain,
    },
  };
};

export const formationDataForItemPage = async (item: any): Promise<FormatedDataForItemPage> => {
  const blockchainInfo = blockchainDataFormation(item);
  const metadata_uri = item.metadata_uri ? ipfsToURL(item.metadata_uri) : undefined;
  return {
    ...blockchainInfo,
    name: item.name || '',
    description: item.description,
    image: item.image,
    animation_url: item.animation_url,
    metadata_uri,
  };
};

export const requestWatermarkedFormat = (
  query: Embed.RequestEmbedWatermarked | Embed.RequestEmbedBatchWatermarked,
): Embed.RequestEmbedWatermarked | Embed.RequestEmbedBatchWatermarked => {
  return {
    ...query,
    chain: {
      value: getBlockchainByChainId(BlockchainNamesList.polygon),
    },
    platform: {
      value: Lists.PlatformList.watermark,
    },
  };
};

export const requestFormat = (query: UserRequest): UserRequest => {
  const isEmbed = query.method === Lists.MethodList.embed || query.method === Lists.MethodList.embedBatch;
  const isWatermarked = query.status === ReqStatus.StatusList.watermarked;
  if (isWatermarked && isEmbed) return requestWatermarkedFormat(query);
  return query;
};

export const requestArrFormat = (queries: UserRequest[]): UserRequest[] => queries.map((query) => requestFormat(query));
