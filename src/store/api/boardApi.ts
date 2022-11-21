import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../models';
import { API_URL } from '../../constants';

export const boardApi = createApi({
  reducerPath: 'board/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
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
export const { useGetBoardByIdQuery } = boardApi;
