import { EntityState } from '@reduxjs/toolkit';

import { Embed, UserRequest, Lists } from 'entities/request';

import { patformOptions } from '../types/filter.types';

import { BlockchainNamesList } from './request/request.lists';

export interface RequestsPageSchema extends EntityState<UserRequest> {
  count: number;
  requestsPageLodaded: boolean;
  platform: patformOptions;
  requests?: UserRequest[];
}

export interface GetRequestsParamsProps {
  platform?: patformOptions;
}

export interface GetUserRecordsWorkerProps extends GetRequestsParamsProps {
  limit?: number;
  offset?: number;
}

export interface DownloadActionProps {
  query: Embed.RequestEmbedBatchMinted | Embed.RequestEmbedMinted;
}

export interface RequestIdProps {
  id: number;
}

export interface RequestWSProps {
  req: UserRequest;
}

export interface UpdateBlockchainSelector extends RequestIdProps {
  type: 'blockchain';
  chain: BlockchainNamesList;
}

export interface UpdatePlatformSelector extends RequestIdProps {
  type: 'platform';
  platform: Lists.PlatformList;
}
