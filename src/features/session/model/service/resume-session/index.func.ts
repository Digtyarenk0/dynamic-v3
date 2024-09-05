import { store } from 'app/providers/store/store';

import { userMiddlewareResetDataAction } from 'entities/user/model/middleware/userCustomMiddleware/actions-user-middlewate';
import { userReducerActions } from 'entities/user/model/slice/userSlice';

import { JWTToken } from 'features/session/model/helper/jwt-token';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

import { userRefreshSession } from '../refresh-session/index.func';

export const userResumeSession = async () => {
  try {
    const token = JWTToken.get();
    if (token) {
      const isExpired = JWTToken.isExpired(token);
      if (isExpired) {
        await userRefreshSession();
      } else {
        const user = JWTToken.decode(token);
        store.dispatch(userReducerActions.setUser(user));
      }
    } else {
      store.dispatch(userReducerActions.setIsLogged(false));
    }
  } catch (error: any) {
    store.dispatch(userMiddlewareResetDataAction());
    store.dispatch(userReducerActions.setIsLogged(false));
    console.error('User resume session err', error);
  }
  store.dispatch(userReducerActions.setInitiated(true));
  store.dispatch(loaderReducerActions.end());
};
