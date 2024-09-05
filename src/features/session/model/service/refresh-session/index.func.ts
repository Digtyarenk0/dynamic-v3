import { t } from '@lingui/macro';

import { store } from 'app/providers/store/store';

import { userMiddlewareResetDataAction } from 'entities/user/model/middleware/userCustomMiddleware/actions-user-middlewate';
import { userReducerActions } from 'entities/user/model/slice/userSlice';

import { postRefreshSession } from 'features/session/model/api/session-api';
import { fingerprintApp } from 'features/session/model/helper/fingerprint';
import { JWTToken } from 'features/session/model/helper/jwt-token';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

export const userRefreshSession = async () => {
  try {
    store.dispatch(loaderReducerActions.set(t`Session update`));
    const fingerprint: string = await fingerprintApp().get();
    const {
      data: { token },
    } = await postRefreshSession(fingerprint);
    JWTToken.set(token);
    const userData = JWTToken.decode(token);
    store.dispatch(userReducerActions.setUser(userData));
    store.dispatch(loaderReducerActions.end());
  } catch (error: any) {
    JWTToken.remove();
    JWTToken.deleteRefreshCookies();
    store.dispatch(userReducerActions.resetSession());
    store.dispatch(userMiddlewareResetDataAction());
  }
  store.dispatch(loaderReducerActions.end());
};
