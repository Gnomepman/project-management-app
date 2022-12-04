import { createApi } from '@reduxjs/toolkit/query/react';
import { IColumn, IColumnRes } from '../../models';
import { baseQuery } from './baseQuery';

//Todo Recheck, fix and update
export const columnApi = createApi({
  reducerPath: 'column/api',
  baseQuery: baseQuery,
  tagTypes: ['Column'],

  endpoints: (build) => ({
    getColumns: build.query<IColumn[], string>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Column'],
    }),

    postColumns: build.mutation<IColumnRes, { boardId: string; payload: IColumnRes }>({
      query({ boardId, payload }) {
        return {
          url: `boards/${boardId}/columns`,
          method: 'POST',
          body: payload,
          query: {
            id: boardId,
          },
        };
      },
      invalidatesTags: ['Column'],
    }),

    getColumnById: build.query<IColumn, Record<string, string>>({
      query: ({ columnId, boardId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Column'],
    }),

    putColumn: build.mutation<IColumn, { boardId: string; columnId: string; payload: IColumnRes }>({
      query({ boardId, columnId, payload }) {
        return {
          url: `boards/${boardId}/columns/${columnId}`,
          method: 'PUT',
          body: payload,
          query: {
            id: boardId,
          },
        };
      },
      invalidatesTags: ['Column'],
    }),

    deleteColumn: build.mutation<IColumn, Record<string, string>>({
      query: ({ boardId, columnId }) => ({
        url: `boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
        query: {
          id: boardId,
        },
      }),
      invalidatesTags: ['Column'],
    }),

    getColumnSet: build.query<IColumn[], void>({
      query: () => ({
        url: `columnsSet`,
      }),
    }),

    getColumnSetById: build.query<IColumn, string>({
      query: (boardId) => ({
        url: `columnsSet/${boardId}`,
        query: {
          id: boardId,
        },
      }),
      providesTags: ['Column'],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  usePostColumnsMutation,
  useGetColumnByIdQuery,
  usePutColumnMutation,
  useDeleteColumnMutation,
  useGetColumnSetQuery,
  useGetColumnSetByIdQuery,
} = columnApi;
