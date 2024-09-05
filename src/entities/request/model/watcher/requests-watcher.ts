import { takeLatest } from 'redux-saga/effects';

import {
  downloadRequestContentAction,
  downloadRequestContentWorker,
} from '../service/download-req-content/download-req-content';
import { fetchUserRequestsAction, fetchUserRequestsWorker } from '../service/fetch-user-requests/fetch-user-requests';
import { insertRequestAction, insertRequestWorker } from '../service/insert-request/insert-request';
import {
  loadMoreUserRequestsAction,
  loadMoreUserRequestsWorker,
} from '../service/load-more-user-requests/load-more-user-requests';
import { updateRequestAction, updateRequestWorker } from '../service/update-request/update-request';
import { updateRequestWSAction, updateRequestWSWorker } from '../service/update-request-ws/update-request';

export function* requestsWatcher() {
  yield takeLatest(fetchUserRequestsAction.call.type, fetchUserRequestsWorker);
  yield takeLatest(loadMoreUserRequestsAction.call.type, loadMoreUserRequestsWorker);
  yield takeLatest(updateRequestAction.call.type, updateRequestWorker);
  yield takeLatest(updateRequestWSAction.call.type, updateRequestWSWorker);
  yield takeLatest(insertRequestAction.call.type, insertRequestWorker);
  yield takeLatest(downloadRequestContentAction.call.type, downloadRequestContentWorker);
}
