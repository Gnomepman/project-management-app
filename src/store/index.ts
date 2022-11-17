import { configureStore } from '@reduxjs/toolkit';
import { signInApi } from './api/signIn.api';

export const store = configureStore({
  reducer: {
    [signInApi.reducerPath]: signInApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signInApi.middleware),
});
