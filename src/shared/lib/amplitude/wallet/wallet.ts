import { track } from '@amplitude/analytics-browser';

const signin_button = () =>
  track('signin_button', {
    page: location.pathname,
  });

const signup_button = () =>
  track('signup_button', {
    page: location.pathname,
  });

const wallet_connected = () =>
  track('wallet_connected', {
    page: location.pathname,
  });

const logout_button = () =>
  track('logout_button', {
    page: location.pathname,
  });

export default {
  signin_button,
  signup_button,
  wallet_connected,
  logout_button,
};
