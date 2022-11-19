import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../models';

export const signInApi = createApi({
  reducerPath: 'user/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pm-app-back.up.railway.app/',

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      console.log('header', token);
      return headers;
    },
  }),

  endpoints: (build) => ({
    signInUser: build.query<Record<string, string>, IUser>({
      query: (payload: IUser) => ({
        url: `auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),

    signUpUser: build.mutation({
      query: (payload: IUser) => ({
        url: `auth/signup`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getUserById: build.query<Record<string, string>, string>({
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
  }),
});

export const { useSignInUserQuery, useSignUpUserMutation, useGetUserByIdQuery } = signInApi;
