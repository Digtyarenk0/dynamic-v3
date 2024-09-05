import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const loaderState = (state: RootState) => state.loader;

const selectloaderStage = createSelector(loaderState, (reducer) => reducer.stage);

export { selectloaderStage };
