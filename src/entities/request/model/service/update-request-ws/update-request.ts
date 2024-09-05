import { PayloadAction } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { UserRequest, ReqStatus } from 'entities/request';

import { requestFormat } from '../../helper';
import { requestsPageReducerActions } from '../../slice/request-page-slice';
import { RequestWSProps } from '../../types/requests-types';

export const updateRequestWSAction = createAppAction<RequestWSProps, UserRequest>('requests', 'update-request-ws');

export function* updateRequestWSWorker({ payload: { req } }: PayloadAction<RequestWSProps>) {
  try {
    const query = requestFormat(req);
    yield put(requestsPageReducerActions.updateRequest({ id: query.id, changes: query }));
    switch (query.status) {
      case ReqStatus.StatusList.uploading:
      case ReqStatus.StatusList.uploaded:
      case ReqStatus.StatusList.payment:
        break;
      default:
        // yield put(updateUserCheckAction.call({ id: query.id }));
        break;
    }
  } catch (e) {
    console.error('Update request', e);
  }
}
