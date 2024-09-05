import { createAction } from '@reduxjs/toolkit';

export const createAppAction = <SagaArg, Returned, Reject = string>(prefix: string, actionName: string) => ({
  call: createAction<SagaArg>(`${prefix}/${actionName}/call`),
  fulfilled: createAction<Returned>(`${prefix}/${actionName}/fulfilled`),
  rejected: createAction<Reject>(`${prefix}/${actionName}/reject`),
});
