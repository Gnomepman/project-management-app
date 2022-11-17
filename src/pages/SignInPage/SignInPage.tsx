import React from 'react';
import { IUser } from '../../models';
import { useSignInUserQuery } from '../../store/api/signIn.api';

export const SignInPage = () => {
  const user: IUser = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  // Todo refactor
  const { isLoading, isError, data } = useSignInUserQuery(user);

  console.log(data?.token);
  localStorage.setItem('token', data?.token || '');

  const auth = localStorage.getItem('token');

  return <div>{auth}</div>;
};
