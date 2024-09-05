import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { createAppAction } from 'app/providers/store/helper';

import { userApiVerification } from '../../api';

export const userToVerificationAction = createAppAction<undefined, undefined>('user', 'to-verification');

export function* userToVerificationWorker() {
  try {
    const { data }: AxiosResponse<{ url: string }> = yield userApiVerification.getVerificationLink();
    window.open(data.url, '_blank');
  } catch (error: any) {
    if (error?.status === 402) toast.error(error?.message);
    console.error('Get verification link err', { error });
  }
}
