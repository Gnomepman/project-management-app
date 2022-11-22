import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../models';
import { API_URL } from '../../constants';

export const userApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

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
