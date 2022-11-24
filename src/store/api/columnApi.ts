import { createApi } from '@reduxjs/toolkit/query/react';
import { IColumn } from '../../models';
import { baseQuery } from './baseQuery';

//Todo Recheck, fix and update
export const columnApi = createApi({
  reducerPath: 'column/api',
  baseQuery: baseQuery,

  endpoints: (build) => ({
    getColumns: build.query<IColumn[], void>({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
        query: {
          id: boardId,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),

    getColumnById: build.query<IColumn, string>({
      query: (id) => ({
        url: `columns/${id}`,
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
export const { useGetColumnsQuery, useGetColumnByIdQuery } = columnApi;
