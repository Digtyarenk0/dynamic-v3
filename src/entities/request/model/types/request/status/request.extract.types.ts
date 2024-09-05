import { NftDataBase, NftDataDetected } from '../nft/nft.types';
import { RequestBase } from '../request.base';
import { BlockchainNamesList, MethodList, PlatformList } from '../request.lists';
import { StatusList, TypeStage } from '../request.status';

export type RequestExtract = RequestExtractPrepare | RequestExtractChecked | RequestExtractDetected;

export type PrepareExtractStatues =
  | StatusList.uploading
  | StatusList.uploaded
  | StatusList.payment
  | StatusList.paid
  | StatusList.checking
  | StatusList.deprecated
  | StatusList.failed;

export interface RequestExtractPrepare extends RequestBase {
  type: TypeStage.prepare;
  method: MethodList.extract;
  status: PrepareExtractStatues;
  content: NftDataBase;
}

export interface RequestExtractChecked extends RequestBase {
  type: TypeStage.checked;
  method: MethodList.extract;
  status: StatusList.checked;
  content: NftDataBase;
}

export interface RequestExtractDetected extends RequestBase {
  type: TypeStage.prepare;
  method: MethodList.extract;
  status: StatusList.detected;
  platform: PlatformList;
  chain: BlockchainNamesList;
  content: NftDataDetected;
}
