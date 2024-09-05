// eslint-disable-next-line
import Symbol_observable from 'symbol-observable';
Symbol_observable.toString(); // Activate redux Symbol_observable

import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { userCustomMiddleware } from 'entities/user/model/middleware/userCustomMiddleware/userMiddleware';

import { rootReducer as reducer } from './root-reducer';
import { rootSagaWatcher } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, userCustomMiddleware];

export const store = configureStore({
  reducer,
  middleware,
});

sagaMiddleware.run(rootSagaWatcher);
