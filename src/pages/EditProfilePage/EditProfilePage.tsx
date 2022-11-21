import React from 'react';
import { useGetUserByIdQuery, useGetUsersQuery } from '../../store/api/userApi';
import { Button } from 'react-bootstrap';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { IUser } from '../../models';

export const EditProfilePage = () => {
  const id = '636d6464c02777e984c57dc1';

  const { isError, data } = useGetUserByIdQuery(id);
  const { data: users } = useGetUsersQuery();

  return (
    <>
      {data && (
        <div className="container">
          <h5>Logged User:</h5>
          <p>name: {data?.name}</p>
          <p>login: {data?.login}</p>
          <Button>Change User data</Button>
        </div>
      )}
      {isError && <ErrorComponent />}

      {users && users.map((item: IUser) => <p key={item.id}>{item.login}</p>)}
    </>
  );
};
