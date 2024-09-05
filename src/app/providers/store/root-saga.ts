import { all, fork } from 'redux-saga/effects';

import { billingWatcher } from 'entities/billing/model/watcher/billing-watcher';
import { requestsWatcher } from 'entities/request/model/watcher/requests-watcher';

import { authorizationWatcher } from 'features/authorization/model/watcher';

export function* rootSagaWatcher() {
  try {
    yield all([
      fork(authorizationWatcher),
      //
      fork(billingWatcher),
      fork(requestsWatcher),
    ]);
  } finally {
    // always runs
  }
}
