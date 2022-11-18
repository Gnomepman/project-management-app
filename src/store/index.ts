import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './api/signIn.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './api/user.slice';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
