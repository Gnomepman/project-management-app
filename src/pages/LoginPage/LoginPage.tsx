import React from 'react';
import { IUser } from '../../models';
import { parseJwt } from '../../utils/parseJwt';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLoginUserQuery } from '../../store/api/signIn.api';

export const LoginPage = () => {
  const userMock: IUser = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  // Todo refactor
  const { isLoading, data } = useLoginUserQuery(userMock);

  const { login } = useAppSelector((store) => store.user);
  const { storeUser } = useActions();

  const addUserToStore = () => {
    console.log(data?.token);
    localStorage.setItem('token', data?.token || '');
    const auth = localStorage.getItem('token');
    const userData = auth ? parseJwt(auth) : 'no';
    storeUser(userData);
    console.log(userData);
  };

  return (
    <>
      <button onClick={addUserToStore}>Sign In</button>
      <p>Hi, {login}</p>
    </>
  );
};
