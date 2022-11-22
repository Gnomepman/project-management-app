import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin, IRegResponse, IToken, IUser } from '../../models';
import { API_URL } from '../../constants';

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (build) => ({
    loginUser: build.mutation<IToken, ILogin>({
      query(payload: ILogin) {
        return {
          url: `auth/signin`,
          method: 'POST',
          body: payload,
        };
      },
    }),

    registerUser: build.mutation<IRegResponse, IUser>({
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

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
