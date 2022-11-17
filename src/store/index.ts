import { configureStore } from '@reduxjs/toolkit';
import { signInApi } from './api/signIn.api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [signInApi.reducerPath]: signInApi.reducer,
    user: signInApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signInApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
