import { Middleware } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import { RootState } from 'app/providers/store/state-schema';

import { billingReducerActions } from 'entities/billing/model/slice/billing-slice';
import { UserRequest } from 'entities/request';
import { updateRequestWSAction } from 'entities/request/model/service/update-request-ws/update-request';
import { requestsPageReducerActions } from 'entities/request/model/slice/request-page-slice';
import { walletReducerActions } from 'entities/wallet/model/slice/walletSlice';

import { updateKYCStatusProps } from 'features/authorization/model/service/update-kyc-status/index.props';
import { socketReducerActions } from 'features/socket';

import { userReducerActions } from '../../slice/userSlice';

import { userMiddlewareResetDataAction } from './actions-user-middlewate';

export const userCustomMiddleware: Middleware = (api) => (next) => (action) => {
  const response = next(action);

  // user data
  if (action.type === userMiddlewareResetDataAction.type) {
    const state: RootState = api.getState();
    state.socket.connection && state.socket.connection.disconnect();
    api.dispatch(userReducerActions.resetSession());
    api.dispatch(socketReducerActions.resetSocket());
    api.dispatch(walletReducerActions.resetWallet());
    api.dispatch(billingReducerActions.reset());
    // Pages
    api.dispatch(requestsPageReducerActions.resetRequest());
  }

  // socket lisener
  if (action.type === socketReducerActions.setSocket.type) {
    const socket = action.payload as Socket;
    socket.on('connect', async () => {
      console.log('WS Connected');
    });
    socket.on('upd-query', (req: UserRequest) => {
      req && api.dispatch(updateRequestWSAction.call({ req }));
    });
    socket.on('sumsub-status', async (jwt: string) => {
      await updateKYCStatusProps(api.dispatch, jwt);
    });
  }

  return response;
};
