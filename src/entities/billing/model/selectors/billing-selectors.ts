import { createSelector } from 'reselect';

import { RootState } from 'app/providers/store/state-schema';

import { BillingStatus } from '../types/billing-contracts';

const billingReducer = (state: RootState) => state.billing;

export const selectUserBillingAmount = createSelector(billingReducer, (reducer) => reducer.amount);

export const selectBillingTokenDecimal = createSelector(billingReducer, (reducer) => reducer.decimal);

export const selectUserBillingBalance = createSelector(billingReducer, (reducer) => reducer.userBillingBalance);

export const selectUserBillingStatus = createSelector(billingReducer, (reducer) => reducer.billingStatus);

export const selectisUserBillingReqStatus = createSelector(
  billingReducer,
  (reducer) => reducer.billingStatus === BillingStatus.REQUESTED,
);

export const selectUserWithdrawalStatus = createSelector(billingReducer, (reducer) => reducer.withdrawalStatus);

export const selectNotEnoughBalance = createSelector(billingReducer, (reducer) => reducer.notEnoughBalance);
