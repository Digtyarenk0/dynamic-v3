import { instance } from 'shared/api';

import { addTokenToRequest } from '../helper/session-helper';

// Refresh token
instance.interceptors.request.use(async (config) => {
  await addTokenToRequest(config);
  return config;
});
