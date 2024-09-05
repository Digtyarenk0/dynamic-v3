import { createAction } from '@reduxjs/toolkit';

export const baseCSF = <C, S, F>(prefix: string, actionName: string) => ({
  call: createAction<C>(`${prefix}/${actionName}/call`),
  success: createAction<S>(`${prefix}/${actionName}/success`),
  failure: createAction<F>(`${prefix}/${actionName}/failure`),
});
