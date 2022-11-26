import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../models';
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

    putUser: build.mutation<FormData, { id: string; payload: FormData }>({
      // query: (id: string, payload: FormData) => ({
      //   url: `users/${id}`,
      //   method: 'PUT',
      //   body: payload,
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // }),
      query({ id, payload }) {
        return {
          url: `/users/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: payload,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
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
