import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models';

const LS_KEY = 'token';

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(LS_KEY);
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
