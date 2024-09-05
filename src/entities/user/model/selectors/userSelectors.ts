import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

const userReducer = (state: RootState) => state.user;

// User
const selectUserInited = createSelector(userReducer, (reducer) => reducer._inited);

const selectUserIsLogged = createSelector(userReducer, (reducer) => reducer.isLogged);

const selectUser = createSelector(userReducer, (reducer) => reducer.user);

const selectUserIsTester = createSelector(userReducer, (reducer) => reducer.user?.tester);

const selectUserIsVeryfied = createSelector(userReducer, (reducer) => reducer.user?.isVeryfied);

const selectUserVerifyStatus = createSelector(userReducer, (reducer) => reducer.user?.verify);
const selectUseEmail = createSelector(userReducer, (reducer) => reducer.user?.email);

const selectisSessionEnded = createSelector(userReducer, (reducer) => reducer.sessionEnded);

export {
  selectUser,
  selectUserInited,
  selectUserIsLogged,
  selectUserIsTester,
  selectUserIsVeryfied,
  selectUserVerifyStatus,
  selectUseEmail,
  selectisSessionEnded,
};
