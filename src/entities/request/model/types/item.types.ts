import { BlockchainNamesList } from './request/request.lists';

export interface FormationDataForItemPage {
  itemName: string;
  description: string;
  content: string;
  contractAddress: string;
  owner: string;
  tokenId: string;
  blockchain: string;
}

export interface FormatedDataForItemPage {
  name: string;
  description?: string;
  image?: string;
  animation_url?: string;
  metadata_uri?: string;
  owner: {
    address: string;
    link: string;
  };
  contract: {
    address: string;
    link: string;
  };
  token: {
    address: string;
    link: string;
  };
  blockchain: {
    chain: BlockchainNamesList;
  };
}
