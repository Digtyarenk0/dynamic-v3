import { BlockchainList, MethodList, PlatformList } from './request.lists';
import { StatusList } from './request.status';

export type TypeMethod = MethodList.extract | MethodList.embed | MethodList.embedBatch;

export type TypePlatforms = PlatformList.watermark | PlatformList.rarible | PlatformList.opensea;

export type TypeBlockchains = BlockchainList.ethereum | BlockchainList.solana;

export type TypeStatus =
  | StatusList.checking
  | StatusList.checked
  | StatusList.detected
  | StatusList.watermarking
  | StatusList.watermarked
  | StatusList.minting
  | StatusList.parsing
  | StatusList.minted
  | StatusList.registration
  | StatusList.registered
  | StatusList.deprecated
  | StatusList.failed;
