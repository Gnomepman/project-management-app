import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './feature/userSlice';
import { userApi } from './api/userApi';
import { boardApi } from './api/boardApi';
import { columnApi } from './api/columnApi';
import { taskApi } from './api/taskApi';
import { pointApi } from './api/pointApi';
import { fileApi } from './api/fileApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [columnApi.reducerPath]: columnApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [fileApi.reducerPath]: fileApi.reducer,
    [pointApi.reducerPath]: pointApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // Todo recheck if we need serializableCheck
    }).concat([
      authApi.middleware,
      userApi.middleware,
      boardApi.middleware,
      columnApi.middleware,
      taskApi.middleware,
      fileApi.middleware,
      pointApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
