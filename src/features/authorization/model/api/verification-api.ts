import { AxiosResponse } from 'axios';

import { instance } from 'shared/api';

import { CheckKYCStatus } from '../types/authorization-types';

import { endpointsVerifficationApi } from './endpoints/endpoints';

export const checkStatus = (): Promise<AxiosResponse<CheckKYCStatus>> =>
  instance.get<CheckKYCStatus>(endpointsVerifficationApi.checkStatus);

export const getVerificationLink = (): Promise<AxiosResponse<{ url: string }>> =>
  instance.get<{ url: string }>(endpointsVerifficationApi.verificationLink);
