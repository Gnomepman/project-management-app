import { createApi } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../models';
import { baseQuery } from './baseQuery';

export const boardApi = createApi({
  reducerPath: 'board/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getBoards: build.query<IBoard[], string>({
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
export const { useGetBoardsQuery, useGetBoardByIdQuery } = boardApi;
