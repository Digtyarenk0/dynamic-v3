import { store } from 'app/providers/store/store';

import { Lists, ReqStatus } from 'entities/request';

import { getRequestsPageAdapter, requestsPageReducerActions } from '../../slice/request-page-slice';
import { UpdateBlockchainSelector, UpdatePlatformSelector } from '../../types/requests-types';

export const updateRequestSelector = (payload: UpdatePlatformSelector | UpdateBlockchainSelector) => {
  const request = getRequestsPageAdapter.selectById(store.getState(), payload.id);
  if (!request) return;
  const isEmbed = request.method === Lists.MethodList.embed;
  const isWatermerked = request.status === ReqStatus.StatusList.watermarked;
  const isPlatformUpdate = payload.type === 'platform';

  if (request.id === payload.id && isEmbed && isWatermerked) {
    let changes = {};
    if (isPlatformUpdate) {
      changes = {
        platform: {
          ...request.platform,
          value: payload.platform,
        },
      };
    } else {
      changes = {
        chain: {
          ...request.chain,
          value: payload.chain,
        },
      };
    }

    store.dispatch(
      requestsPageReducerActions.updateRequest({
        id: request.id,
        changes,
      }),
    );
  }
};
