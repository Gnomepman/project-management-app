import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IColumn } from '../../models';
import { API_URL } from '../../constants';

//Todo Recheck, fix and update
export const columnApi = createApi({
  reducerPath: 'column/api',
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
    getColumns: build.mutation({
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
export const { useGetColumnsMutation, useGetColumnByIdQuery } = columnApi;
