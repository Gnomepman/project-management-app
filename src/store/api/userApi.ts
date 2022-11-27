import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EditUser, IUser } from '../../models';
import { API_URL } from '../../constants';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: `users`,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    getUserById: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        query: {
          id: id,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    putUser: build.mutation<IUser, { id: string; payload: IUser }>({
      query({ id, payload }) {
        return {
          url: `/users/${id}`,
          mode: 'cors',
          method: 'PUT',
          body: payload,
        };
      },
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
        query: {
          id: id,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetUsersQuery, useGetUserByIdQuery, usePutUserMutation, useDeleteUserMutation } =
  userApi;
