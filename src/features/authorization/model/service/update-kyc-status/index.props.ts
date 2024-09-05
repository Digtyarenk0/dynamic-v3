import { AnyAction, Dispatch } from '@reduxjs/toolkit';

import { userMiddlewareResetDataAction } from 'entities/user/model/middleware/userCustomMiddleware/actions-user-middlewate';
import { userReducerActions } from 'entities/user/model/slice/userSlice';

import { JWTToken } from 'features/session/model/helper/jwt-token';

import { loaderReducerActions } from 'widgets/loader/model/slice/loader-slice';

export const updateKYCStatusProps = async (dispatch: Dispatch<AnyAction>, jwt: string) => {
  try {
    JWTToken.set(jwt);
    const userData = JWTToken.decode(jwt);
    dispatch(userReducerActions.setUser(userData));
    dispatch(loaderReducerActions.end());
  } catch (error: any) {
    JWTToken.remove();
    JWTToken.deleteRefreshCookies();
    dispatch(userReducerActions.resetSession());
    dispatch(userMiddlewareResetDataAction());
  }
  dispatch(loaderReducerActions.end());
};
