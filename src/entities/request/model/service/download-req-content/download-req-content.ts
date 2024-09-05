import { t } from '@lingui/macro';
import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { call, put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { FileUtils } from 'shared/lib/file';

import { Lists } from 'entities/request';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { DownloadActionProps } from '../../types/requests-types';

export const downloadRequestContentAction = createAppAction<DownloadActionProps, undefined>(
  'requests',
  'download-req-content',
);

function* downloadSingle(id: number) {
  yield put(loaderReducerActions.set(t`Getting content`));
  FileUtils.downloadElement(`Watermarked.png`, '');
}

// Get conetnt from record
export function* downloadRequestContentWorker({ payload: { query } }: PayloadAction<DownloadActionProps>) {
  try {
    const isBatch = query.method === Lists.MethodList.embedBatch;
    if (isBatch) {
      yield call(downloadSingle, query.zipKey);
    } else {
      yield call(downloadSingle, query.content.contentData.id);
    }
  } catch (error) {
    console.error('download', error);
    if (error instanceof Error) {
      toast.error(error.message, {
        autoClose: 5000,
      });
    }
  }
  yield put(loaderReducerActions.end());
}
