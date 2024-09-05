import { NftDataBase } from './nft/nft.types';
import { MethodList } from './request.lists';
import { StatusList, TypeStage } from './request.status';
import { RequestEmbed } from './status/request.embed.types';
import { RequestExtract } from './status/request.extract.types';

export interface RequestPreview {
  link?: string;
  key?: string;
}

export interface RequestBase {
  id: number;
  createdAt: Date;
  preview: RequestPreview;
}

export interface RequestFailed extends RequestBase {
  type: TypeStage.failed;
  method: MethodList;
  status: StatusList.failed;
  error: string;
  content?: NftDataBase;
}

export type StatusPrepare =
  | StatusList.uploading
  | StatusList.uploaded
  | StatusList.payment
  | StatusList.paid
  | StatusList.checking
  | StatusList.watermarking
  | StatusList.registration
  | StatusList.minting
  | StatusList.deprecated;

export type UserRequest = RequestExtract | RequestEmbed | RequestFailed;
