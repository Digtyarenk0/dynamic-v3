import { t } from '@lingui/macro';
import axios from 'axios';

const instance = axios.create({ withCredentials: true });

// Backend API URL
instance.defaults.baseURL = '';

// Check res on server work
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response && err.response.status !== 409) {
      if (err.response?.data?.constructor?.name === 'Blob') {
        throw {
          message: JSON.parse(await err.response?.data?.text()).message,
          status: err?.response?.data?.statusCode,
        };
      }
    }
    if (err.message === 'Network Error') {
      throw {
        message: t`The server is not responding!`,
        status: err?.response?.data?.statusCode,
      };
    }
    throw { message: err?.response?.data?.message, status: err?.response?.data?.statusCode };
  },
);

export default instance;
