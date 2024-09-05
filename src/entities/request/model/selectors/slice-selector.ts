import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

import { isSolanaChain } from 'shared/lib/hooks/token-data/helper/parse';

import { ReqStatus } from 'entities/request';

import { getRequestsPageAdapter } from '../slice/request-page-slice';

const rootState = (state: RootState) => state;

export const selectRequestById = (id: number) =>
  createSelector(rootState, (state) => getRequestsPageAdapter.selectById(state, id));

export const selectParsingQueries = createSelector(rootState, (state) =>
  getRequestsPageAdapter
    .selectAll(state)
    .map((q) => q.status === ReqStatus.StatusList.minting && !isSolanaChain(q.chain) && q)
    .filter(Boolean),
);
