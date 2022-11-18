import React from 'react';
import { IUser } from '../../models';
import { useRegisterUserQuery } from '../../store/api/authApi';

export const RegistrationPage = () => {
  const user: IUser = {
    login: 'test1',
    name: 'test1',
    password: 'test1',
  };

  // Todo refactor
  const { isLoading, isError, data } = useRegisterUserQuery(user);

  const auth = localStorage.getItem('token');

  return <div>SignUpPage {auth}</div>;
};
