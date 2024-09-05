import { t } from '@lingui/macro';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { UserRequest } from 'entities/request';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { getUserRequest } from '../../api/requests-api';
import { requestArrFormat } from '../../helper';
import { selectFilterPlatform } from '../../selectors/selector';
import { patformOptions } from '../../types/filter.types';
import { GetUserRecordsWorkerProps } from '../../types/requests-types';

export const loadMoreUserRequestsAction = createAppAction<GetUserRecordsWorkerProps, UserRequest[]>(
  'requests',
  'load-more-user-requests',
);

export function* loadMoreUserRequestsWorker({ payload }: PayloadAction<GetUserRecordsWorkerProps>) {
  try {
    yield put(loaderReducerActions.set(t`Loading Recordings`));
    const platform: patformOptions = yield select(selectFilterPlatform);
    const { data }: AxiosResponse<UserRequest[]> = yield call(getUserRequest, {
      limit: payload.limit,
      offset: payload.offset,
      platform,
    });
    const queries = requestArrFormat(data);
    yield put(loadMoreUserRequestsAction.fulfilled(queries));
  } catch (e) {
    console.error('Load more user requests', e);
  }
  yield put(loaderReducerActions.end());
}
