import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../models';
import { API_URL } from '../../constants';

export const boardApi = createApi({
  reducerPath: 'board/api',
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
    getBoards: build.mutation({
      query: () => ({
        url: `boards`,
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
export const { useGetBoardsMutation, useGetBoardByIdQuery } = boardApi;
