import { AxiosRequestConfig } from 'axios';

import { store } from 'app/providers/store/store';

import { userReducerActions } from 'entities/user/model/slice/userSlice';

import { postRefreshSession } from '../api/session-api';
import { endpointsUserSessionApi } from '../api/session-endpoints';

import { fingerprintApp } from './fingerprint';
import { JWTToken } from './jwt-token';

const getAuthToken = (token: string) => `Bearer ${token}`;

// const refreshSocketToken = (token: string, connection: Socket, dispatch: Dispatch<AnyAction>) => {
//   // @ts-ignore
//   connection.auth.Authorization = getAuthToken(token);
//   connection.disconnect().connect();
//   dispatch(socketReducerActions.setSocket(connection));
// };

const refreshSession = async (): Promise<string> => {
  const fingerprint = await fingerprintApp().get();
  const {
    data: { token },
  } = await postRefreshSession(fingerprint);
  JWTToken.set(token);
  return token;
};

export const addTokenToRequest = async (config: AxiosRequestConfig): Promise<void> => {
  const isNotRefresURL = config.url !== endpointsUserSessionApi.session.refresh;

  if (isNotRefresURL && config.headers) {
    const token = JWTToken.get();
    if (token) {
      if (JWTToken.isExpired(token)) {
        const newAccessToken = await refreshSession();
        const userData = JWTToken.decode(newAccessToken);
        store.dispatch(userReducerActions.setUser(userData));
        config.headers.Authorization = getAuthToken(newAccessToken);
        // // socket
        // const { socket } = { ...store.getState() };
        // if (socket.connection) {
        //   refreshSocketToken(newAccessToken, socket.connection, store.dispatch);
        // }
      } else {
        config.headers.Authorization = getAuthToken(token);
      }
    }
  }
};
