import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../models';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: baseQuery,
  tagTypes: ['User'],

  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => ({
        url: `users`,
      }),
      providesTags: ['User'],
    }),

    getUserById: build.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        query: {
          id: id,
        },
      }),
      providesTags: ['User'],
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
      invalidatesTags: ['User'],
    }),

    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
        query: {
          id: id,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, usePutUserMutation, useDeleteUserMutation } =
  userApi;
