import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';

export const api = createAPI();

export const store = configureStore({
  // Временно удаляем reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
