import { Blockchain } from '@rarible/api-client/build/models';

export interface RaribleItemIdI {
  blockchain?: 'ETHEREUM' | Blockchain;
  token: string;
  tokenId: string;
}
