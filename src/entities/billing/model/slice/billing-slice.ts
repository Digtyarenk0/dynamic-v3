import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BillingStatus, WithdrawalStatus } from '../types/billing-contracts';
import { BillingStateSchema } from '../types/billing-types';

export const initialState: BillingStateSchema = {
  notEnoughBalance: false,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setBillingStatus: (state, action: PayloadAction<BillingStatus>) => {
      state.billingStatus = action.payload;
    },
    setTokenDecimal: (state, action: PayloadAction<number>) => {
      state.decimal = action.payload;
    },
    setBillingWithdrawalStatus: (state, action: PayloadAction<WithdrawalStatus>) => {
      state.withdrawalStatus = action.payload;
    },
    setNotEnoughBalance: (state, action: PayloadAction<boolean>) => {
      state.notEnoughBalance = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setBillingBalanceUsaged: (state, action: PayloadAction<number>) => {
      state.userBillingBalance = action.payload;
    },
    reset: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { reducer: billingReducer, actions: billingReducerActions } = billingSlice;
