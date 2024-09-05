import { combineReducers } from '@reduxjs/toolkit';

import { billingReducer } from 'entities/billing/model/slice/billing-slice';
import { requestsPageReducer } from 'entities/request/model/slice/request-page-slice';
import { userReducer } from 'entities/user/model/slice/userSlice';
import { walletReducer } from 'entities/wallet/model/slice/walletSlice';

import { authorizationReduce } from 'features/authorization/model/slice/authorization-slice';
import { socketReducer } from 'features/socket';

import { loaderReducer } from 'widgets/loader/model/slice/loader-slice';

export const rootReducer = combineReducers({
  user: userReducer,
  authorization: authorizationReduce,
  //
  billing: billingReducer,
  //
  ethereum: walletReducer,
  //
  socket: socketReducer,
  loader: loaderReducer,
  //
  requests: requestsPageReducer,
});
