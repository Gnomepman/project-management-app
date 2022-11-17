import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LS_KEY = 'token';

interface UserState {
  user: string;
}

const initialState: UserState = {
  user: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    checkUser(state, action: PayloadAction<string>) {
      // state.user.concat(action.payload);
      // localStorage.setItem(LS_KEY, JSON.stringify(state.user));
      console.log('state.user', state.user);
    },
    removeToken(state, action: PayloadAction<string>) {
      // state.user = state.user.filter((f) => f !== action.payload);
      // localStorage.removeItem(LS_KEY);
      console.log('removeToken');
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
