import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const recordState = (state: RootState) => state.requests;

export const selectRequestsCount = createSelector(recordState, (reducer) => reducer.count);

// Filter
export const selectFilterPlatform = createSelector(recordState, (reducer) => reducer.platform);

export const selectRequestsPageLodaded = createSelector(recordState, (reducer) => reducer.requestsPageLodaded);
