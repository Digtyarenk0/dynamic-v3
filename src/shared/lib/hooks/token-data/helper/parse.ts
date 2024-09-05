import { EventLog } from 'ethers';

import { BlockchainNamesList } from 'entities/request/model/types/request/request.lists';

import { TokenIdsHash } from '../types/token-data';

export const isJSONBase64 = (json: string) => json.substring(0, 28) === `data:application/json;base64`;
export const parseBase64 = (json: string) => JSON.parse(atob(json.slice(29)));
export const tokenIdFormTransferEvent = (event: EventLog): TokenIdsHash => {
  const id = event.args?.id || event.args?.tokenId;
  return id && { id, tx: event.transactionHash };
};

export const isSolanaChain = (blockchain: BlockchainNamesList): boolean => {
  return blockchain === BlockchainNamesList.solana || blockchain === BlockchainNamesList.solana_dev;
};
