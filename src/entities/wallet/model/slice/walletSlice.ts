import { createSlice } from '@reduxjs/toolkit';
import { JsonRpcProvider, WebSocketProvider } from 'ethers';

import { AppConfig } from 'shared/config/envs';

import { WalletSchema } from '../types/types';

const initialState: WalletSchema = {
  provider: new JsonRpcProvider(AppConfig.chains.polygon.networkRpcLink),
  webSocketProvider: new WebSocketProvider(AppConfig.chains.polygon.networkRpcLinkWS),
  wallet: undefined,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetWallet: (state) => {
      state.wallet = initialState.wallet;
    },
  },
});

export const { reducer: walletReducer, actions: walletReducerActions } = walletSlice;
