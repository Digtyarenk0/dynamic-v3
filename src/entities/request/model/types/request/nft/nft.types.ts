import { ContentData } from '../contentData/contentData.types';
import { BlockchainNamesList } from '../request.lists';
import { WatermakedEmbed, WatermakedExtract } from '../watermarked/watermarked.types';

export interface RequestMetadata {
  itemName: string;
  itemDescription?: string;
  linkFileStorage?: string;
}

export interface NftDataBase {
  contentData: ContentData;
  metadata: RequestMetadata;
  providedLink?: string;
  nft?: NFTChainData;
}

export interface NFTChainData {
  tokenId: string;
  collection: string;
  chain: BlockchainNamesList;
}

export interface NftDataDetected extends NftDataBase {
  watermaked: WatermakedExtract;
  blockchain: NFTChainData;
}

export interface NftDataEmbedWatemarked extends NftDataBase {
  watermaked: WatermakedEmbed;
}

export interface NftDataEmbedMint extends NftDataEmbedWatemarked {
  blockchain: {
    block: number;
    tokenId: string;
    collection: string;
  };
}
