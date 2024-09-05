import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const userReducer = (state: RootState) => state.authorization;

const selectLoginErrMsg = createSelector(userReducer, (reducer) => reducer.loginErrMsg);
const selectRegistrationErrMsg = createSelector(userReducer, (reducer) => reducer.registrationErrMsg);

export { selectLoginErrMsg, selectRegistrationErrMsg };
