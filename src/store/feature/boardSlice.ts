import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initial } from '../../components/Board/initial-data';

const initialState = {
  board: {} as initial,
};

export const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<initial>) => {
      state.board = action.payload;
    },
  },
});

export const boardActions = boardSlice.actions;
export const boardReducers = boardSlice.reducer;
