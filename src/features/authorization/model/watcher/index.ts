import { takeLatest } from 'redux-saga/effects';

import { signOutUserWorker, signOutUserAction } from '../service/sign-out';
import { userToVerificationAction, userToVerificationWorker } from '../service/user-to-verification';

export function* authorizationWatcher() {
  yield takeLatest(signOutUserAction.call.type, signOutUserWorker);
  // verification
  yield takeLatest(userToVerificationAction.call.type, userToVerificationWorker);
}
