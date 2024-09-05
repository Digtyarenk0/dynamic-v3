import axios from 'axios';

import { endpointsUserSessionApi } from './session-endpoints';

export const postRefreshSession = (fingerprint: string) =>
  axios.post('' + endpointsUserSessionApi.session.refresh, { fingerprint }, { withCredentials: true });
