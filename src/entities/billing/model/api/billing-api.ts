import { AxiosResponse } from 'axios';

import { instance } from 'shared/api';

import { UserRequest } from 'entities/request';

import { billingEndpoints } from './enpoints';

export const getUserAmount = (): Promise<AxiosResponse<{ amount: string }>> => instance.get(billingEndpoints.amount);

export const getCheckForSign = (id: number): Promise<AxiosResponse<{ dataForSignature: string }>> =>
  instance.get(`${billingEndpoints.check}/${id}`);

export const postSignedCheck = (id: number, signature: string): Promise<AxiosResponse<UserRequest>> =>
  instance.post(`${billingEndpoints.check}/${id}`, { signature });

export const postPayCheck = (id: number): Promise<AxiosResponse<UserRequest>> =>
  instance.patch(`${billingEndpoints.pay}/${id}`);

export const billingRequests = { getUserAmount, getCheckForSign, postSignedCheck, postPayCheck };
