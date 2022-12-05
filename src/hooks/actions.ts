import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '../store/feature/userSlice';
import { boardActions } from '../store/feature/boardSlice';

const actions = {
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};

const boardAction = {
  ...boardActions,
};

export const useBoardActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(boardAction, dispatch);
};
