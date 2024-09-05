import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

import { SocketSchema } from '../types/socket.types';

const initialState: SocketSchema = {};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (_, action: PayloadAction<Socket>) => ({
      connection: action.payload,
    }),
    resetSocket: (state) => {
      state.connection = undefined;
    },
  },
});

export const { reducer: socketReducer, actions: socketReducerActions } = socketSlice;
