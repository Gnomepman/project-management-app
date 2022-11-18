import React from 'react';
import { IUser } from '../../models';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { useLoginUserQuery } from '../../store/api/authApi';
import { Loader } from '../../components/Loader/Loader';
import { ErrorComponent } from '../../components/Error/ErrorComponent';

export const LoginPage = () => {
  const userMock: IUser = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  // Todo refactor
  const { isError, isLoading, data } = useLoginUserQuery(userMock);

  const { user } = useAppSelector((store) => store.user);
  const { setUser } = useActions();

  const addUserToStore = () => {
    setUser(userMock);
    localStorage.setItem('token', data?.token || '');
  };

  return (
    <>
      <button onClick={addUserToStore}>Sign In</button>
      {isLoading && <Loader />}
      {isError && <ErrorComponent />}
      {user && (
        <p>
          Hi, <span>{user?.login} </span>
        </p>
      )}
    </>
  );
};
