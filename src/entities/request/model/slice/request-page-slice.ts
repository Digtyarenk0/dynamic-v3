import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'app/providers/store/state-schema';

import { UserRequest } from 'entities/request';

import { insertRequestAction } from '../service/insert-request/insert-request';
import { loadMoreUserRequestsAction } from '../service/load-more-user-requests/load-more-user-requests';
import { patformOptions } from '../types/filter.types';
import { RequestsPageSchema } from '../types/requests-types';

const requestsPageAdapter = createEntityAdapter<UserRequest>({
  selectId: (record) => record.id,
});

export const getRequestsPageAdapter = requestsPageAdapter.getSelectors<RootState>(
  (state) => state.requests || requestsPageAdapter.getInitialState(),
);

const requestsPageSlice = createSlice({
  name: 'requests-page',
  initialState: requestsPageAdapter.getInitialState<RequestsPageSchema>({
    count: 0,
    platform: 'all',
    requestsPageLodaded: false,
    ids: [],
    entities: {},
  }),
  reducers: {
    setRequestsCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setPatform: (state, action: PayloadAction<patformOptions>) => {
      state.platform = action.payload;
    },
    setAll: (state, action: PayloadAction<UserRequest[]>) => {
      requestsPageAdapter.setAll(state, action.payload);
    },
    updateRequest: requestsPageAdapter.updateOne,
    resetRequest: (state) => ({ ...state, ...requestsPageAdapter.getInitialState() }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMoreUserRequestsAction.fulfilled.type, (state, action: PayloadAction<UserRequest[]>) => {
        requestsPageAdapter.addMany(state, action.payload);
      })
      .addCase(insertRequestAction.fulfilled.type, (state, action: PayloadAction<UserRequest>) => {
        requestsPageAdapter.addOne(state, action.payload);
      });
  },
});

export const { reducer: requestsPageReducer, actions: requestsPageReducerActions } = requestsPageSlice;
