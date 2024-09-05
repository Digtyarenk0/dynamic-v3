import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { UserRequest, Lists, ReqStatus } from 'entities/request';

import { getRequest } from '../../api/requests-api';
import { requestFormat } from '../../helper';
import { requestsPageReducerActions } from '../../slice/request-page-slice';
import { RequestIdProps } from '../../types/requests-types';

export const updateRequestAction = createAppAction<RequestIdProps, UserRequest>('requests', 'update-request');

export function* updateRequestWorker({ payload: { id } }: PayloadAction<RequestIdProps>) {
  try {
    const { data }: AxiosResponse<UserRequest> = yield call(getRequest, id);
    const query = requestFormat(data);
    yield put(requestsPageReducerActions.updateRequest({ id: query.id, changes: query }));
    switch (query.status) {
      case ReqStatus.StatusList.uploading:
      case ReqStatus.StatusList.uploaded:
      case ReqStatus.StatusList.payment:
        break;
      default:
        // yield put(updateUserCheckAction.call({ id }));
        break;
    }
  } catch (e) {
    console.error('Update request', e);
  }
}
