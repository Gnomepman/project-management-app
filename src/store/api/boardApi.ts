import { createApi } from '@reduxjs/toolkit/query/react';
import { IBoard } from '../../models';
import { baseQuery } from './baseQuery';

export const boardApi = createApi({
  reducerPath: 'board/api',
  baseQuery: baseQuery,
  tagTypes: ['Board'],

  endpoints: (build) => ({
    getBoards: build.query<IBoard[], void>({
      query: () => ({
        url: `boards`,
      }),
      providesTags: ['Board'],
    }),

    postBoards: build.mutation<IBoard, IBoard>({
      query: (payload: IBoard) => ({
        url: `boards`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Board'],
    }),

    getBoardById: build.query<IBoard, string>({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Board'],
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
      invalidatesTags: ['Board'],
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: (boardId: string) => ({
        url: `boards/${boardId}`,
        method: 'DELETE',
        query: {
          id: boardId,
        },
      }),
      invalidatesTags: ['Board'],
    }),

    getBoardSet: build.query<IBoard[], void>({
      query: () => ({
        url: `boardsSet`,
      }),
    }),

    getBoardSetByUserId: build.query<IBoard, string>({
      query: (userId) => ({
        url: `boardsSet/${userId}`,
        query: {
          id: userId,
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
  useGetBoardSetQuery,
  useGetBoardSetByUserIdQuery,
} = boardApi;
