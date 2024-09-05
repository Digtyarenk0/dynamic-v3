import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const socketState = (state: RootState) => state.socket;

const selectSocketConnect = createSelector(socketState, (reducer) => reducer.connection);

export { selectSocketConnect };
