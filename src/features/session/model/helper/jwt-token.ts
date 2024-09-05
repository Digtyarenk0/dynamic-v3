import Big from 'big.js';
import jwtDecode from 'jwt-decode';

import { User } from 'entities/user/model/types/user';

export const SESSION_COOKIE_KEY = 'access';
export const SESSION_COOKIE_KEY_REFRESH = 'refresh-token';

const set = (token: string) => {
  localStorage.setItem(SESSION_COOKIE_KEY, token);
};

const get = (): string | null => localStorage.getItem(SESSION_COOKIE_KEY);

const remove = () => {
  localStorage.removeItem(SESSION_COOKIE_KEY);
};

const decode = (token: string): User => {
  const tokenPayload: User = jwtDecode(token);
  const isVeryfied: boolean = tokenPayload.verify === 'verify';
  return { ...tokenPayload, isVeryfied };
};

const isExpired = (token: string) => {
  try {
    if (!token) return false;
    const { exp }: any = jwtDecode(token);

    const now = new Date().getTime();
    const expires = Big(exp).mul(1000).toNumber();
    const isExpired = now >= expires;

    return isExpired;
  } catch (error) {
    return true;
  }
};

const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
};

const deleteKeyCookies = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const deleteRefreshCookies = () => deleteKeyCookies(SESSION_COOKIE_KEY_REFRESH);

export const JWTToken = {
  set,
  get,
  remove,
  decode,
  isExpired,
  deleteAllCookies,
  deleteKeyCookies,
  deleteRefreshCookies,
};
