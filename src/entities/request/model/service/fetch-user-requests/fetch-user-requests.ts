import { t } from '@lingui/macro';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { UserRequest } from 'entities/request';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { getCountRequest, getUserRequest } from '../../api/requests-api';
import { requestArrFormat } from '../../helper';
import { selectFilterPlatform } from '../../selectors/selector';
import { requestsPageReducerActions } from '../../slice/request-page-slice';
import { patformOptions } from '../../types/filter.types';
import { GetUserRecordsWorkerProps } from '../../types/requests-types';

export const fetchUserRequestsAction = createAppAction<GetUserRecordsWorkerProps, UserRequest[]>(
  'requests',
  'fetch-user-requests',
);

export function* fetchUserRequestsWorker({ payload }: PayloadAction<GetUserRecordsWorkerProps>) {
  try {
    yield put(loaderReducerActions.set(t`Retrieving Requests`));
    const platform: patformOptions = yield select(selectFilterPlatform);
    const { data }: AxiosResponse<UserRequest[]> = yield call(getUserRequest, {
      limit: payload.limit,
      offset: payload.offset,
      platform,
    });
    const { data: count }: AxiosResponse<number> = yield call(getCountRequest, { platform });
    const queries = requestArrFormat(data);
    yield put(requestsPageReducerActions.setRequestsCount(count));
    yield put(requestsPageReducerActions.setAll(queries));
  } catch (e) {
    console.error('Fetch user requests', e);
  }
  yield put(loaderReducerActions.end());
}
