import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard, IToken, IUser } from '../../models';

export const appApi = createApi({
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
    loginUser: build.query<IToken, IUser>({
      query: (payload: IUser) => ({
        url: `auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),

    signUpUser: build.query<IUser, IUser>({
      query: (payload: IUser) => ({
        url: `auth/signup`,
        method: 'POST',
        body: payload,
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

    getBoardById: build.query<IBoard, string>({
      query: (id) => ({
        url: `boards/${id}`,
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

export const { useLoginUserQuery, useSignUpUserQuery, useGetUserByIdQuery, useGetBoardByIdQuery } =
  appApi;
