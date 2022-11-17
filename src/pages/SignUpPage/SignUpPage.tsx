import React from 'react';
import { IUser } from '../../models';
import { useSignUpUserQuery } from '../../store/api/signIn.api';

export const SignUpPage = () => {
  const user: IUser = {
    login: 'test1',
    name: 'test1',
    password: 'test1',
  };

  // Todo refactor
  const { isLoading, isError, data } = useSignUpUserQuery(user);

  const auth = localStorage.getItem('token');

  return <div>SignUpPage {auth}</div>;
};
