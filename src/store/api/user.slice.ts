import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models';

const LS_KEY = 'token';

interface UserState {
  login: string;
}

const initialState: UserState = {
  login: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser(state, action: PayloadAction<IUser>) {
      state.login = action.payload.login;
    },
    logoutUser(state) {
      state.login = '';
      localStorage.removeItem(LS_KEY);
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
