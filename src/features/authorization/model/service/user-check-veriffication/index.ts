import { AxiosResponse } from 'axios';

import { store } from 'app/providers/store/store';

import { userApiVerification } from '../../api';
import { CheckKYCStatus } from '../../types/authorization-types';
import { updateKYCStatusProps } from '../update-kyc-status/index.props';

export const userCheckVerification = async () => {
  try {
    const user = store.getState().user?.user;
    if (user) {
      const { data }: AxiosResponse<CheckKYCStatus> = await userApiVerification.checkStatus();
      if (user?.verify !== data.verifySatus) {
        await updateKYCStatusProps(store.dispatch, data.token);
      }
    }
  } catch (error: any) {
    console.error('verificationLink', { error });
  }
};
