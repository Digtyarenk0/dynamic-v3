import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const ethereumState = (state: RootState) => state.ethereum;

const selectProvider = createSelector(ethereumState, (reducer) => reducer.provider);
const selectWSProvider = createSelector(ethereumState, (reducer) => reducer.webSocketProvider);

export const walletSelectors = { selectProvider, selectWSProvider };
