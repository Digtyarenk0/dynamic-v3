import { AxiosResponse } from 'axios';

import { endpoints, instance } from 'shared/api';

import { UserRequest } from 'entities/request';

import { GetRequestsParamsProps, GetUserRecordsWorkerProps } from '../types/requests-types';

export const getRequest = (recordId: number): Promise<AxiosResponse<UserRequest>> =>
  instance.get(`${endpoints.queries.query}/${recordId}`);

export const getUserRequest = (props: GetUserRecordsWorkerProps): Promise<AxiosResponse<UserRequest[]>> => {
  const { limit = 20, offset = 0, platform = null } = props;
  const params: GetUserRecordsWorkerProps = {};
  params.limit = limit;
  params.offset = offset;
  if (platform && platform !== 'all') params.platform = platform;
  return instance.get(`${endpoints.queries.queries}`, { params });
};

export const getCountRequest = (props: GetRequestsParamsProps): Promise<AxiosResponse<number>> => {
  const { platform = null } = props;
  const params: GetRequestsParamsProps = {};
  if (platform && platform !== 'all') params.platform = platform;
  return instance.get(endpoints.queries.count, { params });
};

export const getRequestPreview = (key: string): Promise<AxiosResponse<{ url: string }>> =>
  instance.get(`${endpoints.queries.queries}/${key}`);
