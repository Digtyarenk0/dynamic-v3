import { FormedMetadata } from 'shared/types/nft';

import { EVMChains, SolChain } from 'entities/request';

export interface TokenIdsHash {
  id: string;
  tx: string;
}
export interface GetURLEVM {
  blockchain: EVMChains;
  collection: string;
  token: string;
}

export interface GetURLSol {
  blockchain: SolChain;
  token: string;
}

export type GetURLProps = GetURLEVM | GetURLSol;

export interface TokenBaseMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  metadata_uri?: string;
  // Watermarked content hash field
  hash?: string;
}

export interface GetEVMContractTransferLogs {
  collection: string;
  chain: EVMChains;
  blockFrom: number;
  checkBlocks?: number;
}

export interface GetCollectionTokenIds extends GetEVMContractTransferLogs {
  userAddress: string;
}

export interface GetTokenByHashFromEventsProps extends GetCollectionTokenIds {
  hash: string;
}

export interface GetTokenByHashFromEvents {
  id: string;
  hash: string;
  metadata: FormedMetadata;
}
