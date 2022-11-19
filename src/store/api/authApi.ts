import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IToken, IUser } from '../../models';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pm-app-back.up.railway.app/',
  }),

  endpoints: (build) => ({
    loginUser: build.query<Record<string, string>, IUser>({
      query: (payload: IUser) => ({
        url: `auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),

    registerUser: build.mutation({
      query: (payload: IUser) => ({
        url: `auth/signup`,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useLoginUserQuery, useRegisterUserMutation } = authApi;
