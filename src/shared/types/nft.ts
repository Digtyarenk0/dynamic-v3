import { BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

export interface ERCBaseMetadata {
  name: string;
  description?: string;
  image?: string;
  animation_url?: string;
  metadata_uri?: string;
}

export interface FormedMetadata {
  tokenId: string;
  owner: string;
  contract: string;
  name: string;
  blockchain: BlockchainNamesList;
  description?: string;

  image?: string;
  animation_url?: string;
  metadata_uri?: string;
  // watermarked content hash
  hash?: string;
}
