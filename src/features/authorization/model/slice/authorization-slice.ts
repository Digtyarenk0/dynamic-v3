import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationSchema } from '../types/authorization-types';

const initialState: AuthorizationSchema = {};

const authorizationSlice = createSlice({
  name: 'authorizatio',
  initialState,
  reducers: {
    setLoginErr: (state, action: PayloadAction<string>) => {
      state.loginErrMsg = action.payload;
    },
    clearErrors: (state) => {
      state.loginErrMsg = undefined;
      state.registrationErrMsg = undefined;
    },
  },
});

export const { reducer: authorizationReduce, actions: authorizationReducerActions } = authorizationSlice;
