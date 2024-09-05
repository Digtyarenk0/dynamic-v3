import { NftDataBase, NftDataDetected, NftDataEmbedMint, NftDataEmbedWatemarked } from '../nft/nft.types';
import { RequestBase } from '../request.base';
import { BlockchainNamesList, MethodList, PlatformList } from '../request.lists';
import { StatusList, TypeStage } from '../request.status';
import { RequestSelector } from '../request.ui.types';

export type RequestEmbed =
  | RequestEmbedPrepare
  | RequestEmbedDetected
  | RequestEmbedWatermarked
  | RequestEmbedMinting
  | RequestEmbedMinted
  | RequestEmbedBatchPrepare
  | RequestEmbedBatchDetected
  | RequestEmbedBatchWatermarked
  | RequestEmbedBatchMinting
  | RequestEmbedBatchMinted;

export type RequestWatermarked = RequestEmbedWatermarked | RequestEmbedBatchWatermarked;

type PrepareEmbedStatues =
  | StatusList.uploading
  | StatusList.uploaded
  | StatusList.payment
  | StatusList.paid
  | StatusList.checking
  | StatusList.checked
  | StatusList.watermarking
  | StatusList.deprecated
  | StatusList.failed;

export interface RequestEmbedPrepare extends RequestBase {
  type: TypeStage.prepare;
  method: MethodList.embed;
  status: PrepareEmbedStatues;
  content: NftDataBase;
}

export interface RequestEmbedDetected extends RequestBase {
  type: TypeStage.detected;
  method: MethodList.embed;
  status: StatusList.detected;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataDetected;
}

export interface RequestEmbedWatermarked extends RequestBase {
  type: TypeStage.watermarked;
  method: MethodList.embed;
  status: StatusList.watermarked;
  platform: RequestSelector<PlatformList>;
  chain: RequestSelector<BlockchainNamesList>;
  content: NftDataEmbedWatemarked;
}

export interface RequestEmbedMinting extends RequestBase {
  type: TypeStage.minting;
  method: MethodList.embed;
  status: StatusList.minting | StatusList.parsing;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataEmbedMint;
}

export interface RequestEmbedMinted extends RequestBase {
  type: TypeStage.minted;
  method: MethodList.embed;
  status: StatusList.minted | StatusList.registration | StatusList.registered;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataEmbedMint;
}

export interface RequestEmbedBatchPrepare extends RequestBase {
  type: TypeStage.prepare;
  method: MethodList.embedBatch;
  status: PrepareEmbedStatues;
  content: NftDataBase[];
}

export interface RequestEmbedBatchDetected extends RequestBase {
  type: TypeStage.detected;
  method: MethodList.embedBatch;
  status: StatusList.detected;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataDetected[];
}

export interface RequestEmbedBatchWatermarked extends RequestBase {
  type: TypeStage.watermarked;
  method: MethodList.embedBatch;
  status: StatusList.watermarked;
  platform: RequestSelector<PlatformList>;
  chain: RequestSelector<BlockchainNamesList>;
  content: NftDataEmbedWatemarked[];
}

export interface RequestEmbedBatchMinting extends RequestBase {
  type: TypeStage.minting;
  method: MethodList.embedBatch;
  status: StatusList.minting | StatusList.parsing;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataEmbedMint[];
}

export interface RequestEmbedBatchMinted extends RequestBase {
  type: TypeStage.minted;
  method: MethodList.embedBatch;
  status: StatusList.minted | StatusList.registered | StatusList.registered;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataEmbedMint[];
  zipKey: number;
}
