import { t } from '@lingui/macro';
import { call, put } from 'redux-saga/effects';

import { createAppAction } from 'app/providers/store/helper';

import { amplitudeEvents } from 'shared/lib/amplitude';

import { userMiddlewareResetDataAction } from 'entities/user/model/middleware/userCustomMiddleware/actions-user-middlewate';
import { userReducerActions } from 'entities/user/model/slice/userSlice';
import { walletReducerActions } from 'entities/wallet/model/slice/walletSlice';

import { JWTToken } from 'features/session/model/helper/jwt-token';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { deleteLogout } from '../../api/auth-api';

export const signOutUserAction = createAppAction<undefined, undefined>('user', 'sign-out');

export function* signOutUserWorker() {
  try {
    yield put(loaderReducerActions.set(t`Session сancellation`));
    yield JWTToken.remove();
    yield JWTToken.deleteRefreshCookies();
    yield put(walletReducerActions.resetWallet());
    yield put(userReducerActions.resetSession());
    amplitudeEvents.wallet.logout_button();
    yield call(deleteLogout);
  } catch (error: any) {
    console.error('Sign out user', error);
  }
  yield put(userMiddlewareResetDataAction());
  yield put(userReducerActions.setIsLogged(false));
  yield put(loaderReducerActions.end());
}
