import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoaderSchema } from '../types';

const initialState: LoaderSchema = {};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.stage = action.payload;
    },
    end: (state) => {
      state.stage = undefined;
    },
  },
});

export const { reducer: loaderReducer, actions: loaderReducerActions } = loaderSlice;
