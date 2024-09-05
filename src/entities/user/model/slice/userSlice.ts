import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserSchemeState } from '../types/user';

const initialState: UserSchemeState = {
  _inited: false,
  isLogged: false,
  sessionEnded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state._inited = true;
      state.isLogged = true;
      // const isVeryfied: boolean = action.payload.verify === 'verify'; // TODO: Return
      state.user = { ...action.payload, isVeryfied: true };
    },
    setInitiated: (state, action: PayloadAction<boolean>) => {
      state._inited = action.payload;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setSessionStatusEnded: (state, action: PayloadAction<boolean>) => {
      state.sessionEnded = action.payload;
    },
    resetSession: (state) => {
      state.user = undefined;
      state.isLogged = false;
      state.sessionEnded = true;
    },
  },
});

export const { reducer: userReducer, actions: userReducerActions } = userSlice;
