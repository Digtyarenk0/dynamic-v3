import { takeLatest } from 'redux-saga/effects';

import {
  fetchUserBillingAmountAction,
  fetchUserBillingAmountWorker,
} from '../service/fetch-billing-amount/fetch-billing-amount';
import { payCheckAction, payCheckWorker } from '../service/pay-check/pay-check';

export function* billingWatcher() {
  yield takeLatest(fetchUserBillingAmountAction.call.type, fetchUserBillingAmountWorker);
  yield takeLatest(payCheckAction.call.type, payCheckWorker);
}
