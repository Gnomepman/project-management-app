import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './feature/userSlice';
import { userApi } from './api/userApi';
import { boardApi } from './api/boardApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // Todo recheck if we need serializableCheck
    }).concat([authApi.middleware, userApi.middleware, boardApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
