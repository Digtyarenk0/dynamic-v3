import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { billingReducerActions } from 'entities/billing/model/slice/billing-slice';
import { UserRequest, Lists, ReqStatus } from 'entities/request';

import { requestFormat } from '../../helper';

export const insertRequestAction = createAppAction<UserRequest, UserRequest>('requests', 'insert-request');

export function* insertRequestWorker({ payload }: PayloadAction<UserRequest>) {
  try {
    const query = requestFormat(payload);
    yield put(insertRequestAction.fulfilled(query));
    yield put(billingReducerActions.setNotEnoughBalance(false));
    switch (query.status) {
      case ReqStatus.StatusList.uploading:
      case ReqStatus.StatusList.uploaded:
      case ReqStatus.StatusList.payment:
        break;
      default:
        // yield put(updateUserCheckAction.call({ id: payload.id }));
        break;
    }
  } catch (e) {
    console.error('Insert request', e);
  }
}
