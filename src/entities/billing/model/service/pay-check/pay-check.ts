import { t } from '@lingui/macro';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { amplitudeEvents } from 'shared/lib/amplitude';

import { UserRequest } from 'entities/request';
import { requestsPageReducerActions } from 'entities/request/model/slice/request-page-slice';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { billingRequests } from '../../api/billing-api';
import { billingReducerActions } from '../../slice/billing-slice';
import { PayCheckWorkerProps } from '../../types/billing-types';
import { fetchUserBillingAmountAction } from '../fetch-billing-amount/fetch-billing-amount';

export const payCheckAction = createAppAction<PayCheckWorkerProps, string>('billing', 'pay-check');

export function* payCheckWorker({ payload: { id } }: PayloadAction<PayCheckWorkerProps>) {
  try {
    yield put(loaderReducerActions.set(t`Processing request`));
    const { data: query }: AxiosResponse<UserRequest> = yield call(billingRequests.postPayCheck, id);
    amplitudeEvents.status.checkout_success({ item_id: id.toString(), method: query.method });
    yield put(requestsPageReducerActions.updateRequest({ id, changes: query }));
    yield put(fetchUserBillingAmountAction.call());
  } catch (error: any) {
    console.error('payCheck', error);
    if (error?.code === 'ACTION_REJECTED') {
      toast.error(t`User denied message signature.`);
    } else if (error?.status === 402) {
      yield put(billingReducerActions.setNotEnoughBalance(true));
      toast.error(error?.message);
    } else if (error?.message) {
      toast.error(error?.message);
    }
  }
  yield put(loaderReducerActions.end());
}
