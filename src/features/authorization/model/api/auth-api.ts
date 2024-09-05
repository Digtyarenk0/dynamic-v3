import { instance } from 'shared/api';

import { endpointsUserApi } from './endpoints/endpoints';

export const getSignData = () => instance.get(endpointsUserApi.authorization.signingData);

export const postLogin = <T>(user: string) => instance.post<T>(endpointsUserApi.authorization.login, { user });

export const deleteLogout = () => instance.delete(endpointsUserApi.authorization.logout);
