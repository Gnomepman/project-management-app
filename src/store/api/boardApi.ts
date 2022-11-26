import { createApi } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../models';
import { baseQuery } from './baseQuery';

export const boardApi = createApi({
  reducerPath: 'board/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => ({
        url: `boards`,
      }),
    }),

    postBoards: build.mutation<IBoard, IBoard>({
      query: (payload: IBoard) => ({
        url: `boards`,
        method: 'POST',
        body: payload,
      }),
    }),

    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        query: {
          id: boardId,
        },
      }),
    }),

    putBoard: build.mutation<IBoard, { boardId: string; payload: IBoard }>({
      query({ boardId, payload }) {
        return {
          url: `boards/${boardId}`,
          method: 'PUT',
          body: payload,
          query: {
            id: boardId,
          },
        };
      },
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: (boardId: string) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
        query: {
          id: boardId,
        },
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  usePostBoardsMutation,
  useGetBoardByIdQuery,
  usePutBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
