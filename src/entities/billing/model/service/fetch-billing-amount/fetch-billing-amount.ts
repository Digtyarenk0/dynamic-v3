import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { billingRequests } from '../../api/billing-api';
import { billingReducerActions } from '../../slice/billing-slice';

export const fetchUserBillingAmountAction = createAppAction<undefined, string>('fetch-user', 'billing-amount');

export function* fetchUserBillingAmountWorker() {
  try {
    const { data }: AxiosResponse<{ amount: string }> = yield call(billingRequests.getUserAmount);
    yield put(billingReducerActions.setAmount(data.amount));
  } catch (e) {
    console.error('fetchUserBillingAmountWorker', e);
  }
}
