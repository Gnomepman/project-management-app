import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models';

interface IUserState {
  user: IUser | null;
  snow: boolean;
}

const initialState: IUserState = {
  user: null,
  snow: false,
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
    },
    toggleSnow: (state) => {
      state.snow = !state.snow;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
