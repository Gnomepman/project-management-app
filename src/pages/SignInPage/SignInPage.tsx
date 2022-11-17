import React from 'react';
import { IUser } from '../../models';
import { useSignInUserQuery } from '../../store/api/signIn.api';
import { parseJwt } from '../../utils/parseJwt';

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

  const userData = auth ? parseJwt(auth) : 'no';

  console.log(userData);
  return <div>Logged User: {userData.login}</div>;
};
